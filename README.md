# 🖥️ Frontend del Proyecto MERN

Este repositorio contiene el **frontend** del proyecto, desarrollado con **React + Vite** y estilado con **Tailwind CSS**.  
El frontend se conecta al backend (Node.js + Express + MongoDB) a través de peticiones HTTP con **Axios**.

---

## 🚀 Cómo iniciar el proyecto

### 1️⃣ Clonar el repositorio
```bash
git clone <URL_DEL_REPOSITORIO_FRONTEND>
```

### 2️⃣ Entrar a la carpeta del archivo
```bash
cd <NOMBRE_DEL_PROYECTO>
```

### 3️⃣ Instalar las dependencias
```bash
npm install
```
### 4️⃣ Iniciar el proyecto
```bash
npm run dev
```

### 5️⃣ Crear el archivo .env
```bash
VITE_API_URL=<URL_DEL_BACKEND(wpp)>
```

📦 Dependencias principales y para qué sirven
🧠 Core

react → Librería principal para construir interfaces interactivas.

react-dom → Permite renderizar los componentes React en el navegador.

react-router-dom → Se usa para manejar las rutas/páginas (ejemplo: /login, /productos, /carrito).

🎨 Estilos

tailwindcss → Framework CSS para diseñar rápido usando clases utilitarias.

@tailwindcss/vite → Integración de Tailwind con Vite (permite que funcione sin configuración extra).

🌐 Conexión con el backend

axios → Librería para hacer peticiones HTTP al backend (por ejemplo, traer productos, usuarios, etc).

@tanstack/react-query → (Opcional) Maneja de forma avanzada las peticiones a la API: caching, reintentos, estados de carga, etc.

✅ Validación

zod → Librería para validar datos (por ejemplo, formularios).
Permite asegurarse de que los campos tengan el formato correcto antes de enviarlos al backend.

🧩 Estructura del proyecto (básica)
-------------Debatir cual usar---------------------

🧠 Conceptos clave que usamos
Concepto	Descripción breve
useState	Hook de React para manejar variables reactivas (que cambian en pantalla)
useEffect	Hook que ejecuta código al montar o actualizar un componente
useQuery	Hook (de React Query) para manejar peticiones a la API de forma automática
axios	Hace las llamadas HTTP al backend
Tailwind	Estilos rápidos con clases en el HTML (sin escribir CSS puro)
