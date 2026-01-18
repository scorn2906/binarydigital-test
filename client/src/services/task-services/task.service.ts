import { Api } from "@/src/api/api"
import { ITask, ReqTaskDTO } from "@/src/helpers/types/task/task.dto"


const api = Api.getInstance().getAxiosInstance()
export const getTasks = async(): Promise<ITask[]> => {
    const {data} = await api.get<ITask[]>('/api/tasks')
    return data
}

export const createTask = async(payload: ReqTaskDTO) => {
    return await api.post('/api/tasks', payload)
}