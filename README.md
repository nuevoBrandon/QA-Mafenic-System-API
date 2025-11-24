
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# QA Mafenic System

Proyecto backend construido con NestJS para gestionar tikect QA.

## Requisitos previos

- Node.js >= 18
- Docker y Docker Compose

## Instalación

1. Instala las dependencias:
   ```bash
   yarn install
   # o
   npm install
   ```

2. Levanta la base de datos (PostgreSQL) con Docker Compose:
   ```bash
   docker compose up -d
   ```

3. Configura las variables de entorno en un archivo `.env` si es necesario.

## Comandos útiles

- Iniciar el servidor en modo desarrollo:
  ```bash
  yarn start:dev
  # o
  npm run start:dev
  ```

- Ejecutar pruebas:
  ```bash
  yarn test
  # o
  npm test
  ```

- Formatear el código:
  ```bash
  yarn format
  # o
  npm run format
  ```


---

## Endpoints principales

### Auth (`/auth`)

| Método | Endpoint          | Descripción                       | Body              |
|--------|-------------------|-----------------------------------|-------------------|
| POST   | /auth/signIn      | Iniciar sesión                    | LoginDto          |
| POST   | /auth/create      | Crear usuario                     | CreateAuthDto     |
| GET    | /auth/users       | Listar todos los usuarios         | -                 |
| GET    | /auth/:id/user    | Obtener un usuario por ID         | -                 |
| PATCH  | /auth/:id         | Actualizar usuario                | UpdateAuthDto     |
| DELETE | /auth/:id         | Eliminar usuario                  | -                 |

### Tickets (`/ticket`)

| Método | Endpoint         | Descripción                   | Body               |
|--------|------------------|-------------------------------|--------------------|
| POST   | /ticket/create   | Crear ticket                  | CreateTicketDto    |
| GET    | /ticket          | Listar todos los tickets      | -                  |
| GET    | /ticket/:id      | Obtener ticket por ID         | -                  |
| PATCH  | /ticket/:id      | Actualizar ticket             | UpdateTicketDto    |
| DELETE | /ticket/:id      | Eliminar ticket               | -                  |
