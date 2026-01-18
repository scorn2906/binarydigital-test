import { Api } from "@/src/api/api"
import { ITask, ReqTaskDTO, ReqUpdateTaskDTO, ResTaskDTO } from "@/src/helpers/types/task/task.dto"


const api = Api.getInstance().getAxiosInstance()
export const getTasks = async(): Promise<ITask[]> => {
    const {data} = await api.get<ITask[]>('/api/tasks')
    return data
}

export const createTask = async(payload: ReqTaskDTO) => {
    return await api.post('/api/tasks', payload)
}

export const deleteTask = async(id: string) => {
    return await api.delete(`/api/tasks/${id}`)
}

export const updateTask = async(payload: ReqUpdateTaskDTO, id: string) => {
    return await api.patch<ResTaskDTO>(`/api/tasks/${id}`, payload)
}