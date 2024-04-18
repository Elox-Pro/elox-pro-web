import { ButtonHTMLAttributes } from "react";
import Button from "react-bootstrap/esm/Button";
import { useTranslation } from "react-i18next";

type SubmitButtonProps = {} & ButtonHTMLAttributes<HTMLButtonElement>
export default function SubmitButton({ ...props }: SubmitButtonProps) {
    const { t } = useTranslation("common", { keyPrefix: "submit-button" });

    return (
        <Button type="submit" variant="primary" className="w-100 mb-3 btn-lg" {...props}>
            {t('text')}
        </Button>
    );
};