# Gestor Campeonato Fútbol ⚽

Sistema de gestión para campeonatos de fútbol construido con Next.js 16, Prisma 7 y NextAuth.

## 🚀 Stack Tecnológico

- **Framework**: Next.js 16.0.5 (App Router)
- **Database**: PostgreSQL con Prisma 7.0.1
- **Authentication**: NextAuth v5
- **Styling**: Tailwind CSS 4
- **Testing**: Jest + React Testing Library
- **Deployment**: Vercel + Neon Database

## 📋 Pre-requisitos

- Node.js 20+
- PostgreSQL (recomendado: Neon serverless)
- npm o yarn

## 🛠️ Instalación

1. **Clonar el repositorio**

```bash
git clone <tu-repositorio>
cd gestor-campeonato-futbol
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env.local` en la raíz con:

```env
DATABASE_URL="postgresql://user:password@host.neon.tech/dbname?sslmode=require"
AUTH_SECRET="tu_secret_aqui"
```

4. **Generar Prisma Client**

```bash
npx prisma generate
```

5. **Ejecutar migraciones**

```bash
npx prisma migrate dev
```

## 🏃‍♂️ Comandos Disponibles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Build para Vercel
npm run vercel-build

# Ejecutar en producción
npm start

# Tests
npm test

# Tests en modo watch
npm run test:watch

# Cobertura de tests
npm run test:coverage

# Linter
npm run lint

# Crear usuario admin
npm run create-admin

# Generar secret de autenticación
npm run generate-secret
```

## 📚 Documentación

Toda la documentación técnica generada por agentes se encuentra en la carpeta [`agents-output/`](./agents-output/):

- **[PRISMA7_MIGRATION.md](./agents-output/PRISMA7_MIGRATION.md)** - Guía de migración a Prisma 7
- **[TROUBLESHOOTING.md](./agents-output/TROUBLESHOOTING.md)** - Solución de problemas comunes
- **[VERCEL_BUILD_SUMMARY.md](./agents-output/VERCEL_BUILD_SUMMARY.md)** - Guía de deployment en Vercel
- **[AUTH_README.md](./agents-output/AUTH_README.md)** - Configuración de autenticación
- **[SETUP_AUTH.md](./agents-output/SETUP_AUTH.md)** - Setup inicial de autenticación
- **[TESTING.md](./agents-output/TESTING.md)** - Guía de testing

## 🏗️ Estructura del Proyecto

```
gestor-campeonato-futbol/
├── src/
│   ├── app/              # Rutas y páginas (App Router)
│   │   ├── admin/        # Panel de administración
│   │   ├── api/          # API Routes
│   │   └── login/        # Página de login
│   ├── components/       # Componentes React
│   ├── lib/             # Utilidades y configuración
│   │   ├── prisma.ts    # Cliente Prisma configurado
│   │   ├── auth.ts      # Configuración NextAuth
│   │   └── services/    # Servicios de negocio
│   └── types/           # Definiciones TypeScript
├── prisma/
│   ├── schema.prisma    # Esquema de base de datos
│   └── migrations/      # Migraciones
├── agents-output/       # Documentación generada
└── scripts/             # Scripts útiles

```

## 🔐 Autenticación

El sistema usa NextAuth v5 con Credentials Provider. Usuario por defecto:

- **Usuario**: admin
- **Contraseña**: galaxia

Para crear nuevos usuarios admin, ejecuta:

```bash
npm run create-admin
```

## 🧪 Testing

El proyecto tiene cobertura de tests para:

- ✅ Servicios de negocio
- ✅ API Routes
- ✅ Componentes React
- ✅ Autenticación

```bash
# Ejecutar todos los tests
npm test

# Ver cobertura
npm run test:coverage
```

## 🚀 Deploy en Vercel

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno:
   - `DATABASE_URL`
   - `AUTH_SECRET`
3. Vercel usará automáticamente el comando `vercel-build`
4. ¡Deploy exitoso! 🎉

Ver [VERCEL_BUILD_SUMMARY.md](./agents-output/VERCEL_BUILD_SUMMARY.md) para más detalles.

## 📖 Recursos

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth Documentation](https://next-auth.js.org)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Contribuir

Este proyecto sigue las reglas definidas en `.cursor/rules.mdc`. Por favor, léelas antes de contribuir.

---

**Desarrollado con ❤️ usando Next.js y Prisma**
