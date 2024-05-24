import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import { useAppDispatch } from "../../app/hooks/app.hooks";
import { PaginationState } from "../types/pagination-state.type";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export type PaginationProps = {
    pagination: PaginationState;
    setCurrentPage: ActionCreatorWithPayload<number>;
    setSearchBarFocus: ActionCreatorWithPayload<boolean>;
};

/**
 * Custom hook for handling pagination logic.
 * 
 * @param {PaginationProps} props - The properties required for pagination.
 * @returns {object} An object containing the renderPaginationItems function.
 */
export function usePagination({ pagination, setCurrentPage, setSearchBarFocus }: PaginationProps) {
    const { currentPage, resultCount, itemsPerPage } = pagination;
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

    /**
     * Renders the pagination items.
     * 
     * @returns {JSX.Element} A JSX element containing the pagination items.
     */
    const renderPaginationItems = (): JSX.Element => {
        // Array to hold the pagination items
        const paginationItems = [];
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
            paginationItems.push(
                <Pagination.Item key={1} onClick={() => handlePageChange(1)}>
                    1
                </Pagination.Item>
            );
            // Add an ellipsis if there's a gap between the first page and the start page
            if (startPage > 2) {
                paginationItems.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
            }
        }

        // Add the range of visible pages
        for (let page = startPage; page <= endPage; page++) {
            paginationItems.push(
                <Pagination.Item key={page} active={page === currentPage} onClick={() => handlePageChange(page)}>
                    {page}
                </Pagination.Item>
            );
        }

        // Add the last page and ellipsis if necessary
        if (endPage < totalPages) {
            // Add an ellipsis if there's a gap between the end page and the last page
            if (endPage < totalPages - 1) {
                paginationItems.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
            }
            // Add the last page
            paginationItems.push(
                <Pagination.Item key={totalPages} onClick={() => handlePageChange(totalPages)}>
                    {totalPages}
                </Pagination.Item>
            );
        }

        // Return the complete pagination bar with previous, page items, and next buttons
        return (
            <Pagination>
                {/* Previous button, disabled if on the first page */}
                <Pagination.Prev onClick={handleOnPrevious} disabled={currentPage === 1} />
                {/* Pagination items */}
                {paginationItems}
                {/* Next button, disabled if on the last page */}
                <Pagination.Next onClick={handleOnNext} disabled={currentPage === totalPages} />
            </Pagination>
        );
    };

    return {
        renderPaginationItems
    };
}
