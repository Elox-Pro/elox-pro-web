export function showGRecaptcha(value: boolean): void {
    const recaptchaBadge = document.querySelector(".grecaptcha-badge")
    if (!recaptchaBadge) {
        return;
    }

    if (value) {
        recaptchaBadge.classList.remove("d-none");
        return;
    }

    recaptchaBadge.classList.add("d-none");
    return;
}