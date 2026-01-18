import z from "zod";
import { STATUS_TASK } from "../../types/task/task.dto";

export const createTaskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    status: z.nativeEnum(STATUS_TASK).optional()
})


export type CreateTaskSchema = z.infer<typeof createTaskSchema>