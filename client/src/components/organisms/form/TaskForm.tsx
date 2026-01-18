"use client"
import { useForm } from "react-hook-form"
import { Button } from "../../atoms/button/Button"
import { Select, Textfield } from "../../atoms/input"
import { Modal } from "../../molecules/modal"
import { createTaskSchema, CreateTaskSchema } from "@/src/helpers/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { STATUS_TASK } from "@/src/helpers/types/task/task.dto"
import { useEffect, useState } from "react"


interface Props {
    isOpen: boolean
    onClose: () => void
    onSubmit: (val: CreateTaskSchema) => void
    defaultValues?: Partial<CreateTaskSchema> | null;

}
const TaskForm = ({isOpen, onClose, onSubmit, defaultValues}: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const isUpdate = !!defaultValues;
    const {register, handleSubmit, reset, formState: {errors, isSubmitting, isValid}} = useForm<CreateTaskSchema>({
        resolver: zodResolver(createTaskSchema),
        mode: "onChange",
    })
    const statusOptions = [
        { label: 'Open', value: STATUS_TASK.OPEN },
        { label: 'In Progress', value: STATUS_TASK.IN_PROGRESS },
        { label: 'Done', value: STATUS_TASK.DONE },
    ];

    const submit = async(data: CreateTaskSchema) => {
        onSubmit(data)
    }

    useEffect(() => {
        if (!isOpen) return;

        if (defaultValues) {
        reset(defaultValues);
        } else {
        reset({
            title: "",
            description: "",
            status: STATUS_TASK.OPEN,
        });
        }
    }, [isOpen, defaultValues, reset]);


  return (
    <Modal 
        open={isOpen} 
        title={isUpdate ? "Update Task" : "Create Task"} 
        onClose={onClose}>
        <form className="flex flex-col gap-y-5" onSubmit={handleSubmit(submit)}>
            <Textfield 
                label="Title" 
                type="text" 
                placeholder="Input title task"
                {...register('title')}
                error={errors.title}
                />
            <Textfield 
                label="Description" 
                type="text" 
                placeholder="Input description task"
                {...register('description')}
                error={errors.description}
                />
            <Select
                label="Status"
                options={statusOptions}
                placeholder="Select status"
                {...register('status')}
                error={errors.status}
            />
            <Button type="submit" className="btn-primary" disabled={!isValid || isSubmitting}>
                {isUpdate ? "Update Task" : "Create Task"}
            </Button>
        </form>
    </Modal>
  )
}

export default TaskForm