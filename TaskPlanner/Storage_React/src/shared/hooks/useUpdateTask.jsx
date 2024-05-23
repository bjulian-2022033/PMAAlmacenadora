import React, { useState } from 'react'
import { updateTaskRequest } from '../../service/api'

export const useUpdateTask = () => {
    const [updatedTask, setUpdateTask] = useState(null)

    const updateTask = async(id, task)=>{
        const response = await updateTaskRequest(id, task)
        if(response.error){
            toast.error('Error al actualizar')
        }else{
            setUpdateTask(response.data)
            toast.success('Actualizado correctamente')
        }
    }
  return {
    updatedTask,
    isFetching: !updatedTask,
    updateTask
  }
}
