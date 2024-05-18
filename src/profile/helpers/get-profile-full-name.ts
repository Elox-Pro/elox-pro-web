export function getProfileFullname(firstName: string | null, lastName: string | null): string | null {
    if (!firstName && !lastName) {
        return null;
    }
    return `${firstName || ""} ${lastName || ""}`;
}