'use strict'

import Tarea from './tareas.model.js'

//ADD 
export const addTarea = async (req, res) => {
    try {
        let data = req.body

        // Verificamos que las fechas de entrada y salida sean válidas
        if (data.entryDate > data.departureDate) {
            return res.status(401).send({ msg: 'La fecha de entrada no puede ser posterior a la fecha de salida.' })
        }

        let tarea = new Tarea(data)
        await tarea.save()
        return res.status(200).send({ msg: 'La tarea se guardó correctamente.' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ msg: 'Error al querer guardar una tarea.' })
    }
}

//UPDATE
export const update = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        
        if (!data.name || !data.surname || !data.taskName || !data.taskDescription || !data.entryDate || !data.departureDate) {
            return res.status(400).send({ msg: 'Han enviado datos que no se pueden actualizar o hay campos vacíos' })
        }
        // Verificamos que las fechas de entrada y salida sean válidas
        if (data.entryDate > data.departureDate) {
            return res.status(401).send({ msg: 'La fecha de entrada no puede ser posterior a la fecha de salida.' })
        }

        let updateTarea = await Tarea.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (!updateTarea) {
            return res.status(404).send({ msg: 'La tarea no existe y no actualizada' })
        }
        return res.status(200).send({ msg: 'La tarea se actualizo correctamente: ', updateTarea })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ msg: 'Error al querer actualizar la tarea.' })
    }
}

//DELETE 
export const deleteTarea = async (req, res) => {
    try {
        let { id } = req.params
        let deleteTa = await Tarea.findByIdAndDelete({ _id: id })
        if (!deleteTa) {
            return res.status(401).send({ msg: 'Tarea no encontrada no eliminada.' })
        }
        if (!deleteTa.deleteCount === 0) {
            return res.status(404).send({ msg: 'No hay tareas para eliminar' })
        }
        return res.status(200).send({ msg: 'Tarea eliminada exitosamente' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ msg: 'Error al querer eliminar una tarea' })
    }
}

//LISTA DE TAREAS 
export const listaTareas = async (req, res) => {
    try {
        let data = await Tarea.find()

        if(data.length === 0){
            return res.status(404).send({ msg: 'No hay tareas para mostrar.'})
        }

        const tareas = data
            .map((data) => {
                return {
                    id: data._id,
                    name: data.name,
                    surname: data.surname,
                    taskName: data.taskName,
                    taskDescription: data.taskDescription,
                    entryDate: data.entryDate,
                    departureDate: data.departureDate,
                    status: data.status
                }
            })

        return res.status(200).json({ ListaDeTareas: tareas })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ msg: 'Error al querer obtener las tareas' })
    }
}
