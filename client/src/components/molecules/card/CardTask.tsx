import dayjs from "dayjs";
import { Badge } from "../../atoms/badge";
import Card from "../../atoms/card/card"
import { ITask, STATUS_TASK } from "@/src/helpers/types/task/task.dto";

interface Props extends ITask {
    onDelete?: (id: string) => void
    onClick?: (id: ITask) => void
}
const CardTask = ({id, title, description, status, createdAt, onDelete, onClick}: Props) => {
    const formatDate = (date: string) => {
        return dayjs(date).format('YYYY/MM/DD')
    }

    const getVariant = (taskStatus: string) => {
        if(taskStatus === STATUS_TASK.DONE) return 'success'
        if(taskStatus === STATUS_TASK.IN_PROGRESS) return 'primary'
        if(taskStatus === STATUS_TASK.OPEN) return 'secondary'
        return 'secondary'
    }

    const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        if(onDelete){
            onDelete(id)
        }
    }

    const handleClick = () => {
            const data = {
                id: id,
                title: title,
                description: description,
                status: status,
                createdAt: createdAt
            }
            if(onClick){
                onClick(data)
            }
    }
  return (
    <Card onClick={() => onClick && handleClick()}>
        <div className="p-3 flex flex-col gap-y-5">
            <div className="flex items-center justify-between">
                <h2>{title}</h2>
                <Badge className="text-xs" variant={getVariant(status)}>{status}</Badge>
            </div>
            <div className="">
                <p className="text-xs">Descriptions: </p>
                <p>{description}</p>
            </div>

            <div className="flex items-center justify-between gap-x-2 text-xs text-gray-300">
                { onDelete &&
                    <p className="text-red-500 cursor-pointer" onClick={(e) => handleDelete(e)}>Delete</p>
                }
                <p>
                    {formatDate(createdAt)}
                </p>
            </div>
        </div>
    </Card>
  )
}

export default CardTask