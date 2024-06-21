type PageTitleProps = {
    value: string
}
export default function PageTitle({ value }: PageTitleProps) {
    return <p className="text-center fs-1 ">{value}</p>
}