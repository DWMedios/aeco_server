<p align="center">
  <img src="https://via.placeholder.com/200x200?text=AECO" width="200" alt="AECO Logo" />
</p>

<h1 align="center">AECO Backend Server</h1>

<p align="center">
  Un sistema de gestión integral para dispositivos AECO, implementado con NestJS y TypeORM.
</p>

<p align="center">
  <a href="#descripción">Descripción</a> •
  <a href="#características">Características</a> •
  <a href="#arquitectura">Arquitectura</a> •
  <a href="#requisitos">Requisitos</a> •
  <a href="#instalación">Instalación</a> •
  <a href="#configuración">Configuración</a> •
  <a href="#uso">Uso</a> •
  <a href="#api">API</a> •
  <a href="#desarrollo">Desarrollo</a> •
  <a href="#equipo">Equipo</a>
</p>

## Descripción

AECO Backend Server es una plataforma robusta diseñada para gestionar dispositivos AECO conectados, facilitando la integración entre empresas, usuarios y productos. El sistema está construido con una arquitectura modular siguiendo los principios de Domain-Driven Design (DDD) y utilizando las mejores prácticas de desarrollo en NestJS.

## Características

- **Gestión de Dispositivos AECO**: Administración completa del ciclo de vida de dispositivos, desde su configuración inicial hasta su mantenimiento.
- **Sistema de Empresas**: Registro y gestión de empresas asociadas a los dispositivos AECO.
- **Gestión de Usuarios**: Sistema de autenticación y autorización con roles y permisos.
- **Campañas Publicitarias**: Creación y gestión de campañas y contenido publicitario.
- **Estadísticas y Métricas**: Seguimiento detallado de datos de productos, embalaje y estadísticas diarias.
- **Recompensas**: Sistema de recompensas para usuarios de dispositivos AECO.
- **Gestión de Tickets**: Sistema para rastrear y gestionar tickets generados por los dispositivos.
- **Integración con IoT**: Endpoints específicos para comunicación con dispositivos AECO conectados.
- **Almacenamiento S3**: Gestión de archivos multimedia en AWS S3.

## Arquitectura

El proyecto sigue una arquitectura limpia basada en NestJS y está organizado en los siguientes módulos principales:

- `aecos`: Gestión de dispositivos AECO
- `advertisings`: Gestión de publicidad y campañas
- `auth`: Autenticación y autorización
- `company`: Gestión de empresas
- `dashboard`: Paneles de información y métricas
- `media-assets`: Gestión de recursos multimedia
- `pages`: Gestión de páginas de contenido
- `products`: Gestión de productos y capacidades
- `rewards`: Sistema de recompensas
- `shared`: Componentes compartidos y utilidades
- `tickets`: Gestión de tickets
- `users`: Gestión de usuarios

Cada módulo sigue una estructura interna que separa:
- `app`: Servicios de aplicación
- `domain`: Entidades, DTOs, enums y contratos de servicios
- `infra`: Controladores y adaptadores de infraestructura

## Requisitos

- Node.js (>= 16.x)
- PostgreSQL (>= 13.x)
- AWS S3 (para almacenamiento de archivos)
- NPM

## Instalación

```bash
# Clonar el repositorio
git clone <repositorio>

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# Ejecutar migraciones
npm run migrations:run

# Poblar datos iniciales (opcional)
npm run seeders:run
```

## Configuración

El proyecto utiliza variables de entorno para su configuración. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
# Base de datos
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=aeco

# JWT
JWT_SECRET=tu_clave_secreta
JWT_EXPIRATION=24h

# AWS S3
S3_REGION=tu_region
S3_ACCESS_KEY=tu_access_key
S3_SECRET_KEY=tu_secret_key
S3_BUCKET=nombre_del_bucket
```

## Uso

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

## API

La API REST está organizada por módulos:

- `/aecos`: Endpoints para gestión de dispositivos AECO
- `/auth`: Autenticación y autorización
- `/companies`: Gestión de empresas
- `/users`: Gestión de usuarios
- `/products`: Gestión de productos
- `/rewards`: Gestión de recompensas
- `/advertisings`: Gestión de publicidad
- `/media-assets`: Gestión de archivos multimedia
- `/tickets`: Gestión de tickets

## Desarrollo

### Migraciones

```bash
# Crear una nueva migración
npm run migrations:generate --name=NombreMigracion

# Ejecutar migraciones
npm run migrations:run

# Revertir última migración
npm run migrations:revert
```

### Seeders

```bash
# Crear un nuevo seeder
npm run seeders:create --name=NombreSeeder

# Ejecutar seeders
npm run seeders:run

# Revertir último seeder
npm run seeders:revert
```

### Tests

```bash
# Tests unitarios
npm run test

# Tests e2e
npm run test:e2e

# Cobertura de pruebas
npm run test:cov
```

## Equipo

Desarrollado por el equipo de AECO.

---

© 2025 AECO. Todos los derechos reservados.
