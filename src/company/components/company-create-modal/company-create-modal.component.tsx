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

export default function CompanyCreateModal() {

    const companyCreateModal = useAppSelector((state) => state.companyCreateModal);
    const dispatch = useAppDispatch();

    type FieldValues = {
        name: string;
    };

    const schema: ZodType<FieldValues> = z.object({
        name: z.string().min(3, { message: ZodErrorKey.required })
    });

    const zodForm = useZodForm<FieldValues>(schema);

    const onSubmit = () => {
        alert("submit");
    }

    const onClose = () => {
        dispatch(companyCreateModalAction.setShow(false));
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
                <SubmitButton disabled={false} />
            </ModalForm.Footer>
        </ModalForm.Content>
    );
}