export function getCurrentPageFromUrl() {
    const queryParams = new URLSearchParams(window.location.search);
    const page = queryParams.get("page");
    return page === null ? 1 : parseInt(page);
};