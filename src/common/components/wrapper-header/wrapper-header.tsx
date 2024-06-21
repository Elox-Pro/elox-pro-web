import { ReactNode, useEffect, useState } from "react"
import "./wrapper-header.scss"

type WrapperHeaderProps = {
    children: ReactNode
    sticky?: boolean
}

export default function WrapperHeader({ children, sticky }: WrapperHeaderProps) {

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const stickyNone = `wrapper-header bg-body`;
    const stickyTop = `${stickyNone} sticky-top ${isScrolled ? 'scrolled' : ''}`;
    const className = sticky ? stickyTop : stickyNone;

    return (
        <section className={className}>
            <div className="wrapper-container">
                {children}
            </div>
        </section>
    );
}