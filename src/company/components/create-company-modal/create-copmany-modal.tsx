import Row from "react-bootstrap/esm/Row";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import ModalAction from "../../../common/components/modal-action/modal-action";
import Col from "react-bootstrap/esm/Col";
import SubmitButton from "../../../common/components/submit-button/submit-button";
import { ZodType, z } from "zod";
import { ZodErrorKey } from "../../../app/constants/zod-error.constants";
import { useZodForm } from "../../../common/hooks/zod-form.hook";
import { FieldError } from "react-hook-form";
import FloatingInput from "../../../common/components/floating-input/floating-input.component";
import { useCreateCompanyMutation } from "../../api/company.api";
import { CreateCompanyRequest } from "../../requests/create-company.request";
import { useEffect } from "react";
import { setOverlay } from "../../../common/features/common.slice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { QueryStatus } from "@reduxjs/toolkit/query/react";
import { setShowCreateCompanyModal } from "../../features/company.slice";

export default function CreateCompanyModal() {

    const { showCreateCompanyModal } = useAppSelector((state) => state.company);
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
        dispatch(setShowCreateCompanyModal(false));
        zodForm.reset();
    }

    return (
        <ModalAction.Content show={showCreateCompanyModal}>
            <ModalAction.Form onSubmit={zodForm.handleSubmit(onSubmit)}>
                <ModalAction.Header onClose={onClose} />
                <ModalAction.Body>
                    <ModalAction.BodyTitle value={"Create Company"} />
                    <ModalAction.BodyDescription value={"Please provide the official name of your company."} />
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
                </ModalAction.Body>
                <ModalAction.Footer>
                    <SubmitButton disabled={!nameWatch || nameWatch.length < 3 || overlay.active} />
                </ModalAction.Footer>
            </ModalAction.Form>
        </ModalAction.Content>
    );
}