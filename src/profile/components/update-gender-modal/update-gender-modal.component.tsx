import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useZodForm } from "../../../common/hooks/zod-form.hook";
import { UpdateGenderRequest } from "../../types/update-gender/update-gender-request.type";
import { updateGenderSchema } from "../../schemas/update-gender.schema";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import { useUpdateGenderMutation } from "../../api/profile.api";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/esm/Modal";
import { Form } from "react-bootstrap";
import ModalHeader from "../../../common/components/modal/modal-header/modal-header.component";
import { Gender } from "../../../users/enum/gender.enum";
import { setOverlay } from "../../../common/features/common.slice";

type UpdateGenderModalProps = {
    show: boolean,
    onHide: () => void
}
export default function UpdateGenderModal({ show, onHide }: UpdateGenderModalProps) {

    const { t } = useTranslation("profile", { keyPrefix: "update-gender" });
    const { handleSubmit, register } = useZodForm<UpdateGenderRequest>(updateGenderSchema);
    const { profile } = useAppSelector((state) => state.profile);
    const { overlay } = useAppSelector((state) => state.common);
    const dispatch = useAppDispatch();

    if (profile === null) {
        return null;
    }

    const genderAux = profile.gender || Gender.MALE;
    const [checkedMale, checkedFemale] = genderAux === Gender.MALE ? [true, false] : [false, true];

    const [mutation, { status }] = useUpdateGenderMutation();

    const onSubmit = async (req: UpdateGenderRequest) => {
        try {
            dispatch(setOverlay(true));
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
                    disabled={overlay.active}
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