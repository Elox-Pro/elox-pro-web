import { useAppDispatch, useAppSelector } from "../../app/hooks/app.hooks";
import { setPaginatorCurrentPage } from "../features/paginator.slice";
import { setSearchBarFocus } from "../features/search-bar.slice";

export type PaginatorItem = {
    label: string;
    type: "page" | "ellipsis" | "button";
    disabled: boolean;
    active: boolean;
    page?: number;
    onClick?: () => void;
};

type PaginatorProps = {
    withSearchBar?: boolean;
    onChange?: () => void;
}
/**
 * Custom hook for handling pagination logic.
 * 
 * @returns {object} An object containing the renderPaginationItems function.
 */
export function usePaginator({ withSearchBar = false, onChange }: PaginatorProps) {
    const { currentPage, results, itemsPerPage } = useAppSelector((state) => state.paginator);
    const dispatch = useAppDispatch();

    // Calculate the total number of pages
    const pages = Math.ceil(results / itemsPerPage);

    /**
     * Handles the change of page number.
     * 
     * @param {number} pageNumber - The new page number.
     */
    const handlePageChange = (pageNumber: number) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        dispatch(setPaginatorCurrentPage(pageNumber));
        if (onChange) {
            onChange();
        }
        if (withSearchBar) {
            dispatch(setSearchBarFocus(true));
        }
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
        if (currentPage < pages) {
            handlePageChange(currentPage + 1);
        }
    };

    const getItems = (): PaginatorItem[] => {
        // Array to hold the pagination items
        const items: PaginatorItem[] = [];
        // Maximum number of visible pages in the pagination bar
        const maxVisiblePages = 3;
        // Half of the maximum visible pages, used for calculating the range of pages to display
        const halfVisiblePages = Math.floor(maxVisiblePages / 2);

        // Variables to determine the range of pages to display
        let startPage, endPage;

        // Determine the start and end pages for pagination display
        if (pages <= maxVisiblePages) {
            // If the total number of pages is less than or equal to the maximum visible pages,
            // display all pages
            startPage = 1;
            endPage = pages;
        } else if (currentPage <= halfVisiblePages + 1) {
            // If the current page is close to the start (within half the max visible pages),
            // display the first set of pages
            startPage = 1;
            endPage = maxVisiblePages;
        } else if (currentPage + halfVisiblePages >= pages) {
            // If the current page is close to the end (within half the max visible pages),
            // display the last set of pages
            startPage = pages - maxVisiblePages + 1;
            endPage = pages;
        } else {
            // Otherwise, display pages around the current page
            startPage = currentPage - halfVisiblePages;
            endPage = currentPage + halfVisiblePages;
        }

        // Add the first page and ellipsis if necessary
        if (startPage > 1) {
            // Add the first page
            items.push({
                label: "1",
                type: "page",
                disabled: false,
                active: currentPage === 1,
                page: 1,
                onClick: () => handlePageChange(1),
            });
            // Add an ellipsis if there's a gap between the first page and the start page
            if (startPage > 2) {
                items.push({
                    label: "...",
                    type: "ellipsis",
                    disabled: true,
                    active: false,
                });
            }
        }

        // Add the range of visible pages
        for (let page = startPage; page <= endPage; page++) {
            items.push({
                label: String(page),
                type: "page",
                disabled: false,
                active: currentPage === page,
                page: page,
                onClick: () => handlePageChange(page),
            });
        }

        // Add the last page and ellipsis if necessary
        if (endPage < pages) {
            // Add an ellipsis if there's a gap between the end page and the last page
            if (endPage < pages - 1) {
                items.push({
                    label: "...",
                    type: "ellipsis",
                    disabled: true,
                    active: false,
                });
            }
            // Add the last page
            items.push({
                label: String(pages),
                type: "page",
                disabled: false,
                active: currentPage === pages,
                page: pages,
                onClick: () => handlePageChange(pages),
            });

        }

        items.push({
            label: "›",
            type: "button",
            disabled: currentPage === pages,
            active: false,
            onClick: handleOnNext,
        });

        items.unshift({
            label: "‹",
            type: "button",
            disabled: currentPage === 1,
            active: false,
            onClick: handleOnPrevious,
        });

        return items;
    };

    const items = getItems();

    return {
        items,
    };
}