import Container from "react-bootstrap/esm/Container"
import Modal from "react-bootstrap/esm/Modal"
import ModalHeader from "../../../common/components/modal/modal-header/modal-header.component";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { UpdateNameRequest } from "../../types/update-name/update-name-request.type";
import { updateNameSchema } from "../../schemas/update-name.schema";
import { useZodForm } from "../../../common/hooks/zod-form.hook";
import FloatingInput from "../../../common/components/floating-input/floating-input.component";
import { FieldError } from "react-hook-form";
import Form from "react-bootstrap/esm/Form";
import { useAppSelector } from "../../../app/hooks/app.hooks";
import { useUpdateNameMutation } from "../../api/profile.api";
import { toast } from "react-toastify";
import { QueryStatus } from "@reduxjs/toolkit/query";

type UpdateNameModalProps = {
    show: boolean,
    onHide: () => void
}
export default function UpdateNameModal({ show, onHide }: UpdateNameModalProps) {

    const { t } = useTranslation("profile", { keyPrefix: "update-name" });
    const { register, handleSubmit, errors } = useZodForm<UpdateNameRequest>(updateNameSchema);
    const { profile } = useAppSelector((state) => state.profile);

    if (profile === null) {
        return null;
    }
    const firstName = profile.firstName || "";
    const lastName = profile.lastName || "";

    const [mutation, { status, isLoading }] = useUpdateNameMutation();

    const onSubmit = async (req: UpdateNameRequest) => {
        try {
            mutation(req);
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

    }, [status]);

    return (

        <Modal
            className="update-fullname-modal"
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
                    disabled={isLoading}
                    tabIndex={3}
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
                            name="firstName"
                            label={t("first-name.label")}
                            autoFocus
                            defaultValue={firstName}
                            disabled={isLoading}
                            register={register}
                            error={errors.firstName as FieldError}
                        />

                        <FloatingInput
                            tabIndex={2}
                            type="text"
                            name="lastName"
                            label={t("last-name.label")}
                            defaultValue={lastName}
                            disabled={isLoading}
                            register={register}
                            error={errors.lastName as FieldError}
                        />

                    </Container>
                </Modal.Body>
            </Form>
        </Modal >
    )
}