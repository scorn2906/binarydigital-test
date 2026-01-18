
interface Props {
    children: React.ReactNode
}
const Card = ({children}: Props) => {
  return (
    <div className="bg-white border-2 border-gray-300 w-full rounded-md">{children}</div>
  )
}

export default Card