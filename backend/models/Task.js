const mongoose = require('mongoose')

// esquema para las tareas de desarrollo
// cada tarea tiene titulo, tecnologia, estado y fecha
const esquemaTarea = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'El titulo es obligatorio'],
        trim: true
    },
    tecnologia: {
        type: String,
        enum: ['Java', 'JavaScript', 'Python', 'CSS', 'HTML', 'Node.js', 'MongoDB', 'Express'],
        default: 'JavaScript'
    },
    estado: {
        type: String,
        enum: ['pending', 'done'],
        default: 'pending'
    },
    fecha: {
        type: Date,
        default: Date.now
    }
})

// exporto el modelo para usarlo en las rutas
const Tarea = mongoose.model('Task', esquemaTarea)

module.exports = Tarea
