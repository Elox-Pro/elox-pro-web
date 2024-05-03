import Container from "react-bootstrap/esm/Container"
import Modal from "react-bootstrap/esm/Modal"
import ModalHeader from "../../../common/components/modal/modal-header/modal-header.component";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useZodForm } from "../../../common/hooks/zod-form.hook";
import FloatingInput from "../../../common/components/floating-input/floating-input.component";
import { FieldError } from "react-hook-form";
import Form from "react-bootstrap/esm/Form";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import { useUpdatePhoneMutation } from "../../api/profile.api";
import { setOverlay } from "../../../common/features/common.slice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleRejected } from "../../../common/helpers/handle-rejected.helper";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { UpdatePhoneRequest } from "../../types/update-phone/update-phone-request.type";
import { updatePhoneSchema } from "../../schemas/update-phone.schema";

type UpdatePhoneModalProps = {
    show: boolean,
    onHide: () => void
}
export default function UpdatePhoneModal({ show, onHide }: UpdatePhoneModalProps) {

    const { t } = useTranslation("profile", { keyPrefix: "update-phone" });
    const [disabled, setDisabled] = useState(false);
    const { register, handleSubmit, errors } = useZodForm<UpdatePhoneRequest>(updatePhoneSchema);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { profile } = useAppSelector((state) => state.profile);

    if (profile === null) {
        return null;
    }
    const phone = profile.phone || "";

    const [updatePhone, { data, status, error }] = useUpdatePhoneMutation();

    const handleSubmitRequest = async (req: UpdatePhoneRequest) => {
        try {
            handleInitRequest();
            updatePhone({ phone: req.phone });
        } catch (error) {
            handleErrorRequest(error);
        }
    };

    useEffect(() => {
        switch (status) {
            case QueryStatus.fulfilled:
                handleSuccessfulRequest();
                break;
            case QueryStatus.rejected:
                handleRejectedRequest();
                break;
            default: break;
        }
    }, [status, error, data])

    const handleInitRequest = () => {
        setDisabled(true);
        dispatch(setOverlay(true));
    }

    const handleErrorRequest = (error: any) => {
        dispatch(setOverlay(false));
        setDisabled(false);
        toast.error(t("error.on-request"));
        console.error("Update phone error:", error);
    }

    const handleRejectedRequest = () => {
        dispatch(setOverlay(false));
        setDisabled(false);
        handleRejected({ error, message: "Update phone rejected", navigate });
    }

    const handleSuccessfulRequest = () => {
        dispatch(setOverlay(false));
        setDisabled(false);
        onHide();
        toast.success(t("success.on-fullfilled"));
    }

    return (

        <Modal
            className="update-fullname-modal"
            show={show}
            fullscreen="lg-down"
            scrollable
            backdrop="static"
            keyboard={false}>
            <Form onSubmit={handleSubmit(handleSubmitRequest)} noValidate>
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
                            name="phone"
                            label={t("phone.label")}
                            autoFocus
                            autoComplete="phone"
                            defaultValue={phone}
                            disabled={disabled}
                            register={register}
                            error={errors.phone as FieldError}
                        />
                    </Container>
                </Modal.Body>
                <input
                    type="hidden"
                    defaultValue={phone}
                    {...register("currentPhone")}
                />
            </Form>
        </Modal >
    )
}