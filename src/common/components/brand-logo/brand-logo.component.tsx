export enum BrandLogoType {
  FULL = "icons/logo-color-520.png",
  WHITE = "icons/logo-white-520.png",
}
type BrandLogoProps = {
  type: BrandLogoType
}
export default function BrandLogo({ type }: BrandLogoProps) {
  return <img className="img-fluid mb-3" src={type} width={96} alt="logo-color" />
}
