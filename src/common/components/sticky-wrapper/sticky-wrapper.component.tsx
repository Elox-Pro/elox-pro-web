import { ReactNode, useEffect, useState } from "react"
import "./sticky-wrapper.style.scss"

type StickyWrapperProps = {
    children: ReactNode
    sticky?: boolean
}

export default function StickyWrapper({ children, sticky }: StickyWrapperProps) {

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const stickyNone = `sticky-wrapper bg-body`;
    const stickyTop = ` ${stickyNone} sticky-top ${isScrolled ? 'scrolled' : ''}`;
    const className = sticky ? stickyTop : stickyNone;

    return (
        <section className={className}>
            <div className="wrapper-container">
                {children}
            </div>
        </section>
    );
}