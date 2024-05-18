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
import { useUpdatePhoneMutation } from "../../api/profile.api";
import { toast } from "react-toastify";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { UpdatePhoneRequest } from "../../types/update-phone/update-phone-request.type";
import { updatePhoneSchema } from "../../schemas/update-phone.schema";
import { setOverlay } from "../../../common/features/common.slice";

type UpdatePhoneModalProps = {
    show: boolean,
    onHide: () => void
}
export default function UpdatePhoneModal({ show, onHide }: UpdatePhoneModalProps) {

    const { t } = useTranslation("profile", { keyPrefix: "update-phone" });
    const { register, handleSubmit, errors } = useZodForm<UpdatePhoneRequest>(updatePhoneSchema);
    const { profile } = useAppSelector((state) => state.profile);
    const { overlay } = useAppSelector((state) => state.common);
    const dispatch = useAppDispatch();

    if (profile === null) {
        return null;
    }
    const phone = profile.phone || "";

    const [mutation, { status }] = useUpdatePhoneMutation();

    const handleSubmitRequest = async (req: UpdatePhoneRequest) => {
        try {
            dispatch(setOverlay(true));
            mutation({ phone: req.phone });
        } catch (error) {
            console.error(error);
            toast.error(JSON.stringify(error));
        }
    };

    useEffect(() => {
        if (status === QueryStatus.fulfilled) {
            onHide();
            toast.success(t("success.on-fullfilled"));
        }
    }, [status])


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
                            name="phone"
                            label={t("phone.label")}
                            autoFocus
                            autoComplete="phone"
                            defaultValue={phone}
                            disabled={overlay.active}
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