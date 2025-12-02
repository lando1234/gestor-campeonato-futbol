# Sistema de Autenticación

## ⚠️ Configuración Inicial Requerida

**IMPORTANTE**: Antes de usar el sistema de autenticación, debes agregar `AUTH_SECRET` a tu archivo `.env`.

Ver instrucciones detalladas en: [SETUP_AUTH.md](./SETUP_AUTH.md)

## Configuración

El sistema de autenticación utiliza NextAuth.js con credenciales (usuario y contraseña).

### Variables de Entorno Requeridas

Asegúrate de tener estas variables en tu archivo `.env`:

```bash
AUTH_SECRET="tu-secret-generado"
NEXTAUTH_URL="http://localhost:3000"
DATABASE_URL="tu-url-de-base-de-datos"
```

Para generar un `AUTH_SECRET` seguro, ejecuta:
```bash
npm run generate-secret
```

### Cambios realizados

1. **Schema de base de datos**: Se cambió el campo `email` por `username` en la tabla `usuario`
2. **Autenticación**: Ahora se usa usuario/contraseña en lugar de email/contraseña
3. **Usuario administrador**: Se creó un script para generar el usuario administrador
4. **Secret de NextAuth**: Se agregó configuración para `AUTH_SECRET`

## Usuario Administrador

### Credenciales por defecto

- **Usuario**: `admin`
- **Contraseña**: `galaxia`

### Crear usuario administrador

Si necesitas crear el usuario administrador nuevamente, ejecuta:

```bash
npm run create-admin
```

Este script:
- Verifica si el usuario 'admin' ya existe
- Si no existe, crea el usuario con las credenciales por defecto
- Hashea la contraseña usando bcrypt

## Acceso al panel de administración

1. Navega a `/login`
2. Ingresa las credenciales:
   - Usuario: `admin`
   - Contraseña: `galaxia`
3. Serás redirigido a `/admin`

## Estructura de archivos

- `src/lib/auth.ts`: Configuración de NextAuth.js
- `src/app/login/page.tsx`: Página de inicio de sesión
- `src/app/api/auth/[...nextauth]/route.ts`: API route de NextAuth
- `src/components/SessionProvider.tsx`: Provider de sesión para componentes cliente
- `scripts/create-admin.ts`: Script para crear usuario administrador
- `prisma/schema.prisma`: Schema de base de datos con modelo `usuario`

## Migraciones

La migración para cambiar `email` a `username` se encuentra en:
```
prisma/migrations/20251130233352_change_email_to_username/migration.sql
```

## Seguridad

- Las contraseñas se almacenan hasheadas con bcrypt (10 rounds)
- Las sesiones utilizan JWT
- Solo usuarios activos (`activo: true`) pueden iniciar sesión
- La página de login redirige automáticamente a `/admin` después del login exitoso
