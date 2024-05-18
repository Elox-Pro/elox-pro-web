import Container from "react-bootstrap/esm/Container"
import Modal from "react-bootstrap/esm/Modal"
import ModalHeader from "../../../common/components/modal/modal-header/modal-header.component";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useZodForm } from "../../../common/hooks/zod-form.hook";
import FloatingInput from "../../../common/components/floating-input/floating-input.component";
import { FieldError } from "react-hook-form";
import Form from "react-bootstrap/esm/Form";
import { useAppSelector } from "../../../app/hooks/app.hooks";
import { useUpdateEmailMutation } from "../../api/profile.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { UpdateEmailRequest } from "../../types/update-email/update-email-request.type";
import { updateEmailSchema } from "../../schemas/update-emaill.schema";
import { setTfaPending, setTfaUsername } from "../../../tfa/features/tfa.slice";
import { useDispatch } from "react-redux";
import { setOverlay } from "../../../common/features/common.slice";

type UpdateEmailModalProps = {
    show: boolean,
    onHide: () => void
}
export default function UpdateEmailModal({ show, onHide }: UpdateEmailModalProps) {

    const { t } = useTranslation("profile", { keyPrefix: "update-email" });
    const { register, handleSubmit, errors } = useZodForm<UpdateEmailRequest>(updateEmailSchema);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { profile } = useAppSelector((state) => state.profile);
    const { overlay } = useAppSelector((state) => state.common);

    if (profile === null) {
        return null;
    }
    const email = profile.email || "";
    const username = profile.username || "";

    const [updateEmail, { data, status }] = useUpdateEmailMutation();

    const onSubmit = async (req: UpdateEmailRequest) => {
        try {
            dispatch(setOverlay(true));
            updateEmail({ email: req.email });
        } catch (error) {
            console.error(error);
            toast.error(JSON.stringify(error));
        }
    };

    useEffect(() => {
        if (status === QueryStatus.fulfilled && data && data.isTFAPending) {
            dispatch(setTfaPending(true));
            dispatch(setTfaUsername(username));
            navigate("/tfa/validate", { replace: true });
        }
    }, [status, data])

    return (

        <Modal
            className="update-email-modal"
            show={show}
            fullscreen="lg-down"
            scrollable
            backdrop="static"
            keyboard={false}>
            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                <ModalHeader
                    title={t("modal.title")}
                    buttonText={"OK"}
                    onHide={onHide}
                    disabled={overlay.active}
                    tabIndex={2}
                />
                <Modal.Body className="p-3">
                    <Container>
                        <h3>{t("container.title")}</h3>
                        <p className="text-muted">
                            {t("container.subtitle")}
                        </p>

                        <FloatingInput
                            tabIndex={1}
                            type="text"
                            name="email"
                            label={t("email.label")}
                            autoFocus
                            defaultValue={email}
                            disabled={overlay.active}
                            register={register}
                            error={errors.email as FieldError}
                        />

                    </Container>
                </Modal.Body>
                <input
                    type="hidden"
                    defaultValue={email}
                    {...register("currentEmail")}
                />
            </Form>
        </Modal >
    )
}