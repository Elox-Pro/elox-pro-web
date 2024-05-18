import "./css/flag-icon.min.css"
type FlagIconProps = {
    country: string | null;
}
export default function FlagIcon({ country }: FlagIconProps) {
    if (!country) {
        return null
    }
    return (
        <i className={`m-1 flag-icon flag-icon-${country}`}></i>
    )
}