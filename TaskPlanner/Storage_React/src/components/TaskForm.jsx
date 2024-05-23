import { useState, useEffect } from 'react'
import { useSaveTask } from '../shared/hooks/useSaveTask.jsx'
import { useDeleteTask } from '../shared/hooks/useDeleteTask.jsx'
import { useUpdateTask } from '../shared/hooks/useUpdateTask.jsx'
import toast from 'react-hot-toast'

export const TaskForm = ({ selectedTask, setUpdateTrigger }) => {
    const { isLoading, saveTask } = useSaveTask()
    const { updateTask } = useUpdateTask()
    const { deleteTask } = useDeleteTask()
    const [ formData, setFormData ] = useState({
        _id: null,
        name: '',
        surname: '',
        taskName: '',
        taskDescription: '',
        entryDate: '',
        departureDate: '',
        status: true
    })

    useEffect(() => {
        if (selectedTask) {
            setFormData({
                name: selectedTask.name,
                surname: selectedTask.surname,
                taskName: selectedTask.taskName,
                taskDescription: selectedTask.taskDescription,
                entryDate: selectedTask.entryDate,
                departureDate: selectedTask.departureDate,
                status: selectedTask.status
            })
        }
    }, [selectedTask])

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (new Date(formData.departureDate) < new Date(formData.entryDate)) {
            toast.error('Fechas no coincidentes.')
            return
        }
        const result = await saveTask(formData)
        if (result) {
            setUpdateTrigger(prev => !prev)
        }
    }

    const handleDelete = async () => {
        if(selectedTask){
            deleteTask(selectedTask.id)
        }else{
            toast.error('Error al eliminar, seleccione una fila primero')
        }
        setFormData({
            _id: '',
            name: '',
            surname: '',
            taskName: '',
            taskDescription: '',
            entryDate: '',
            departureDate: '',
            status: true
        })
        selectedTask(null)
    }

    const handleUpdate = async () => {
        if (selectedTask) {
            if (new Date(formData.departureDate) < new Date(formData.entryDate)) {
                toast.error('La fecha final no puede ser menor a la fecha de inicio.')
                return
            }
            const result = await updateTask(selectedTask.id, formData)
            if (result) {
                setUpdateTrigger(prev => !prev)
            }
        } else {
            toast.error('Seleccione una tarea para actualizar')
        }
        resetForm()
    }

    const handleCancel = () => {
        resetForm()
    }

    const resetForm = () => {
        setFormData({
            _id: '',
            name: '',
            surname: '',
            taskName: '',
            taskDescription: '',
            entryDate: '',
            departureDate: '',
            status: true
        })
        selectedTask(null)
    }

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: '#4ba9df', width: '95%', height: 'auto', marginLeft: '20px', marginTop:'5%', paddingTop: '2%'}}>
            <div style={{marginBottom: '60px'}}>
                <h2>Tasks</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3" style={{width: '90%'}}>
                    <div className="col-md-6">
                        <label htmlFor="name" className='form-label task-card-title'>Nombre</label>
                        <input value={formData.name} onChange={handleChange} name='name' type="text" className='form-control' id='name'/>
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor="surname" className='form-label task-card-title'>Surname</label>
                        <input value={formData.surname} onChange={handleChange} name='surname' className='form-control' id='surname' type="text" />
                    </div>
                </div>
                <div className='row mb-3' style={{width: '90%'}}>
                    <div className="col-md-6">
                        <label htmlFor="taskName" className='form-label task-card-title'>Nombre Tarea</label>
                        <input value={formData.taskName} onChange={handleChange} name='taskName' className='form-control' id='taskName' type="text" />
                    </div>
                    <div className='col-md-6'>
                        <label htmlFor="taskDescription" className='form-label task-card-title'>Descripcion tarea</label>
                        <input value={formData.taskDescription} onChange={handleChange} name='taskDescription' className="form-control" id="taskDescription" style={{ width: '100%', height: '6em' }} type="text" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="entryDate" className='form-label task-card-title'>Fecha inicio</label>
                        <input value={formData.entryDate} onChange={handleChange} name='entryDate' type="date" className='form-control' id='entryDate'/>
                    </div>
                    <div className="col-md-6" style={{marginBottom: '5%'}}>
                        <label htmlFor="departureDate" className='form-label task-card-title'>Fecha Final</label>
                        <input value={formData.departureDate} onChange={handleChange} name='departureDate' type="date" className='form-control' id='departureDate'/>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button style={{ marginRight: '2em' }} type="submit" className="btn btn-success" onClick={handleSubmit} disabled={isLoading}>Agregar</button>
                        <button style={{ marginRight: '2em' }} type="button" className="btn btn-primary" onClick={handleUpdate} >Actualizar</button>
                        <button style={{ marginRight: '2em' }} type="button" className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
                        <button style={{ marginRight: '2em' }} type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
