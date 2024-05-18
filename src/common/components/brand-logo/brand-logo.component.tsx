export enum BrandLogoType {
  FULL = "/icons/logo-color-520.png",
  WHITE = "/icons/logo-white-520.png",
}
type BrandLogoProps = {
  type: BrandLogoType
}
export default function BrandLogo({ type }: BrandLogoProps) {
  return <img className="img-fluid pt-5 mb-5" src={type} width={128} alt="logo-color" />
}
