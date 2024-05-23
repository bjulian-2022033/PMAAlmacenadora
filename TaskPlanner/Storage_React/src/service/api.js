import axios from "axios"

const apiClient = axios.create({
    baseURL: 'http://localhost:2880',
    timeout: 5000
})

export const addTask = async (data) => {
    try {
        return await apiClient.post('/tarea/addTarea', data)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const updateTaskRequest = async (id, data) => {
    try {
      return await apiClient.put(`/tarea/update/${id}`, data)
    } catch (err) {
      return {
        error: true,
        err
      }
    }
  }

  export const deleteTaskRequest = async (id) => {
    try {
      return await apiClient.delete(`tarea/deleteTarea/${id}`)
    } catch (err) {
      return {
        error: true,
        err
      }
    }
  }

  export const getTasksRequest = async () => {
    try {
      return await apiClient.get('/tarea/listaTareas');
    } catch (err) {
      return {
        error: true,
        err
      }
    }
  }
