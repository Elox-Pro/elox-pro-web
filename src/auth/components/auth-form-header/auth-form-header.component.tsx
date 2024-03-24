type AuthFormHeaderProps = {
  title: string
  description: string
}
export default function AuthFormHeader({ title, description }: AuthFormHeaderProps) {
  return (
    <div className="text-center">
      <h3 className="text-body-highlight">{title}</h3>
      <p className="text-body-tertiary">{description}</p>
    </div>
  )
}
