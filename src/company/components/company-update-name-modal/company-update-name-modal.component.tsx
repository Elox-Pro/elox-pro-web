import Row from "react-bootstrap/esm/Row";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import ModalForm from "../../../common/components/modal-form/modal-form.component";
import Col from "react-bootstrap/esm/Col";
import SubmitButton from "../../../common/components/submit-button/submit-button";
import { ZodType, z } from "zod";
import { ZodErrorKey } from "../../../app/constants/zod-error.constants";
import { useZodForm } from "../../../common/hooks/zod-form.hook";
import { FieldError } from "react-hook-form";
import FloatingInput from "../../../common/components/floating-input/floating-input.component";
import { useUpdateCompanyNameMutation } from "../../api/company.api";
import { useEffect } from "react";
import { setOverlay } from "../../../common/features/common.slice";
import { toast } from "react-toastify";
import { QueryStatus } from "@reduxjs/toolkit/query/react";
import { UpdateCompanyNameRequest } from "../../types/update-company-name/update-company-name-request.type";
import { setShowModal } from "../../features/company-update-name.slice";
import { setCompany } from "../../features/company-info.slice";

export default function CompanyUpdateNameModal() {

    const state = useAppSelector((state) => state.companyUpdateName);
    const overlay = useAppSelector((state) => state.common.overlay);
    const company = useAppSelector((state) => state.companyInfo.company);

    const dispatch = useAppDispatch();
    const [mutation, { status, data }] = useUpdateCompanyNameMutation();

    if (!company) {
        return null;
    }

    const name = company.name || "";
    const id = company.id || 0;

    const schema: ZodType<UpdateCompanyNameRequest> = z.object({
        name: z.string().min(3, { message: ZodErrorKey.required }),
        id: z.coerce.number()
    });

    const zodForm = useZodForm<UpdateCompanyNameRequest>(schema);
    const nameWatch = zodForm.watch("name");

    const onSubmit = (req: UpdateCompanyNameRequest) => {
        try {
            dispatch(setOverlay(true));
            mutation(req);
        } catch (error) {
            console.error(error);
            toast.error(JSON.stringify(error));
        }
    }

    useEffect(() => {
        if (status === QueryStatus.fulfilled && data) {
            dispatch(setCompany(null));
            onClose();
            toast.success("Company name updated successfully");
        }
    }, [status, data])

    const onClose = () => {
        dispatch(setShowModal(false));
        zodForm.reset();
    }

    return (
        <ModalForm.Content
            show={state.modal.show}
            onSubmit={zodForm.handleSubmit(onSubmit)}>
            <ModalForm.Header onClose={onClose} />
            <ModalForm.Body>
                <Row>
                    <Col xs={12}>
                        <p className="text-muted">
                            Please provide the official name of your company.
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <FloatingInput
                            type="text"
                            name="name"
                            label={"name"}
                            defaultValue={name}
                            autoFocus={true}
                            register={zodForm.register}
                            error={zodForm.errors.name as FieldError}
                        />
                        <input
                            type="hidden"
                            defaultValue={id}
                            {...zodForm.register("id")}
                        />
                    </Col>
                </Row>
            </ModalForm.Body>
            <ModalForm.Footer>
                <SubmitButton disabled={!nameWatch || nameWatch.length < 3 || overlay.active} />
            </ModalForm.Footer>
        </ModalForm.Content>
    );
}