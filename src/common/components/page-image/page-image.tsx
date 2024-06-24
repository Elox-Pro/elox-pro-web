type PageImageProps = {
    src: string;
    alt: string;
}
export default function PageImage({ src, alt }: PageImageProps) {
    return <p className="text-center"><img width={48} src={src} alt={alt} /></p>
}
