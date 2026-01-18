"use client"
import { useEffect, useState } from "react";
import { Button } from "../components/atoms/button/Button";
import ListOfCard from "../components/organisms/ListOfCard";
import { ITask } from "../helpers/types/task/task.dto";
import { createTask, getTasks } from "../services/task-services/task.service";
import { Modal } from "../components/molecules/modal";
import { Select, Textfield } from "../components/atoms/input";
import TaskForm from "../components/organisms/form/TaskForm";
import { CreateTaskSchema } from "../helpers/schema";

export default function Home() {
  const [dataTask, setDataTask] = useState<ITask[]>()
  const [loadingTask, setLoadingTask] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  

  const handleOpenModalCreate = () => setModalOpen(true)
  const handleCloseModalCreate = () => {
    setModalOpen(false)
  }

  const onSubmit = async(data: CreateTaskSchema) => {
    try {
      await createTask(data)
      alert('Success create task')
      fetchTask()
      handleCloseModalCreate()
    } catch (error) {
      alert(`Failed create task: ${error}`)
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
      <TaskForm isOpen={modalOpen} onClose={handleCloseModalCreate} onSubmit={(e) => onSubmit(e)}/>
      <div className="flex items-center justify-between">
        <h1>List of Task</h1>
        <Button onClick={handleOpenModalCreate}>Create Task</Button>
      </div>

      <div className="mt-5">
        <div className="w-full">
          <ListOfCard tasks={dataTask || []}/>
        </div>
      </div>
    </div>
  );
}
