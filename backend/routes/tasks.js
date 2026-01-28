const express = require('express')
const router = express.Router()
const Tarea = require('../models/Task')

// ruta para obtener todas las tareas
// GET /api/tasks
router.get('/', async (req, res) => {
    try {
        // traigo todas las tareas ordenadas por fecha (las mas nuevas primero)
        const tareas = await Tarea.find().sort({ fecha: -1 })
        console.log('Tareas encontradas:', tareas.length)
        res.json(tareas)
    } catch (error) {
        console.log('Error al obtener tareas:', error.message)
        res.status(500).json({ mensaje: 'Error al obtener las tareas', error: error.message })
    }
})

// ruta para crear una tarea nueva
// POST /api/tasks
router.post('/', async (req, res) => {
    try {
        console.log('Datos recibidos:', req.body)

        const { titulo, tecnologia, estado } = req.body

        // creo la tarea con los datos que me llegan
        const nuevaTarea = new Tarea({
            titulo,
            tecnologia: tecnologia || 'JavaScript',
            estado: estado || 'pending'
        })

        const tareaGuardada = await nuevaTarea.save()
        console.log('Tarea creada con exito:', tareaGuardada.titulo)

        res.status(201).json(tareaGuardada)
    } catch (error) {
        console.log('Error al crear tarea:', error.message)
        res.status(400).json({ mensaje: 'Error al crear la tarea', error: error.message })
    }
})

// ruta para eliminar una tarea por su id
// DELETE /api/tasks/:id
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        console.log('Intentando eliminar tarea con id:', id)

        const tareaEliminada = await Tarea.findByIdAndDelete(id)

        if (!tareaEliminada) {
            return res.status(404).json({ mensaje: 'No encontre esa tarea' })
        }

        console.log('Tarea eliminada:', tareaEliminada.titulo)
        res.json({ mensaje: 'Tarea eliminada correctamente', tarea: tareaEliminada })
    } catch (error) {
        console.log('Error al eliminar:', error.message)
        res.status(500).json({ mensaje: 'Error al eliminar la tarea', error: error.message })
    }
})

module.exports = router
