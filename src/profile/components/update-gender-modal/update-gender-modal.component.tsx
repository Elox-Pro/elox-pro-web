import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useZod } from "../../../common/hooks/zod.hook";
import { UpdateGenderRequest } from "../../types/update-gender/update-gender-request.type";
import { updateGenderSchema } from "../../schemas/update-gender.schema";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import { useNavigate } from "react-router-dom";
import { useUpdateGenderMutation } from "../../api/profile.api";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { setOverlay } from "../../../common/features/common.slice";
import { toast } from "react-toastify";
import { handleRejected } from "../../../common/helpers/handle-rejected.helper";
import Modal from "react-bootstrap/esm/Modal";
import { Form } from "react-bootstrap";
import ModalHeader from "../../../common/components/modal/modal-header/modal-header.component";
import { Gender } from "../../../users/enum/gender.enum";

type UpdateGenderModalProps = {
    show: boolean,
    onHide: () => void
}
export default function UpdateGenderModal({ show, onHide }: UpdateGenderModalProps) {

    const { t } = useTranslation("profile", { keyPrefix: "update-gender" });
    const [disabled, setDisabled] = useState(false);
    const { handleSubmit, register } = useZod<UpdateGenderRequest>(updateGenderSchema);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { profile } = useAppSelector((state) => state.profile);

    if (profile === null) {
        return null;
    }

    const genderAux = profile.gender || Gender.MALE;
    const [checkedMale, checkedFemale] = genderAux === Gender.MALE ? [true, false] : [false, true];

    const [updateGender, { data, status, error }] = useUpdateGenderMutation();

    const onSubmit = async (req: UpdateGenderRequest) => {
        try {
            onInitRequest();
            updateGender(req);
        } catch (error) {
            onErrorRequest(error);
        }
    }

    useEffect(() => {
        switch (status) {
            case QueryStatus.fulfilled: onFulfilled(); break;
            case QueryStatus.rejected: onRejected(); break;
            default: break;
        }
    }, [status, error, data]);

    const onInitRequest = () => {
        setDisabled(true);
        dispatch(setOverlay(true));
    }

    const onErrorRequest = (error: any) => {
        dispatch(setOverlay(false));
        setDisabled(false);
        toast.error(t("error.on-request"));
        console.error("Update gender error:", error);
    }

    const onRejected = () => {
        dispatch(setOverlay(false));
        setDisabled(false);
        handleRejected({ error, message: "Update gender rejected", navigate });
    }

    const onFulfilled = () => {
        dispatch(setOverlay(false));
        setDisabled(false);
        onHide();
        toast.success(t("success.on-fullfilled"));
    }

    return (

        <Modal
            className="update-gender-modal"
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
                    tabIndex={3} />
                <Modal.Body className="p-3">
                    <h3>{t("container.title")}</h3>
                    <p className="text-muted">
                        {t("container.subtitle")}
                    </p>

                    <Form.Check
                        tabIndex={1}
                        id={Gender.MALE}
                        type="radio"
                        value={Gender.MALE}
                        defaultChecked={checkedMale}
                        autoFocus
                        label={t(Gender.MALE)}
                        {...register("gender")}
                    />
                    <Form.Check
                        tabIndex={2}
                        id={Gender.FEMALE}
                        type="radio"
                        value={Gender.FEMALE}
                        defaultChecked={checkedFemale}
                        label={t(Gender.FEMALE)}
                        {...register("gender")}
                    />

                </Modal.Body>
            </Form>
        </Modal>
    )
}