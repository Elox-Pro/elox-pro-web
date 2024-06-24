type PageDescriptionProps = {
    text: string;
}

export default function PageDescription({ text }: PageDescriptionProps) {
    return <p className="text-center">{text}</p>
}