# Tareas NestJS – Proyecto de Práctica

Autor: Erick The Coder

## Descripción

API de gestión de tareas construida con NestJS, Redis y monitoreo APM (Elastic). Incluye endpoints REST, documentación Swagger y configuración lista para desarrollo con Docker.

---

## Requisitos

- Node.js 18+
- Docker y Docker Compose
- pnpm (o npm/yarn)

---

## Instalación

```sh
pnpm install
```

---

## Variables de entorno

Copia el archivo `.env.example` a `.env` y ajusta los valores si es necesario.  
**No subas tu archivo `.env` al repositorio.**

---

## Uso con Docker

Para levantar todos los servicios (NestJS, Redis, Elasticsearch, Kibana, APM):

```sh
docker-compose up -d
```

Esto iniciará:

- Redis (puerto 6379)
- Elasticsearch (puerto 9200)
- Kibana (puerto 5601)
- APM Server (puerto 8200)
- Tu app (puerto 3000)

---

## Correr la app localmente

Si solo quieres correr la app NestJS (sin Docker):

```sh
pnpm start:dev
```

Asegúrate de tener Redis y APM corriendo (puedes usar Docker solo para esos servicios).

---

## Documentación Swagger

Cuando la app esté corriendo, accede a la documentación interactiva en:  
[http://localhost:3000/api](http://localhost:3000/api)

---

## Endpoints principales

- `GET /tasks` – Lista todas las tareas
- `POST /tasks` – Crea una nueva tarea
- `GET /tasks/:id` – Obtiene una tarea por ID
- `PATCH /tasks/:id` – Actualiza una tarea
- `DELETE /tasks/:id` – Elimina una tarea
- `POST /tasks/clear` – Elimina todas las tareas

Consulta todos los detalles y pruebas en Swagger.

---

## Monitoreo APM

- El agente APM se configura automáticamente usando las variables de entorno.
- Puedes ver el monitoreo en Kibana:  
  [http://localhost:5601](http://localhost:5601)

---

## Notas de seguridad

- No subas tu archivo `.env` real al repositorio.
- Toda la configuración sensible está centralizada en `.env`.

---
