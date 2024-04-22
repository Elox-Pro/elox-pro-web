import Container from "react-bootstrap/esm/Container"
import Modal from "react-bootstrap/esm/Modal"
import ModalHeader from "../../../common/components/modal/modal-header/modal-header.component";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { UpdateNameRequest } from "../../types/update-name/update-name-request.type";
import { updateNameSchema } from "../../schemas/update-name.schema";
import { useZod } from "../../../common/hooks/zod.hook";
import FloatingInput from "../../../common/components/floating-input/floating-input.component";
import { FieldError } from "react-hook-form";
import Form from "react-bootstrap/esm/Form";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import { useUpdateNameMutation } from "../../api/profile.api";
import { setOverlay } from "../../../common/features/common.slice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleRejected } from "../../../common/helpers/handle-rejected.helper";
import { QueryStatus } from "@reduxjs/toolkit/query";

type UpdateNameModalProps = {
    show: boolean,
    onHide: () => void
}
export default function UpdateNameModal({ show, onHide }: UpdateNameModalProps) {

    const { t } = useTranslation("profile", { keyPrefix: "update-name" });
    const [disabled, setDisabled] = useState(false);
    const { register, handleSubmit, errors } = useZod<UpdateNameRequest>(updateNameSchema);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { profile } = useAppSelector((state) => state.profile);

    if (profile === null) {
        return null;
    }
    const firstName = profile.firstName || "";
    const lastName = profile.lastName || "";

    const [updateName, { data, status, error }] = useUpdateNameMutation();

    const onSubmit = async (req: UpdateNameRequest) => {
        try {
            onInitRequest();
            updateName(req);
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
        console.error("Update name error:", error);
    }

    const onRejected = () => {
        dispatch(setOverlay(false));
        setDisabled(false);
        handleRejected({ error, message: "Update name rejected", navigate });
    }

    const onFulfilled = () => {
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
            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                <ModalHeader
                    title={t("modal.title")}
                    buttonText={"OK"}
                    onHide={onHide}
                    disabled={disabled}
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
                            disabled={disabled}
                            register={register}
                            error={errors.firstName as FieldError}
                        />

                        <FloatingInput
                            tabIndex={2}
                            type="text"
                            name="lastName"
                            label={t("last-name.label")}
                            defaultValue={lastName}
                            disabled={disabled}
                            register={register}
                            error={errors.lastName as FieldError}
                        />

                    </Container>
                </Modal.Body>
            </Form>
        </Modal >
    )
}