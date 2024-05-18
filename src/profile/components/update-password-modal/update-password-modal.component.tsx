import Container from "react-bootstrap/esm/Container"
import Modal from "react-bootstrap/esm/Modal"
import ModalHeader from "../../../common/components/modal/modal-header/modal-header.component";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useZodForm } from "../../../common/hooks/zod-form.hook";
import FloatingInput from "../../../common/components/floating-input/floating-input.component";
import { FieldError } from "react-hook-form";
import Form from "react-bootstrap/esm/Form";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import { useUpdatePasswordMutation } from "../../api/profile.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { updatePasswordSchema } from "../../schemas/update-password.schema";
import { UpdatePasswordRequest } from "../../types/update-password/update-password-request.type";
import { setTfaPending, setTfaUsername } from "../../../tfa/features/tfa.slice";
import { setOverlay } from "../../../common/features/common.slice";

type UpdatePasswordModalProps = {
    show: boolean,
    onHide: () => void
}

export default function UpdatePasswordModal({ show, onHide }: UpdatePasswordModalProps) {

    const { t } = useTranslation("profile", { keyPrefix: "update-password" });
    const { register, handleSubmit, reset, errors } = useZodForm<UpdatePasswordRequest>(updatePasswordSchema);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { profile } = useAppSelector((state) => state.profile);
    const { overlay } = useAppSelector((state) => state.common);

    if (profile === null) {
        return null;
    }
    const username = profile.username || "";

    const [mutation, { data, status }] = useUpdatePasswordMutation();

    const onSubmit = async (req: UpdatePasswordRequest) => {
        try {
            dispatch(setOverlay(true));
            mutation(req);
        } catch (error) {
            console.error(error);
            toast.error(JSON.stringify(error));
        }
    };

    useEffect(() => {
        if (status === QueryStatus.fulfilled && data) {
            if (data.isTFAPending) {
                dispatch(setTfaPending(true));
                dispatch(setTfaUsername(username));
                navigate("/tfa/validate", { replace: true });
            } else {
                handleHide();
                toast.success(t("success.on-fullfilled"));
            }
        }
    }, [status, data]);

    const handleHide = () => {
        reset();
        onHide();
    }

    return (

        <Modal
            show={show}
            fullscreen="lg-down"
            scrollable
            backdrop="static"
            keyboard={false}>
            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                <ModalHeader
                    title={t("modal.title")}
                    buttonText={"OK"}
                    onHide={handleHide}
                    disabled={overlay.active}
                    tabIndex={4}
                />
                <Modal.Body className="p-3">
                    <Container>
                        <h3>{t("container.title")}</h3>
                        <p className="text-muted">
                            {t("container.subtitle")}
                        </p>

                        <input
                            type="text"
                            name="username"
                            defaultValue={username}
                            autoComplete="username"
                            readOnly
                            hidden
                        />

                        <FloatingInput
                            tabIndex={1}
                            type="password"
                            name="currentPassword"
                            label={t("current-password.label")}
                            autoFocus
                            disabled={overlay.active}
                            register={register}
                            error={errors.currentPassword as FieldError}
                            autoComplete="current-password"
                        />

                        <FloatingInput
                            tabIndex={2}
                            type="password"
                            name="newPassword"
                            label={t("new-password.label")}
                            disabled={overlay.active}
                            register={register}
                            error={errors.newPassword as FieldError}
                            autoComplete="new-password"
                        />

                        <FloatingInput
                            tabIndex={3}
                            type="password"
                            name="confirmPassword"
                            label={t("confirm-password.label")}
                            disabled={overlay.active}
                            register={register}
                            error={errors.confirmPassword as FieldError}
                            autoComplete="new-password"
                        />

                    </Container>
                </Modal.Body>
            </Form>
        </Modal >
    )
}