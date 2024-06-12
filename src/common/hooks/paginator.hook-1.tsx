import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks/app.hooks";
import { PaginatorState } from "../types/pagination-state.type";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export type PaginatorItem = {
    label: string;
    type: "page" | "ellipsis" | "button";
    disabled: boolean;
    active: boolean;
    page?: number;
    onClick?: () => void;
};

export type PaginatorProps = {
    pagination: PaginatorState;
    setCurrentPage: ActionCreatorWithPayload<number>;
    setSearchBarFocus: ActionCreatorWithPayload<boolean>;
};

/**
 * Custom hook for handling pagination logic.
 * 
 * @param {PaginatorProps} props - The properties required for pagination.
 * @returns {object} An object containing the renderPaginationItems function.
 */
export function usePaginator({ pagination, setCurrentPage, setSearchBarFocus }: PaginatorProps) {
    const { currentPage, results: resultCount, itemsPerPage } = pagination;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Calculate the total number of pages
    const totalPages = Math.ceil(resultCount / itemsPerPage);

    // Effect to update the URL with the current page whenever it changes
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('page', String(currentPage));
        navigate(`${window.location.pathname}?${queryParams.toString()}`, { replace: true });
    }, [currentPage, window.location.pathname, navigate]);

    /**
     * Handles the change of page number.
     * 
     * @param {number} pageNumber - The new page number.
     */
    const handlePageChange = (pageNumber: number) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        dispatch(setCurrentPage(pageNumber));
        dispatch(setSearchBarFocus(true));
    };

    /**
     * Handles the event when the previous page button is clicked.
     */
    const handleOnPrevious = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    /**
     * Handles the event when the next page button is clicked.
     */
    const handleOnNext = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    const getItems = (): PaginatorItem[] => {
        // Array to hold the pagination items
        const paginationItems: PaginatorItem[] = [];
        // Maximum number of visible pages in the pagination bar
        const maxVisiblePages = 3;
        // Half of the maximum visible pages, used for calculating the range of pages to display
        const halfVisiblePages = Math.floor(maxVisiblePages / 2);

        // Variables to determine the range of pages to display
        let startPage, endPage;

        // Determine the start and end pages for pagination display
        if (totalPages <= maxVisiblePages) {
            // If the total number of pages is less than or equal to the maximum visible pages,
            // display all pages
            startPage = 1;
            endPage = totalPages;
        } else if (currentPage <= halfVisiblePages + 1) {
            // If the current page is close to the start (within half the max visible pages),
            // display the first set of pages
            startPage = 1;
            endPage = maxVisiblePages;
        } else if (currentPage + halfVisiblePages >= totalPages) {
            // If the current page is close to the end (within half the max visible pages),
            // display the last set of pages
            startPage = totalPages - maxVisiblePages + 1;
            endPage = totalPages;
        } else {
            // Otherwise, display pages around the current page
            startPage = currentPage - halfVisiblePages;
            endPage = currentPage + halfVisiblePages;
        }

        // Add the first page and ellipsis if necessary
        if (startPage > 1) {
            // Add the first page
            paginationItems.push({
                label: "1",
                type: "page",
                disabled: false,
                active: currentPage === 1,
                page: 1,
                onClick: () => handlePageChange(1),
            });
            // Add an ellipsis if there's a gap between the first page and the start page
            if (startPage > 2) {
                paginationItems.push({
                    label: "...",
                    type: "ellipsis",
                    disabled: true,
                    active: false,
                });
            }
        }

        // Add the range of visible pages
        for (let page = startPage; page <= endPage; page++) {
            paginationItems.push({
                label: String(page),
                type: "page",
                disabled: false,
                active: currentPage === page,
                page: page,
                onClick: () => handlePageChange(page),
            });
        }

        // Add the last page and ellipsis if necessary
        if (endPage < totalPages) {
            // Add an ellipsis if there's a gap between the end page and the last page
            if (endPage < totalPages - 1) {
                paginationItems.push({
                    label: "...",
                    type: "ellipsis",
                    disabled: true,
                    active: false,
                });
            }
            // Add the last page
            paginationItems.push({
                label: String(totalPages),
                type: "page",
                disabled: false,
                active: currentPage === totalPages,
                page: totalPages,
                onClick: () => handlePageChange(totalPages),
            });

        }

        paginationItems.push({
            label: "›",
            type: "button",
            disabled: currentPage === totalPages,
            active: false,
            onClick: handleOnNext,
        });

        paginationItems.unshift({
            label: "‹",
            type: "button",
            disabled: currentPage === 1,
            active: false,
            onClick: handleOnPrevious,
        });

        return paginationItems;
    };

    const paginationItems = getItems();

    return {
        paginationItems,
    };
}