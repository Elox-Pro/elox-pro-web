import { useTranslation } from "react-i18next";
import BackToTopButton from "../../../common/components/back-to-top/back-to-top-button.component";
import CPWrapperPage from "../../../cpanel/components/wrapper-page/cp-wrapper-page.component";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import CardListGroup from "../../../common/components/card-list-group/card-list-group.component";
import ListGroupItem from "../../../common/components/list-group-item/list-group-item.component";
import ModalAction from "../../../common/components/modal-action/modal-action.component";
import Container from "react-bootstrap/esm/Container";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import { resetCompanyCreateState, setCompanyNameModal, setCompanyNameValue, setCompanySubmitFocus, setOwnerUsernameModal, setOwnerUsernameValue } from "../../features/create-company.slice";
import FloatingInput from "../../../common/components/floating-input/floating-input.component";
import { useZodForm } from "../../../common/hooks/zod-form.hook";
import { ZodType, z } from "zod";
import { ZodErrorKey } from "../../../app/constants/zod-error.constants";
import { FieldError } from "react-hook-form";
import { useEffect, useRef } from "react";
import ProgressBar from "react-bootstrap/esm/ProgressBar";
import { addCompanyProgressBarSubmitNow, setCompanyProgressBarSubmitFull, setCompanyProgressBarSubmitNow, setCompanyProgressBarSubmitValue } from "../../features/company-progress-bar-submit.slice";

export default function CompanyCreate() {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(resetCompanyCreateState());
        dispatch(setCompanyProgressBarSubmitFull(2));
        dispatch(setCompanyProgressBarSubmitNow(0));
        dispatch(setCompanyProgressBarSubmitValue(100 / 2))
    }, []);

    return (
        <>
            <CPWrapperPage show={true} >
                <Header />
                <CompanySection />
                <CompanyNameModal />
                <OwnerUsernameModal />
                <BackToTopButton />
            </CPWrapperPage>
        </>
    )
}

function Header() {
    const { t } = useTranslation("company", { keyPrefix: "info" });
    return (
        <Row className="text-center">
            <Col xs={12}>
                <p className="fs-1 mb-0">{t("title")}</p>
                <p>{t("subtitle")}</p>
            </Col>
        </Row>

    )
}


function CompanySection() {
    return (
        <>
            <Row className="mb-3">
                <Col xs={12}>
                    <CardListGroup.Container>
                        <CardListGroup.Body>
                            <CompanyNameItem />
                            <OwnerUsernameItem />
                        </CardListGroup.Body>
                    </CardListGroup.Container>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col xs={12}>
                    <ProgressBarSubmit />
                </Col>
            </Row>
        </>
    )
}

function CompanyNameItem() {
    const { companyNameValue } = useAppSelector(state => state.companyCreate);
    const dispatch = useAppDispatch();
    const onClick = () => {
        dispatch(setCompanyNameModal(true));
    }
    const value = companyNameValue || "Set the name of your company";

    return (
        <ListGroupItem.Container onClick={onClick}>
            <ListGroupItem.Body>
                <ListGroupItem.BodyIcon
                    iconClass={`bi bi-check rounded-icon ${companyNameValue ? 'rounded-icon-success' : 'rounded-icon-default'}`} />
                <ListGroupItem.BodySection>
                    <p className="mb-0 text-muted">
                        <small>Company name</small>
                    </p>
                    <p className="mb-0">
                        {value}
                    </p>
                </ListGroupItem.BodySection>
            </ListGroupItem.Body>
            <ListGroupItem.ChevronIcon />
        </ListGroupItem.Container>
    )
}

function OwnerUsernameItem() {
    const { ownerUsernameValue } = useAppSelector(state => state.companyCreate);
    const dispatch = useAppDispatch();
    const onClick = () => {
        dispatch(setOwnerUsernameModal(true));
    }
    const value = ownerUsernameValue || "Set the owner's username";

    return (
        <ListGroupItem.Container onClick={onClick}>
            <ListGroupItem.Body>
                <ListGroupItem.BodyIcon
                    iconClass={`bi bi-check rounded-icon ${ownerUsernameValue ? 'rounded-icon-success' : 'rounded-icon-default'}`}
                />
                <ListGroupItem.BodySection>
                    <p className="mb-0 text-muted">
                        <small>Owner's username</small>
                    </p>
                    <p className="mb-0">
                        {value}
                    </p>
                </ListGroupItem.BodySection>
            </ListGroupItem.Body>
            <ListGroupItem.ChevronIcon />
        </ListGroupItem.Container>
    )
}

function CompanyNameModal() {

    const { companyNameModal } = useAppSelector(state => state.companyCreate);
    const dispatch = useAppDispatch();
    const onHide = () => {
        dispatch(setCompanyNameModal(false));
    }

    type FieldValues = {
        name: string;
    };

    const schema: ZodType<FieldValues> = z.object({
        name: z.string().min(3, { message: ZodErrorKey.required })
    });

    const { register, handleSubmit, errors } = useZodForm<FieldValues>(schema);

    const onSubmit = (field: FieldValues) => {
        dispatch(setCompanyNameValue(field.name));
        dispatch(setCompanyNameModal(false));
        dispatch(setOwnerUsernameModal(true));
        dispatch(addCompanyProgressBarSubmitNow());
    }

    return (
        <ModalAction.Form show={companyNameModal} onSubmit={handleSubmit(onSubmit)}>
            <ModalAction.Header onClose={onHide} tabIndex={2}>
                <ModalAction.HeaderTitle
                    title={"Company Name"} />
            </ModalAction.Header>
            <ModalAction.Body>
                <Container>
                    <Row>
                        <Col xs={12}>
                            <p className="text-muted">
                                Please provide the official name of your company.
                            </p>
                        </Col>
                        <Col xs={12}>
                            <FloatingInput
                                tabIndex={1}
                                type="text"
                                name="name"
                                label={"Company name"}
                                autoFocus
                                register={register}
                                error={errors.name as FieldError}
                            />
                        </Col>
                    </Row>
                </Container>
            </ModalAction.Body>
        </ModalAction.Form>
    )
}

function OwnerUsernameModal() {
    const { ownerUsernameModal } = useAppSelector(state => state.companyCreate);
    const dispatch = useAppDispatch();

    const onHide = () => {
        dispatch(setOwnerUsernameModal(false));
    }

    type FieldValues = {
        username: string;
    };

    const schema: ZodType<FieldValues> = z.object({
        username: z.string().min(3, { message: ZodErrorKey.required })
    });

    const { register, handleSubmit, errors } = useZodForm<FieldValues>(schema);

    const onSubmit = (field: FieldValues) => {
        dispatch(setOwnerUsernameValue(field.username));
        dispatch(setOwnerUsernameModal(false));
        dispatch(addCompanyProgressBarSubmitNow());
        dispatch(setCompanySubmitFocus(true));
    }

    return (
        <ModalAction.Form
            show={ownerUsernameModal}
            onSubmit={handleSubmit(onSubmit)}>
            <ModalAction.Header onClose={onHide} tabIndex={2}>
                <ModalAction.HeaderTitle
                    title={"Owner username"} />
            </ModalAction.Header>
            <ModalAction.Body>
                <Container>
                    <Row>
                        <Col xs={12}>
                            <p className="text-muted">
                                Please provide the owner's username for the company.
                            </p>
                        </Col>
                        <Col xs={12}>
                            <FloatingInput
                                tabIndex={1}
                                type="text"
                                name="username"
                                label={"username"}
                                autoFocus={true}
                                register={register}
                                error={errors.username as FieldError}
                            />
                        </Col>
                    </Row>
                </Container>
            </ModalAction.Body>
        </ModalAction.Form>
    )
}

function ProgressBarSubmit() {
    const { now } = useAppSelector(state => state.companyProgressBarSubmit);
    const { companyNameValue, ownerUsernameValue, companySubmitFocus } = useAppSelector(state => state.companyCreate);

    useEffect(() => {
        console.log(companySubmitFocus)
        if (companySubmitFocus) {
            document.getElementById("123")?.focus();
        }
    }, [companySubmitFocus]);

    const handleSubmit = () => {
        console.log(companyNameValue, ownerUsernameValue);
    }

    return (
        <CardListGroup.Container>
            <CardListGroup.Body>
                <ListGroupItem.Container disabled={now < 100} onClick={handleSubmit}>
                    <ListGroupItem.Body>
                        <ListGroupItem.BodyIcon
                            iconClass={`bi bi-check rounded-icon ${now >= 100 ? 'rounded-icon-success' : 'rounded-icon-default'}`} />
                        <ListGroupItem.BodySection>
                            <p className="mb-0 text-muted">
                                <small>Confirm and Submit</small>
                            </p>
                            <ProgressBar now={now} style={{ "height": "5px" }} className="mt-1" />
                        </ListGroupItem.BodySection>
                    </ListGroupItem.Body>
                    <ListGroupItem.IconCol iconClass="bi bi-send" />
                </ListGroupItem.Container>
            </CardListGroup.Body>
        </CardListGroup.Container>
    )
}