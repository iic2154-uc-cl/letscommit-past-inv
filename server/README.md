# Commit API Server - Guía de Usuario

Este es el servidor backend para [Your System Name], responsable de manejar solicitudes API, gestionar datos y servir respuestas a la aplicación frontend.

## Requisitos

Antes de instalar y ejecutar el servidor API, asegúrate de tener instalados los siguientes requisitos:

- Node.js (version 12 o superior)
- npm (version 6 o superior)
- PostgreSQL (o cualquier otra base de datos que estés utilizando)

## Instalación

### Clonar el Repositorio

Clona el repositorio del proyecto:

```bash
git clone https://iic2154-uc-cl/letscommit-past-inv.git
```

## Instalar Dependencias

Navega al directorio del servidor y ejecuta el siguiente comando para instalar las dependencias:

```bash
cd yourproject/server
npm install

```

## Configuración del Entorno

Crea un archivo .env en el directorio raíz del servidor y configura las variables de entorno necesarias. Un ejemplo de archivo .env podría verse así:

```env
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
PORT=your_port
```

## Ejecución del Servidor

Para ejecutar el servidor en modo desarrollo, utiliza el siguiente comando:

```bash
npm start
```

Para preparar y ejecutar el servidor en producción, sigue estos pasos:
1. Asegúrate de tener todas las variables de entorno configuradas en el archivo .env.
2. Inicia el servidor utilizando un administrador de procesos como pm2.
