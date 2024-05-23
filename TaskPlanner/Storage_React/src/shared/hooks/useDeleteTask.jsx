import React from 'react'
import { deleteTaskRequest } from '../../service/api'
import toast from 'react-hot-toast'

export const useDeleteTask = () => {
    const deleteTask = async(id)=>{
        const response = await deleteTaskRequest(id)
        if(response.error){
            toast.error('Error al eliminar')
        }else{
            toast.success('Tarea eliminada')
        }
    }
  return {
    deleteTask
  }
}
