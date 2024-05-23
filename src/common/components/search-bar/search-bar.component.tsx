import React, { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/esm/Form';
import { useTranslation } from 'react-i18next';
import "./search-bar.styles.scss"
import { getSearchFromUrl } from '../../helpers/get-param-from-url.helper';
import { useNavigate } from 'react-router-dom';

type SearchProps = {
    onSearch: (searchTerm: string) => void
    placeholder: string
    onReset?: () => void
    autoFocus?: boolean
    resultCount?: number
}

export default function SearchBar({
    onSearch,
    onReset,
    placeholder,
    autoFocus = false,
    resultCount = 0
}: SearchProps) {
    const { t } = useTranslation("common", { keyPrefix: "search-bar" });
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState(getSearchFromUrl());
    const [focus, setFocus] = useState(autoFocus);
    const [showReset, setShowReset] = useState(getSearchFromUrl().trim().length > 0);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        setFocus(true);
        event.target.select();
    };

    const setInputFocus = () => {
        inputRef.current?.focus();
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch(searchTerm);
        setShowReset(searchTerm.trim().length > 0);
    };

    const handleReset = () => {
        setShowReset(false);
        setInputFocus();
        setSearchTerm("");
        onSearch("");
        if (onReset !== undefined) {
            onReset();
        }
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        if (!searchTerm || searchTerm.trim().length === 0) {
            queryParams.delete('search');
        } else {
            queryParams.set('search', searchTerm);
        }
        navigate(`${window.location.pathname}?${queryParams.toString()}`, { replace: true });
    }, [searchTerm, window.location.pathname, navigate]);


    const handlePaginationEvent = () => {
        inputRef.current?.focus();
    };

    useEffect(() => {
        window.addEventListener('paginationEvent', handlePaginationEvent);
        return () => {
            window.removeEventListener('paginationEvent', handlePaginationEvent);
        };
    }, []);

    return (
        <div className="search-bar">
            <Form onSubmit={handleSubmit}>
                <div className={`input-group mb-3 ${focus && "active"}`}>
                    <span className="input-group-text bg-transparent">
                        <i className="bi bi-search"></i>
                    </span>

                    <input
                        ref={inputRef}
                        autoFocus={focus}
                        className="form-control"
                        type="search"
                        placeholder={placeholder}
                        value={searchTerm}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={() => setFocus(false)}
                    />

                    <button type="submit" className='btn btn-primary' onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)} >
                        {t("search")}
                    </button>
                </div>
            </Form>
            <div className="d-flex flex-column">
                <p className="text-end">
                    <small className="text-muted me-3">{resultCount} {t("result-found")}</small>
                    {showReset && (
                        <button role="link" className="btn btn-link link-reset" onClick={handleReset}>
                            <small><span>{t("reset")}</span>
                                <i className="ms-1 bi bi-x-circle"></i>
                            </small>
                        </button>
                    )}
                </p>
            </div>
        </div>
    );
};
