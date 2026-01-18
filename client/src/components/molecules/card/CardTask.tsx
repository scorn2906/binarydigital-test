import dayjs from "dayjs";
import { Badge } from "../../atoms/badge";
import Card from "../../atoms/card/card"
import { ITask, STATUS_TASK } from "@/src/helpers/types/task/task.dto";

const CardTask = ({id, title, description, status, createdAt}: ITask) => {
    const formatDate = (date: string) => {
        return dayjs(date).format('YYYY/MM/DD')
    }

    const getVariant = (taskStatus: string) => {
        if(taskStatus === STATUS_TASK.DONE) return 'success'
        if(taskStatus === STATUS_TASK.IN_PROGRESS) return 'primary'
        if(taskStatus === STATUS_TASK.OPEN) return 'secondary'
        return 'secondary'
    }
  return (
    <Card>
        <div className="p-3 flex flex-col gap-y-5">
            <div className="flex items-center justify-between">
                <h2>{title}</h2>
                <Badge className="text-xs" variant={getVariant(status)}>{status}</Badge>
            </div>
            <div className="">
                <p className="text-xs">Descriptions: </p>
                <p>{description}</p>
            </div>

            <div className="flex items-center justify-end text-xs text-gray-300">
                {formatDate(createdAt)}
            </div>
        </div>
    </Card>
  )
}

export default CardTask