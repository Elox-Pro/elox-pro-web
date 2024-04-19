export function getProfileFullname(firstName: string | undefined, lastName: string | undefined): string | null {
    if (!firstName && !lastName) {
        return null;
    }
    return `${firstName || ""} ${lastName || ""}`;
}