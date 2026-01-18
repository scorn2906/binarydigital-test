import { ITask } from "@/src/helpers/types/task/task.dto"
import CardTask from "../molecules/card/CardTask"

interface Props {
    tasks: ITask[]
    onDelete?: (id: string) => void
    onClickCard?: (val: ITask) => void
}

const ListOfCard = ({tasks, onDelete, onClickCard}: Props) => {
    
  return (
    <div className="grid grid-cols-5 gap-5">
        {tasks.map((item) => {
            return (
                <CardTask key={item.id}
                    onClick={onClickCard}
                    id={item.id} 
                    title={item.title} 
                    description={item.description} 
                    status={item.status} 
                    createdAt={item.createdAt} 
                    onDelete={(e) => onDelete && onDelete(e)}/>
            )
        })}
    </div>
  )
}

export default ListOfCard