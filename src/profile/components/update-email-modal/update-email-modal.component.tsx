import Container from "react-bootstrap/esm/Container"
import Modal from "react-bootstrap/esm/Modal"
import ModalHeader from "../../../common/components/modal/modal-header/modal-header.component";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useZod } from "../../../common/hooks/zod.hook";
import FloatingInput from "../../../common/components/floating-input/floating-input.component";
import { FieldError } from "react-hook-form";
import Form from "react-bootstrap/esm/Form";
import { useAppSelector } from "../../../app/hooks/app.hooks";
import { useUpdateEmailMutation } from "../../api/profile.api";
import { setOverlay } from "../../../common/features/common.slice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleRejected } from "../../../common/helpers/handle-rejected.helper";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { UpdateEmailRequest } from "../../types/update-email/update-email-request.type";
import { updateEmailSchema } from "../../schemas/update-emaill.schema";
import { setTfaPending, setTfaUsername } from "../../../tfa/features/tfa.slice";
import { useDispatch } from "react-redux";

type UpdateEmailModalProps = {
    show: boolean,
    onHide: () => void
}
export default function UpdateEmailModal({ show, onHide }: UpdateEmailModalProps) {

    const { t } = useTranslation("profile", { keyPrefix: "update-email" });
    const [disabled, setDisabled] = useState(false);
    const { register, handleSubmit, errors } = useZod<UpdateEmailRequest>(updateEmailSchema);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { profile } = useAppSelector((state) => state.profile);

    if (profile === null) {
        return null;
    }
    const email = profile.email || "";
    const username = profile.username || "";

    const [updateEmail, { data, status, error }] = useUpdateEmailMutation();

    const onSubmit = async (req: UpdateEmailRequest) => {
        try {
            onInitRequest();
            updateEmail({ email: req.email });
        } catch (error) {
            onErrorRequest(error);
        }
    };

    useEffect(() => {
        switch (status) {
            case QueryStatus.fulfilled: onFulfilled(); break;
            case QueryStatus.rejected: onRejected(); break;
            default: break;
        }
    }, [status, error, data])

    const onInitRequest = () => {
        setDisabled(true);
        dispatch(setOverlay(true));
    }

    const onErrorRequest = (error: any) => {
        dispatch(setOverlay(false));
        setDisabled(false);
        toast.error(t("error.on-request"));
        console.error("Update email error:", error);
    }

    const onRejected = () => {
        dispatch(setOverlay(false));
        setDisabled(false);
        handleRejected({ error, message: "Update email rejected", navigate });
    }

    const onFulfilled = () => {
        try {
            if (!data || !data.isTFAPending) {
                throw new Error("Update email fulfilled but no data");
            }
            dispatch(setOverlay(false));
            dispatch(setTfaPending(true));
            dispatch(setTfaUsername(username));
            navigate("/tfa/validate", { replace: true });
        } catch (error) {
            onErrorRequest(error);
        }
    }

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
                    disabled={disabled}
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
                            disabled={disabled}
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