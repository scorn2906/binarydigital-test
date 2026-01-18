export enum STATUS_TASK {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
export interface ITask {
    id: string;
    title: string;
    description: string;
    status: STATUS_TASK
    createdAt: string;
}

export interface ReqTaskDTO{
    title: string;
    description?: string
    status?: STATUS_TASK
}

export interface ResTaskDTO{
    id: string;
    title: string;
    description: string;
    status: string;
    user: {
        id: string
    }
    createdAt: string;
    updatedAt: string
}