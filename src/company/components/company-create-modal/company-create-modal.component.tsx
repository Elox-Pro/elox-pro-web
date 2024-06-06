import Row from "react-bootstrap/esm/Row";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import ModalForm from "../../../common/components/modal-form/modal-form.component";
import Col from "react-bootstrap/esm/Col";
import SubmitButton from "../../../common/components/submit-button/submit-button";
import { companyCreateModalAction } from "../../features/company-create-modal.slice";
import { ZodType, z } from "zod";
import { ZodErrorKey } from "../../../app/constants/zod-error.constants";
import { useZodForm } from "../../../common/hooks/zod-form.hook";
import { FieldError } from "react-hook-form";
import FloatingInput from "../../../common/components/floating-input/floating-input.component";
import { useCreateCompanyMutation } from "../../api/company.api";
import { CreateCompanyRequest } from "../../types/create-company/create-company-request.type";
import { useEffect } from "react";
import { setOverlay } from "../../../common/features/common.slice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { QueryStatus } from "@reduxjs/toolkit/query/react";

export default function CompanyCreateModal() {

    const companyCreateModal = useAppSelector((state) => state.companyCreateModal);
    const overlay = useAppSelector((state) => state.common.overlay);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [mutation, { status, data }] = useCreateCompanyMutation();

    const schema: ZodType<CreateCompanyRequest> = z.object({
        name: z.string().min(3, { message: ZodErrorKey.required })
    });

    const zodForm = useZodForm<CreateCompanyRequest>(schema);
    const nameWatch = zodForm.watch("name");

    const onSubmit = (req: CreateCompanyRequest) => {
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
            onClose();
            navigate(`/cpanel/companies/${data.company.id}`);
            toast.success("Company created successfully");
        }
    }, [status, data])

    const onClose = () => {
        dispatch(companyCreateModalAction.setShow(false));
        zodForm.reset();
    }

    return (
        <ModalForm.Content
            show={companyCreateModal.show}
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
                            autoFocus={true}
                            register={zodForm.register}
                            error={zodForm.errors.name as FieldError}
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