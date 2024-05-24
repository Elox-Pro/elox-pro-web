export function getCurrentPageFromUrl() {
    const queryParams = new URLSearchParams(window.location.search);
    const page = queryParams.get("page");
    return page === null ? 1 : parseInt(page);
};

export function getSearchTextFromUrl() {
    const queryParams = new URLSearchParams(window.location.search);
    const search = queryParams.get("search");
    return search === null ? "" : search;
};

