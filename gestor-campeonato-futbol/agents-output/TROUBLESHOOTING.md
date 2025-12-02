# Troubleshooting Guide

## Common Issues and Solutions

### ❌ "Server Error - There is a problem with the server configuration"

**Causa**: El cliente Prisma se estaba cargando durante la inicialización del módulo, lo que causa problemas en Next.js cuando el código se empaqueta para el cliente.

**Solución**: Implementamos lazy loading del cliente Prisma usando un Proxy pattern. El cliente ahora solo se crea cuando realmente se accede, y solo en el servidor.

**Archivo modificado**: `src/lib/prisma.ts`

```typescript
// ❌ INCORRECTO - Carga eager (inmediata)
import { neonConfig } from '@neondatabase/serverless';
const prisma = new PrismaClient({ adapter });

// ✅ CORRECTO - Carga lazy (bajo demanda)
function getPrismaClientSingleton() {
  const { neonConfig } = require('@neondatabase/serverless');
  // ... crear cliente solo cuando se necesita
}

export const prisma = new Proxy({}, {
  get(target, prop) {
    return getPrismaClientSingleton()[prop];
  }
});
```

**Verificación**:
```bash
# Tests pasan
npm test

# Build exitoso
npm run build

# Servidor funciona
npm run dev
```

---

### ❌ "TextDecoder is not defined" (en tests)

**Causa**: El adapter de Neon requiere `TextDecoder` y `TextEncoder` que no están disponibles por defecto en el entorno de Jest.

**Solución**: Agregar polyfills en `jest.setup.js`:

```javascript
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
```

---

### ❌ "Could not find a declaration file for module 'ws'"

**Causa**: TypeScript no puede encontrar los tipos para el paquete `ws`.

**Solución**: Instalar los tipos:

```bash
npm install --save-dev @types/ws
```

---

### ❌ Build de Vercel falla con "scripts/create-admin.ts" error

**Causa**: Next.js intenta compilar archivos en la carpeta `scripts` que no deben ser parte del build.

**Solución**: Excluir la carpeta scripts en `tsconfig.json`:

```json
{
  "exclude": ["node_modules", "scripts/**/*"]
}
```

---

### ❌ "datasourceUrl does not exist in type PrismaClientOptions"

**Causa**: En Prisma 7, no existe la opción `datasourceUrl`. Debes usar adapters.

**Solución**: Usar el adapter de Neon:

```typescript
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });
```

---

### ⚠️ Warning: "middleware file convention is deprecated"

**Causa**: Next.js 16 deprecó el archivo `middleware.ts` en favor de `proxy`.

**Solución**: Este es solo un warning, el middleware sigue funcionando. Para eliminarlo en el futuro, migra a la nueva convención de proxy cuando esté disponible.

---

## Verificación de Configuración

### 1. Variables de Entorno

Verifica que exista `.env.local` con:

```env
DATABASE_URL="postgresql://user:pass@host.neon.tech/dbname?sslmode=require"
AUTH_SECRET="tu_secret_aqui"
```

### 2. Dependencias Correctas

```bash
npm list @prisma/adapter-neon @neondatabase/serverless ws @types/ws
```

Deberías ver:
```
├── @prisma/adapter-neon@7.0.1
├── @neondatabase/serverless@1.0.2
├── ws@8.18.3
└── @types/ws@8.18.1
```

### 3. Prisma Client Generado

```bash
npx prisma generate
```

Debería generar en: `./src/generated/prisma/client`

### 4. Tests Funcionando

```bash
npm test
```

Todos los tests deben pasar (106 tests esperados).

### 5. Build Exitoso

```bash
npm run build
# o
npm run vercel-build
```

Debe completar sin errores.

---

## Comandos Útiles

```bash
# Limpiar y regenerar todo
rm -rf node_modules .next
npm install
npx prisma generate
npm run build

# Ver logs del servidor en desarrollo
npm run dev

# Ejecutar tests específicos
npm test -- --testPathPatterns="categorias"

# Build para Vercel
npm run vercel-build
```

---

## Soporte

Si encuentras otros problemas:

1. Revisa los logs de la consola del navegador (F12)
2. Revisa los logs del servidor en la terminal
3. Verifica que todas las variables de entorno estén configuradas
4. Asegúrate de que Prisma Client esté generado
5. Verifica que el DATABASE_URL sea válido

**Documentación relacionada**:
- `PRISMA7_MIGRATION.md` - Detalles de la migración
- `VERCEL_BUILD_SUMMARY.md` - Guía de deployment
- `AUTH_README.md` - Configuración de autenticación

