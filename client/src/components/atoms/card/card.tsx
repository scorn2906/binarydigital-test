import { extend } from "dayjs"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}
const Card = ({children, ...props}: Props) => {
  return (
    <div className="bg-white border-2 border-gray-300 w-full rounded-md" {...props}>{children}</div>
  )
}

export default Card