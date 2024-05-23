'use strict'

import { Router } from 'express'
import {
    addTarea,
    update,
    deleteTarea,
    listaTareas
} from './tareas.controller.js'

const api = Router()

api.post('/addTarea',  addTarea )
api.get('/listaTareas', listaTareas)
api.put('/update/:id', update)
api.delete('/deleteTarea/:id', deleteTarea)

export default api