"use client"
import { useEffect, useState } from "react";
import { Button } from "../components/atoms/button/Button";
import ListOfCard from "../components/organisms/ListOfCard";
import { ITask, ReqUpdateTaskDTO } from "../helpers/types/task/task.dto";
import { createTask, deleteTask, getTasks, updateTask } from "../services/task-services/task.service";
import { Modal } from "../components/molecules/modal";
import { Select, Textfield } from "../components/atoms/input";
import TaskForm from "../components/organisms/form/TaskForm";
import { CreateTaskSchema } from "../helpers/schema";
import { set } from "zod";

export default function Home() {
  const [dataTask, setDataTask] = useState<ITask[]>()
  const [loadingTask, setLoadingTask] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null)

  

  const handleOpenModalCreate = () => setModalOpen(true)
  const handleCloseModalCreate = () => {
    setSelectedTask(null)
    setModalOpen(false)
  }

  const handleOpenModalUpdate = (data: ITask) => {
    setSelectedTask(data);
    handleOpenModalCreate()
  }

  const onSubmit = async(data: CreateTaskSchema) => {
    try {
      if(!data.id){
        await createTask(data)
        alert('Success create task')
      } else {
        if(data.id){
          const payload: ReqUpdateTaskDTO= {
            title: data.title,
            status: data.status,
            description: data.description
          }
          await updateTask(payload, data.id)
          alert('Success update task')
        }
      }
      fetchTask()
      handleCloseModalCreate()
    } catch (error) {
      alert(`Failed create task: ${error}`)
    }
   }

   const onDelete = async(id: string) => {
    try {
      await deleteTask(id)
      alert('Success delete task')
      fetchTask()
    } catch (error) {
      alert(`Failed delete task: ${error}`)
    }
   }


  const fetchTask = async() => {
    try {
      setLoadingTask(true)
      const res = await getTasks()
      if(res){
        setDataTask(res)
      }
    } catch (error) {
        console.error('Failed to fetch tasks', error);
    } finally {
      setLoadingTask(false)
    }
  }


    useEffect(() => {
      fetchTask()
    }, [])
  return (
    <div className="p-5">
      <TaskForm isOpen={modalOpen} 
        defaultValues={selectedTask}
        onClose={handleCloseModalCreate} 
        onSubmit={(e) => onSubmit(e)}/>
      <div className="flex items-center justify-between">
        <h1>List of Task</h1>
        <Button onClick={handleOpenModalCreate}>Create Task</Button>
      </div>

      <div className="mt-5">
        <div className="w-full">
          <ListOfCard tasks={dataTask || []} onDelete={onDelete} onClickCard={handleOpenModalUpdate}/>
        </div>
      </div>
    </div>
  );
}
