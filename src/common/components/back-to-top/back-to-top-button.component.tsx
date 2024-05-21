import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import "./back-to-top.style.scss";

export default function BackToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 150) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <Button
            onClick={scrollToTop}
            variant="primary"
            style={{ display: isVisible ? 'block' : 'none' }}
            className="back-to-top">
            <i className="bi bi-chevron-up"></i>
        </Button>
    );
}