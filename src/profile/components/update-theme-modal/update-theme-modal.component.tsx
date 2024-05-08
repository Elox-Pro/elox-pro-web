import Container from "react-bootstrap/esm/Container"
import Modal from "react-bootstrap/esm/Modal"
import ModalHeader from "../../../common/components/modal/modal-header/modal-header.component";
import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/esm/Form";
import ListGroup from "react-bootstrap/esm/ListGroup";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import { setOverlay, setTheme } from "../../../common/features/common.slice";
import { getThemeList } from "../../../common/helpers/get-theme-list.helper";
import ThemeIcon from "../../../common/components/theme-icon/theme-icon.component";
import { Theme } from "../../../common/enums/theme.enum";

const themes = getThemeList();

type UpdateThemeModalProps = {
    show: boolean,
    onHide: () => void
}
export default function UpdateThemeModal({ show, onHide }: UpdateThemeModalProps) {
    const { t } = useTranslation("profile", { keyPrefix: "update-theme" });
    const theme = useAppSelector(state => state.common.theme);
    const [selectedTheme, setSelectedTheme] = useState<Theme>(theme.value);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setSelectedTheme(theme.value);
    }, [theme]);

    const handleSubmitRequest = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(setOverlay(true));
        dispatch(setTheme(selectedTheme));
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
                    tabIndex={themes.length + 1}
                />
                <Modal.Body className="p-3">
                    <Container>
                        <h3>{t("container.title")}</h3>
                        <p className="text-muted">
                            {t("container.subtitle")}
                        </p>
                        <ListGroup>
                            {themes.map((theme, idx) => (
                                <ListGroup.Item key={idx} className="d-flex align-items-center">
                                    <Form.Check
                                        type="radio"
                                        id={`theme-${theme}`}
                                        name="theme"
                                    >
                                        <Form.Check.Input
                                            type="radio"
                                            name="theme"
                                            checked={selectedTheme === theme}
                                            autoFocus={selectedTheme === theme}
                                            onChange={() => setSelectedTheme(theme)}
                                            value={theme}
                                            tabIndex={idx} />
                                        <Form.Check.Label className="d-flex align-items-center">
                                            <ThemeIcon theme={theme} />&nbsp;
                                            {t(theme)}
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