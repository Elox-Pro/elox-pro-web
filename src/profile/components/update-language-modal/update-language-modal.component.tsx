import Container from "react-bootstrap/esm/Container"
import Modal from "react-bootstrap/esm/Modal"
import ModalHeader from "../../../common/components/modal/modal-header/modal-header.component";
import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/esm/Form";
import useAppLanguage from "../../../common/hooks/app-language.hook";
import ListGroup from "react-bootstrap/esm/ListGroup";
import { FormEvent, useEffect, useState } from "react";
import FlagIcon from "../../../common/components/flag-icon/flag-icon.component";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../app/hooks/app.hooks";
import { setOverlay } from "../../../common/features/common.slice";

type UpdateLanguageModalProps = {
    show: boolean,
    onHide: () => void
}
export default function UpdateLanguageModal({ show, onHide }: UpdateLanguageModalProps) {
    const { t } = useTranslation("profile", { keyPrefix: "update-language" });
    const { languages, language, handleChange } = useAppLanguage();
    const [code, setCode] = useState<string | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setCode(language.code);
    }, [language]);

    const handleSubmitRequest = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(setOverlay(true));
        handleChange(code);
        onHide();
        dispatch(setOverlay(false));
        toast.success(t("success.on-fullfilled"));
    };

    return (
        <Modal
            show={show}
            fullscreen="lg-down"
            scrollable
            backdrop="static"
            keyboard={false}>
            <Form onSubmit={handleSubmitRequest} noValidate>
                <ModalHeader
                    title={t("modal.title")}
                    buttonText={"OK"}
                    onHide={onHide}
                    tabIndex={3}
                />
                <Modal.Body className="p-3">
                    <Container>
                        <h3>{t("container.title")}</h3>
                        <p className="text-muted">
                            {t("container.subtitle")}
                        </p>
                        <ListGroup>
                            {languages.map((lang, idx) => (
                                <ListGroup.Item key={idx} className="d-flex align-items-center">
                                    <Form.Check
                                        type="radio"
                                        id={`language-${lang.code}`}
                                        name="language"
                                    >
                                        <Form.Check.Input
                                            type="radio"
                                            name="language"
                                            checked={code === lang.code}
                                            autoFocus={code === lang.code}
                                            onChange={() => setCode(lang.code)}
                                            value={lang.code || ""}
                                            tabIndex={idx + 1} />
                                        <Form.Check.Label className="d-flex align-items-center">
                                            <FlagIcon country={lang.flag} />
                                            {lang.code && t(lang.code)}
                                        </Form.Check.Label>
                                    </Form.Check>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Container>
                </Modal.Body>
            </Form>
        </Modal >
    )
}