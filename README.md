# Backend - Sistema de Gestión de Gastos (Arquitectura Microkernel)

## Descripción del Proyecto

Este proyecto corresponde al backend del sistema **Gestión de Gastos**, desarrollado utilizando **Node.js**, **Express** y **PostgreSQL**, implementando una arquitectura de software basada en **Microkernel (Micro-Núcleo)**.

El sistema permite:

* Gestión de usuarios
* Autenticación JWT
* Roles de administrador y usuario
* Registro de gastos
* Gestión de categorías
* Presupuestos financieros
* Alertas automáticas
* Plugins dinámicos
* Exportación de reportes PDF
* Estadísticas financieras

---

# Arquitectura Implementada

El proyecto utiliza una arquitectura **Microkernel**, donde existe un núcleo principal encargado de coordinar módulos y plugins dinámicos.

## Núcleo Principal

Ubicado en:

```bash
src/core/
```

Contiene:

* `app.js`
* `pluginManager.js`
* `auth.middleware.js`
* `role.middleware.js`

El núcleo se encarga de:

* Inicializar Express
* Registrar rutas
* Gestionar plugins
* Controlar autenticación
* Validar roles

---

## Plugins Implementados

Ubicados en:

```bash
src/plugins/
```

Plugins disponibles:

* `totales.plugin.js`
* `graficos.plugin.js`
* `presupuesto.plugin.js`
* `alertas.plugin.js`
* `pdf.plugin.js`
* `reportes.plugin.js`

Estos plugins permiten extender funcionalidades sin modificar el núcleo principal.

---

# Estructura del Proyecto

```bash
src/
│
├── core/
│   ├── app.js
│   ├── pluginManager.js
│   ├── auth.middleware.js
│   └── role.middleware.js
│
├── database/
│   └── connection.js
│
├── modules/
│   ├── admin/
│   ├── categorias/
│   ├── gastos/
│   ├── presupuestos/
│   └── usuarios/
│
├── plugins/
│   ├── alertas.plugin.js
│   ├── graficos.plugin.js
│   ├── pdf.plugin.js
│   ├── presupuesto.plugin.js
│   ├── reportes.plugin.js
│   └── totales.plugin.js
│
└── routes/
    └── index.js
```

---

# Tecnologías Utilizadas

## Backend

* Node.js
* Express
* PostgreSQL
* JWT
* bcryptjs
* PDFKit
* dotenv
* cors

---

# Instalación del Proyecto

## Clonar el repositorio

```bash
git clone LINK_DEL_REPOSITORIO
```

---

## Ingresar al proyecto

```bash
cd gastos-microkernel
```

---

## 3️Instalar dependencias

```bash
npm install
```

---

# Configuración de PostgreSQL

## Crear la base de datos

Abrir PostgreSQL y ejecutar para la creacion de base de datos y tablas:

```sql
CREATE DATABASE gastos_microkernel;
```

```sql
-- Tabla usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100)
);

-- Tabla categorias
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100)
);

-- Tabla gastos
CREATE TABLE gastos (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id),
    categoria_id INT REFERENCES categorias(id),
    monto NUMERIC,
    descripcion TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla presupuestos
CREATE TABLE presupuestos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    limite_mensual NUMERIC(10,2) NOT NULL,
    mes INTEGER NOT NULL,
    anio INTEGER NOT NULL,
    UNIQUE(usuario_id, mes, anio)
);
```

---

## Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=TU_PASSWORD
DB_NAME=gastos_microkernel

JWT_SECRET=miclavejwt
```

---

# Ejecutar el Proyecto

## Crear admin

```bash
node crearAdmin.js
```

## Modo desarrollo

```bash
npm run dev
```

El servidor iniciará en:

```bash
http://localhost:3000
```

---

# Sistema de Autenticación

El backend utiliza JWT para autenticación.

## Funcionalidades

* Registro
* Login
* Tokens JWT
* Protección de rutas
* Roles

---

# Roles Implementados

## Administrador

Puede:

* Crear categorías
* Editar categorías
* Eliminar categorías
* Crear administradores
* Ver todos los gastos
* Gestionar presupuestos

---

## Usuario

Puede:

* Registrar gastos
* Editar gastos propios
* Eliminar gastos propios
* Ver únicamente su información

---

# Sistema de Plugins

La arquitectura Microkernel permite ejecutar plugins dinámicamente mediante:

```js
register(plugin)
executeAll(data)
```

Los plugins procesan información financiera sin alterar el núcleo principal.

---

# Funcionalidades Implementadas

## Usuarios

* Registro
* Login
* Roles

## Gastos

* CRUD completo
* Filtros por fecha
* Asociación por usuario

## Categorías

* CRUD administrativo

## Presupuestos

* Límite mensual

## Alertas

* Detección automática de exceso de presupuesto

## Reportes

* Exportación PDF

## Estadísticas

* Totales
* Gráficos dinámicos

---

# Middlewares Implementados

## auth.middleware.js

Valida:

* Tokens JWT
* Sesiones autenticadas
* Acceso protegido

---

## role.middleware.js

Controla:

* Permisos administrativos
* Restricción por roles

---

# Exportación PDF

El sistema permite generar reportes financieros descargables con:

* Información del usuario
* Historial de gastos
* Totales
* Estadísticas

---

#  API REST

## Endpoints principales

### Usuarios

```bash
POST /api/usuarios/register
POST /api/usuarios/login
```

---

### Gastos

```bash
GET /api/gastos
POST /api/gastos
PUT /api/gastos/:id
DELETE /api/gastos/:id
```

---

### Categorías

```bash
GET /api/categorias
POST /api/categorias
PUT /api/categorias/:id
DELETE /api/categorias/:id
```

---

### Presupuestos

```bash
GET /api/presupuestos
POST /api/presupuestos
```

---

# Aplicación de la Arquitectura Microkernel

La arquitectura Microkernel se aplica mediante:

* Núcleo central (`core/`)
* Plugins desacoplados (`plugins/`)
* Extensión dinámica de funcionalidades
* Separación modular del sistema

El núcleo administra la ejecución de plugins sin modificar la lógica principal.

Esto permite:

* Escalabilidad
* Mantenibilidad
* Reutilización
* Extensión sencilla

---

# Autor

Grupo 5 - Gualpa Mathias y Camila Obando 
---
