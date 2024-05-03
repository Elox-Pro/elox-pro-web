import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useZodForm } from "../../../common/hooks/zod-form.hook";
import { useAppSelector } from "../../../app/hooks/app.hooks";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/esm/Modal";
import { Form } from "react-bootstrap";
import ModalHeader from "../../../common/components/modal/modal-header/modal-header.component";
import { UpdateTfaRequest } from "../../types/update-tfa/update-tfa-request.type";
import { updateTfaSchema } from "../../schemas/update-tfa.schema";
import { TfaType } from "../../../tfa/enums/validate-tfa/tfa-type.enum";
import { useUpdateTfaMutation } from "../../api/profile.api";
import { QueryStatus } from "@reduxjs/toolkit/query";

type UpdateTfaModalProps = {
    show: boolean,
    onHide: () => void
}
export default function UpdateTfaModal({ show, onHide }: UpdateTfaModalProps) {

    const { t } = useTranslation("profile", { keyPrefix: "update-tfa" });
    const { handleSubmit, register } = useZodForm<UpdateTfaRequest>(updateTfaSchema);
    const { profile } = useAppSelector((state) => state.profile);

    if (profile === null) {
        return null;
    }

    const tfaTypeAux = profile.tfaType || TfaType.NONE;
    const [checkedNone, checkedEmail] = tfaTypeAux === TfaType.NONE ? [true, false] : [false, true];

    const [mutation, { status, isLoading }] = useUpdateTfaMutation();

    const onSubmit = async (req: UpdateTfaRequest) => {
        try {
            mutation(req);
        } catch (error) {
            console.error(error);
            toast.error(JSON.stringify(error));
        }
    }

    useEffect(() => {
        if (status === QueryStatus.fulfilled) {
            onHide();
            toast.success(t("success.on-fullfilled"));
        }
    }, [status]);

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
                    onHide={onHide}
                    disabled={isLoading}
                    tabIndex={3} />
                <Modal.Body className="p-3">
                    <h3>{t("container.title")}</h3>
                    <p className="text-muted">
                        {t("container.subtitle")}
                    </p>

                    <Form.Check
                        tabIndex={1}
                        id={TfaType.NONE}
                        type="radio"
                        value={TfaType.NONE}
                        defaultChecked={checkedNone}
                        autoFocus
                        label={t(TfaType.NONE)}
                        {...register("tfaType")}
                    />
                    <Form.Check
                        tabIndex={2}
                        id={TfaType.EMAIL}
                        type="radio"
                        value={TfaType.EMAIL}
                        defaultChecked={checkedEmail}
                        label={t(TfaType.EMAIL)}
                        {...register("tfaType")}
                    />
                </Modal.Body>
            </Form>
        </Modal>
    )
}