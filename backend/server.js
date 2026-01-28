const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

// importo las rutas de tareas
const rutasTareas = require('./routes/tasks')

const app = express()

// middleware para parsear JSON y permitir peticiones de otros origenes
app.use(express.json())
app.use(cors())

// ruta principal para verificar que el servidor funciona
app.get('/', (req, res) => {
    res.json({
        mensaje: 'API de DevTask Tracker funcionando correctamente',
        endpoints: {
            tareas: '/api/tasks'
        }
    })
})

// uso las rutas de tareas en /api/tasks
app.use('/api/tasks', rutasTareas)

// conexion a MongoDB Atlas
const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Conectado a MongoDB Atlas correctamente!')
    } catch (error) {
        console.log('Error conectando a MongoDB:', error.message)
        console.log('Asegurate de configurar MONGO_URI en el archivo .env')
        process.exit(1)
    }
}

// inicio el servidor
const PORT = process.env.PORT || 3000

conectarDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`)
        console.log('Endpoints disponibles:')
        console.log(`  GET    http://localhost:${PORT}/api/tasks`)
        console.log(`  POST   http://localhost:${PORT}/api/tasks`)
        console.log(`  DELETE http://localhost:${PORT}/api/tasks/:id`)
    })
})
