import { Schema, model } from 'mongoose'

const storageSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    surname: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    taskName: {
        type: String,
        required: [true, 'El nombre de la tarea es obligatoria']
    },
    taskDescription: {
        type: String,
        required: [true, 'La descripción de la tarea es obligaotria']
    },
    entryDate: {
        type: Date,
        required: [true, 'La fecha de entrada es obligatoria']
    },
    departureDate: {
        type: Date,
        required: [true, 'La fecha de salida es obligatoria' ]
    },
    status: {
        type: Boolean,
        required: [true, 'El estado es oblogatorio'],
        default: true
    }
})

export default model('storage', storageSchema)