import { useState } from "react"
import { getTasksRequest } from "../../service/api"

export const useGetTask = () => {
    const [tasks, setTasks] = useState(null)

    const getTask = async()=>{
        const response = await getTasksRequest()
        if(response.error){
            alert(
                response.err.response.data.message ||
                'Error al obtener los tareas'
            )
        }
        setTasks(response.data)

    }
  return {
    tasks,
    isFetching: !tasks,
    getTask
  }
}
