# Configuración de Variables de Entorno

Este archivo contiene instrucciones para configurar las variables de entorno del proyecto.

## Crear archivo .env

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
# Database
DATABASE_URL="file:./dev.db"

# Next Auth (opcional, para autenticación futura)
# NEXTAUTH_URL="http://localhost:3000"
# NEXTAUTH_SECRET="your-secret-here"
```

## Variables de Entorno Disponibles

### DATABASE_URL
- **Descripción**: URL de conexión a la base de datos
- **Por defecto**: `file:./dev.db` (SQLite local)
- **Ejemplo PostgreSQL**: `postgresql://user:password@localhost:5432/dbname`
- **Ejemplo MySQL**: `mysql://user:password@localhost:3306/dbname`

### NEXTAUTH_URL (Opcional)
- **Descripción**: URL base de la aplicación para NextAuth
- **Por defecto**: `http://localhost:3000`
- **Producción**: URL de tu aplicación en producción

### NEXTAUTH_SECRET (Opcional)
- **Descripción**: Secret key para NextAuth
- **Generación**: `openssl rand -base64 32`

## Cambiar a PostgreSQL

1. Actualiza `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. Actualiza `DATABASE_URL` en `.env`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/gestor_campeonato"
```

3. Ejecuta las migraciones:

```bash
npx prisma migrate dev --name init
```

## Notas Importantes

- El archivo `.env` está en `.gitignore` y NO debe ser compartido
- Mantén el archivo `ENV_SETUP.md` actualizado con nuevas variables
- Para producción, configura las variables en tu servicio de hosting

