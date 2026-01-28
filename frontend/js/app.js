// url de la api (cambiar si usas otro puerto)
const API_URL = 'http://localhost:3000/api/tasks'

// elementos del DOM que voy a usar mucho
const formulario = document.getElementById('formularioTarea')
const inputTitulo = document.getElementById('inputTitulo')
const selectTecnologia = document.getElementById('selectTecnologia')
const selectEstado = document.getElementById('selectEstado')
const contenedorTareas = document.getElementById('contenedorTareas')
const contadorTareas = document.getElementById('contadorTareas')
const mensajeVacio = document.getElementById('mensajeVacio')

// cuando carga la pagina, cargo todas las tareas
document.addEventListener('DOMContentLoaded', () => {
    console.log('App iniciada, cargando tareas...')
    cargarTareas()
})

// evento del formulario para crear tarea
formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    crearTarea()
})

// funcion para cargar todas las tareas desde la api
async function cargarTareas() {
    try {
        // muestro un loading mientras carga
        contenedorTareas.innerHTML = '<div class="loading"><div class="spinner"></div></div>'

        const respuesta = await fetch(API_URL)

        if (!respuesta.ok) {
            throw new Error('Error al obtener las tareas')
        }

        const tareas = await respuesta.json()
        console.log('Tareas cargadas:', tareas.length)

        mostrarTareas(tareas)

    } catch (error) {
        console.log('Error cargando tareas:', error)
        contenedorTareas.innerHTML = `
            <p style="color: #e17055; text-align: center; padding: 20px;">
                No se pudo conectar con el servidor. Asegurate de que esta corriendo.
            </p>
        `
    }
}

// funcion para mostrar las tareas en la interfaz
function mostrarTareas(tareas) {
    // limpio el contenedor
    contenedorTareas.innerHTML = ''

    // actualizo el contador
    contadorTareas.textContent = `${tareas.length} ${tareas.length === 1 ? 'tarea' : 'tareas'}`

    // si no hay tareas muestro el mensaje vacio
    if (tareas.length === 0) {
        mensajeVacio.style.display = 'block'
        return
    }

    mensajeVacio.style.display = 'none'

    // creo una tarjeta por cada tarea
    tareas.forEach((tarea, index) => {
        const tarjeta = crearTarjetaTarea(tarea, index)
        contenedorTareas.appendChild(tarjeta)
    })
}

// funcion para crear el html de una tarjeta
function crearTarjetaTarea(tarea, index) {
    const tarjeta = document.createElement('div')
    tarjeta.classList.add('tarjeta-tarea')
    tarjeta.style.animationDelay = `${index * 0.1}s`

    // formateo la fecha bonita
    const fecha = new Date(tarea.fecha)
    const fechaFormateada = fecha.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })

    // el texto del estado
    const textoEstado = tarea.estado === 'done' ? 'Completada' : 'Pendiente'

    tarjeta.innerHTML = `
        <h3 class="titulo-tarea">${tarea.titulo}</h3>
        <div class="info-tarea">
            <span class="badge badge-${tarea.tecnologia}">${tarea.tecnologia}</span>
            <span class="badge badge-estado badge-${tarea.estado}">${textoEstado}</span>
        </div>
        <p class="fecha-tarea">${fechaFormateada}</p>
        <button class="boton-eliminar" onclick="eliminarTarea('${tarea._id}')" title="Eliminar tarea">
            🗑️
        </button>
    `

    return tarjeta
}

// funcion para crear una nueva tarea
async function crearTarea() {
    const titulo = inputTitulo.value.trim()
    const tecnologia = selectTecnologia.value
    const estado = selectEstado.value

    // validacion basica
    if (!titulo) {
        alert('Por favor escribe un titulo para la tarea')
        inputTitulo.focus()
        return
    }

    const nuevaTarea = {
        titulo,
        tecnologia,
        estado
    }

    console.log('Creando tarea:', nuevaTarea)

    try {
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevaTarea)
        })

        if (!respuesta.ok) {
            throw new Error('Error al crear la tarea')
        }

        const tareaCreada = await respuesta.json()
        console.log('Tarea creada con exito:', tareaCreada)

        // limpio el formulario
        inputTitulo.value = ''
        selectTecnologia.value = 'JavaScript'
        selectEstado.value = 'pending'

        // recargo las tareas para mostrar la nueva
        cargarTareas()

    } catch (error) {
        console.log('Error al crear tarea:', error)
        alert('No se pudo crear la tarea. Revisa la consola.')
    }
}

// funcion para eliminar una tarea
async function eliminarTarea(id) {
    // pido confirmacion antes de borrar
    const confirmar = confirm('¿Seguro que quieres eliminar esta tarea?')

    if (!confirmar) return

    console.log('Eliminando tarea con id:', id)

    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        })

        if (!respuesta.ok) {
            throw new Error('Error al eliminar')
        }

        console.log('Tarea eliminada correctamente')

        // recargo las tareas
        cargarTareas()

    } catch (error) {
        console.log('Error al eliminar:', error)
        alert('No se pudo eliminar la tarea')
    }
}
