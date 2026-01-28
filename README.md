# DevTask Tracker

Aplicación web fullstack para gestionar tareas de desarrollo. La hice como proyecto para practicar Node.js con MongoDB.

## Tecnologías usadas

- **Frontend:** HTML5, CSS3, JavaScript vanilla
- **Backend:** Node.js, Express.js
- **Base de datos:** MongoDB Atlas

## Cómo ejecutar el proyecto

### 1. Clonar e instalar

```bash
git clone https://github.com/tu-usuario/devtask-tracker.git
cd devtask-tracker/backend
npm install
```

### 2. Configurar MongoDB

Necesitas una cuenta en [MongoDB Atlas](https://cloud.mongodb.com/). Una vez tengas tu cluster:

- Crea el archivo `.env` en la carpeta backend con:

```
MONGO_URI=tu_cadena_de_conexion_aqui
PORT=3000
```

### 3. Iniciar el servidor

```bash
npm start
```

Luego abre `frontend/index.html` en el navegador.

## Endpoints de la API

- `GET /api/tasks` - obtener todas las tareas
- `POST /api/tasks` - crear tarea nueva
- `DELETE /api/tasks/:id` - eliminar tarea


## Autor

Marco Antonio Ochavo Fernández
