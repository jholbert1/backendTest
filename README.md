# Backend Test

Este es el repositorio backend.

## Pasos a seguir para la instalación:

### 1. Clonar el repositorio

### 2. Instalar las dependencias npm install

### 3. Utilizar Docker para la instancia de la BD docker-compose up -d

### 3.1 Se puede instalar normalmente la BD pero se debe sustituir en el archivo .env la conexion la BD DATABASE_URL="postgresql://<<USSER_NAME>>:<<PASSWORD_>>@localhost:<<PORT_>>/<<BD_NAME>>?schema=public"

### 4. Correr Migraciones npx prisma migrate dev

### 4. Correr Seed npm run seed:run

### 5. Correr el servidor npm run start

## Tecnologías utilizadas:

- **Base de datos:** Postgres (Versión 16)
- **Entorno:** NODE (v18.16.0) y NPM (9.5.1)
- **Framework:** Nest.js
- **ORM:** Prisma

---

Por favor, asegúrate de tener las versiones correctas de NODE y NPM instaladas antes de proceder.

- **NOTA IMPORTANTE:** El backend debe correr en el puerto 3000 "http://localhost:3000"
