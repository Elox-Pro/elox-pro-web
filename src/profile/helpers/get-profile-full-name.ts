export function getProfileFullname(firstName: string | undefined, lastName: string | undefined): string {
    return `${firstName || ""} ${lastName || ""}`;
}