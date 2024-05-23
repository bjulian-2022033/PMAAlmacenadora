import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addTask } from "../../service/api"
import toast from 'react-hot-toast'

export const useSaveTask = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const saveTask = async (task) => {
    setIsLoading(true)
    const response = await addTask(task)
    setIsLoading(false)
    if (response.error) {
      toast.error('Error al guardar el tarea')
    } else {
      toast.success('tarea guardado con éxito!')
    }
    navigate('/home')
  }


  return {
    isLoading,
    saveTask
  }
}