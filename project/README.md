# Gestor Campeonato Fútbol

Sistema de gestión de campeonatos de fútbol construido con Next.js, TypeScript, Tailwind CSS y Prisma.

## Tecnologías

- **Next.js 14** - Framework de React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework CSS utility-first
- **Prisma ORM** - ORM para base de datos
- **SQLite** - Base de datos (puede cambiarse a PostgreSQL, MySQL, etc.)

## Estructura del Proyecto

```
gestor-campeonato-futbol/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── components/            # Componentes React
│   └── ui/               # Componentes de UI reutilizables
├── hooks/                # Custom React Hooks
├── lib/                  # Utilidades y configuraciones
│   ├── prisma.ts        # Cliente de Prisma
│   └── utils.ts         # Funciones de utilidad
├── prisma/              # Configuración de Prisma
│   └── schema.prisma    # Schema de la base de datos
├── public/              # Archivos estáticos
├── types/               # Definiciones de tipos TypeScript
└── ...archivos de configuración

```

## Configuración Inicial

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
DATABASE_URL="file:./dev.db"
```

### 3. Inicializar la base de datos

```bash
npx prisma generate
npx prisma db push
```

Este comando creará la base de datos SQLite y las tablas necesarias según el schema definido.

### 4. Ejecutar el proyecto en modo desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## Prisma

### Comandos útiles

- `npx prisma studio` - Abre el editor visual de base de datos
- `npx prisma generate` - Genera el cliente de Prisma
- `npx prisma db push` - Sincroniza el schema con la base de datos
- `npx prisma migrate dev` - Crea una nueva migración

### Schema Base

El proyecto incluye un schema base con tres modelos:

- **Team**: Equipos del campeonato
- **Player**: Jugadores de cada equipo
- **Match**: Partidos entre equipos

Puedes modificar el schema en `prisma/schema.prisma` según tus necesidades.

## Cambiar Base de Datos

Para usar PostgreSQL, MySQL u otra base de datos en lugar de SQLite:

1. Modifica el `datasource` en `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql" // o "mysql"
  url      = env("DATABASE_URL")
}
```

2. Actualiza la variable `DATABASE_URL` en `.env` con la URL de conexión apropiada.

## Próximos Pasos

- Implementar las rutas API para CRUD de equipos, jugadores y partidos
- Crear componentes de UI para formularios y listados
- Añadir autenticación (NextAuth.js)
- Implementar lógica de tabla de posiciones
- Añadir validaciones con Zod
- Implementar paginación y filtros

## Contribuir

Este es un proyecto base que puede ser extendido según las necesidades específicas del campeonato.
