# Hinspire
A Collaborative story generator

# Plataforma de Creación Colaborativa de Historias (Frontend)

Este proyecto es el frontend de una plataforma web que permite a los usuarios crear, colaborar y votar en historias de manera colaborativa. El frontend está construido con **React** (o el framework que estés utilizando) y se conecta a un backend basado en Node.js y MongoDB para gestionar usuarios, historias, fragmentos y votos.

## **Funcionalidades Principales**

### **Autenticación**
- **Registro**: Los usuarios pueden registrarse proporcionando un nombre de usuario, correo electrónico y contraseña.
- **Inicio de sesión**: Los usuarios pueden iniciar sesión con su correo electrónico y contraseña.
- **Verificación de token**: Se verifica la autenticación del usuario mediante tokens JWT.

### **Perfil de Usuario**
- **Ver perfil**: Los usuarios pueden ver su información de perfil.
- **Editar perfil**: Los usuarios pueden actualizar su nombre de usuario, correo electrónico y contraseña.
- **Eliminar perfil**: Los usuarios pueden eliminar su cuenta y todos los datos asociados.

### **Historias**
- **Ver todas las historias**: Los usuarios pueden ver una lista de todas las historias disponibles.
- **Ver una historia específica**: Los usuarios pueden ver los detalles de una historia, incluyendo sus fragmentos.
- **Crear una historia**: Los usuarios pueden crear una nueva historia con un título y descripción.
- **Editar una historia**: Los autores pueden editar el título y la descripción de sus historias.
- **Eliminar una historia**: Los autores pueden eliminar sus historias.
- **Finalizar una historia**: Los autores pueden marcar una historia como completada.

### **Fragmentos**
- **Ver fragmentos de una historia**: Los usuarios pueden ver todos los fragmentos asociados a una historia.
- **Agregar un fragmento**: Los usuarios pueden agregar fragmentos a una historia en progreso.
- **Editar un fragmento**: Los autores pueden editar sus fragmentos.
- **Eliminar un fragmento**: Los autores pueden eliminar sus fragmentos.
- **Aceptar un fragmento**: Los autores de historias pueden aceptar fragmentos pendientes para incluirlos en la historia.

### **Votación**
- **Ver votos del usuario**: Los usuarios pueden ver los fragmentos por los que han votado.
- **Votar por un fragmento**: Los usuarios pueden votar por fragmentos que les gusten.
- **Eliminar un voto**: Los usuarios pueden eliminar su voto de un fragmento.

## **Estructura del Proyecto**

### **Servicios (API Calls)**
- **Auth Service**: Maneja las solicitudes de autenticación (registro, inicio de sesión, verificación).
- **Profile Service**: Maneja las solicitudes relacionadas con el perfil del usuario.
- **Story Service**: Maneja las solicitudes relacionadas con las historias.
- **Fragment Service**: Maneja las solicitudes relacionadas con los fragmentos.
- **Vote Service**: Maneja las solicitudes relacionadas con la votación.

### **Componentes Principales**
- **Auth**: Componentes para el registro, inicio de sesión y verificación.
- **Profile**: Componentes para ver, editar y eliminar perfiles.
- **Story**: Componentes para listar, crear, editar, eliminar y finalizar historias.
- **Fragment**: Componentes para listar, agregar, editar, eliminar y aceptar fragmentos.
- **Vote**: Componentes para votar y ver votos.

### **Configuración de la API**
- **`api.js`**: Configuración de Axios para realizar solicitudes HTTP al backend.
- **Variables de entorno**: Se utiliza `import.meta.env` para configurar la URL del servidor.

## **Instalación**

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio/frontend
  ```
Instala las dependencias:

bash
Copy
npm install
Configura las variables de entorno:

Crea un archivo .env en la raíz del proyecto frontend.

Agrega la siguiente variable:

env
Copy
VITE_SERVER_URL=https://hinspire-back.onrender.com
Inicia el servidor de desarrollo:

bash
Copy
npm run dev
````
### Uso
#### Autenticación
Registro: Navega a /signup y completa el formulario de registro.

Inicio de sesión: Navega a /login y completa el formulario de inicio de sesión.

#### Historias
Ver historias: Navega a /stories para ver todas las historias.

Crear una historia: Navega a /stories/create y completa el formulario.

Editar una historia: Navega a /stories/edit/:id y realiza los cambios necesarios.

#### Fragmentos
Agregar un fragmento: Navega a /stories/:id/fragments/add y completa el formulario.

Editar un fragmento: Navega a /fragments/edit/:id y realiza los cambios necesarios.

#### Votación
Votar por un fragmento: Haz clic en el botón de votar en la página de detalles de un fragmento.

#### Tecnologías Utilizadas
Frontend: React (o el framework que estés utilizando).

Gestión de estado: (Opcional, si usas Redux, Context API, etc.).

HTTP Client: Axios para realizar solicitudes HTTP.

Enrutamiento: React Router (o el enrutador que estés utilizando).

#### Contribución
¡Las contribuciones son bienvenidas! Si deseas mejorar el proyecto, sigue estos pasos:

Haz un fork del repositorio.

Crea una rama para tu feature (git checkout -b feature/nueva-funcionalidad).

Haz commit de tus cambios (git commit -m 'Añade nueva funcionalidad').

Haz push a la rama (git push origin feature/nueva-funcionalidad).

Abre un Pull Request.

Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

¡Gracias por usar esta plataforma! 🚀


---

### **Explicación del README.md**

1. **Funcionalidades Principales**: Describe las características clave del frontend, como la autenticación, gestión de perfiles, historias, fragmentos y votación.
2. **Estructura del Proyecto**: Explica cómo están organizados los servicios (llamadas a la API) y los componentes principales.
3. **Instalación**: Proporciona pasos claros para configurar y ejecutar el proyecto.
4. **Uso**: Explica cómo interactuar con las diferentes partes de la aplicación.
5. **Tecnologías**: Enumera las tecnologías utilizadas en el frontend.
6. **Contribución**: Instrucciones para contribuir al proyecto.

Este README.md es ideal para la parte del frontend y complementa el README.md del backend que te proporcioné anteriormente. ¡Espero que te sea útil! 😊
