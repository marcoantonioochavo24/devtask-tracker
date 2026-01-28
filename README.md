# DevTask Tracker 📋

Aplicación web para gestionar tareas de desarrollo. Hecha con Node.js, Express, MongoDB y JavaScript vanilla.

![Estado](https://img.shields.io/badge/estado-en%20desarrollo-green)

## ✨ Características

- Crear tareas con título, tecnología y estado
- Ver todas las tareas en tiempo real
- Eliminar tareas con un click
- Diseño moderno y responsivo
- Interfaz que se actualiza sin recargar la página

## 🛠️ Tecnologías

**Backend:**
- Node.js
- Express.js
- MongoDB Atlas + Mongoose
- CORS

**Frontend:**
- HTML5 semántico
- CSS3 (Grid/Flexbox)
- JavaScript vanilla (Fetch API)

## 📁 Estructura del proyecto

```
devtask-tracker/
├── backend/
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── tasks.js
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── .gitignore
├── frontend/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── app.js
│   └── index.html
└── README.md
```

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/devtask-tracker.git
cd devtask-tracker
```

### 2. Instalar dependencias del backend

```bash
cd backend
npm install
```

### 3. Configurar MongoDB Atlas

1. Ve a [MongoDB Atlas](https://cloud.mongodb.com/) y crea una cuenta gratuita
2. Crea un cluster nuevo (el gratuito funciona bien)
3. En "Database Access" crea un usuario con contraseña
4. En "Network Access" añade tu IP (o 0.0.0.0/0 para permitir todas)
5. En "Connect" > "Drivers" copia tu cadena de conexión

### 4. Configurar las variables de entorno

Abre el archivo `backend/.env` y reemplaza los valores:

```env
MONGO_URI=mongodb+srv://TU_USUARIO:TU_PASSWORD@cluster0.xxxxx.mongodb.net/devtask-tracker?retryWrites=true&w=majority
PORT=3000
```

> ⚠️ **Importante**: Nunca subas el archivo .env a GitHub

### 5. Iniciar el servidor

```bash
npm start
```

Deberías ver:
```
Conectado a MongoDB Atlas correctamente!
Servidor corriendo en http://localhost:3000
```

### 6. Abrir el frontend

Abre `frontend/index.html` en tu navegador. ¡Listo!

## 📡 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/tasks` | Obtiene todas las tareas |
| POST | `/api/tasks` | Crea una nueva tarea |
| DELETE | `/api/tasks/:id` | Elimina una tarea por ID |

### Ejemplo de body para POST:

```json
{
    "titulo": "Crear componente de login",
    "tecnologia": "JavaScript",
    "estado": "pending"
}
```

## 🎨 Capturas de pantalla

*Puedes añadir capturas aquí*

## 📝 Notas

- El servidor debe estar corriendo para que el frontend funcione
- Las tareas se ordenan por fecha (las más nuevas primero)
- La tecnología puede ser: Java, JavaScript, Python, CSS, HTML, Node.js, MongoDB o Express

## 👤 Autor

**Marco Antonio Ochavo Fernández** 


