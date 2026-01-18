import { ITask } from "@/src/helpers/types/task/task.dto"
import CardTask from "../molecules/card/CardTask"

interface Props {
    tasks: ITask[]
}

const ListOfCard = ({tasks}: Props) => {
    
  return (
    <div className="grid grid-cols-5 gap-5">
        {tasks.map((item) => {
            return (
                <CardTask key={item.id} id={item.id} title={item.title} description={item.description} status={item.status} createdAt={item.createdAt}/>
            )
        })}
    </div>
  )
}

export default ListOfCard