# Prisma 7 Migration

## Changes Made

This document describes the changes made to migrate from Prisma 6 to Prisma 7 configuration with Neon serverless driver.

### Summary

Prisma 7 requires using database adapters instead of passing URLs directly in the schema. For Neon serverless databases, we use the `@prisma/adapter-neon` package which provides optimal performance with WebSocket connections and message pipelining.

### New Dependencies Installed

```bash
npm install @prisma/adapter-neon ws @types/ws
```

### Files Modified

#### 1. `prisma/schema.prisma`
- **Change**: Removed the `url` property from the `datasource` block
- **Before**:
  ```prisma
  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }
  ```
- **After**:
  ```prisma
  datasource db {
    provider = "postgresql"
  }
  ```

#### 2. `src/lib/prisma.ts` (NEW FILE)
- **Purpose**: Centralized Prisma client configuration with Neon adapter
- **Features**:
  - Uses `@prisma/adapter-neon` for serverless connections
  - Configures WebSocket support for Neon (server-side only)
  - **Lazy loading**: Client only created when accessed (prevents bundling issues)
  - **Server-only imports**: Uses `require()` to load Prisma only on server
  - Singleton pattern for production (prevents connection pooling issues)
  - Global instance in development (improves hot-reload performance)
  - Exports `getPrismaClient()` helper for cases requiring fresh connections
  - **Proxy pattern**: Ensures client is created on-demand, not at module load

#### 3. `src/lib/services/categorias.service.ts`
- **Change**: Updated all functions to use `getPrismaClient()` instead of `new PrismaClient()`
- **Affected functions**: 
  - `getAllCategorias()`
  - `getCategoriaById()`
  - `createCategoria()`
  - `updateCategoria()`
  - `deleteCategoria()`

#### 4. `src/lib/auth.ts`
- **Change**: Updated to use `getPrismaClient()` in the `authorize` callback
- **Import changed**: From `PrismaClient` to `getPrismaClient`

#### 5. `scripts/create-admin.ts`
- **Change**: Updated to use Neon adapter with WebSocket configuration
- **Note**: This script uses `@prisma/client` directly but creates the adapter correctly

#### 6. `package.json`
- **New script**: Added `vercel-build` command
  ```json
  "vercel-build": "prisma generate && next build"
  ```
- **New dependencies**:
  - `@prisma/adapter-neon@^7.0.1`
  - `ws@latest`
  - `@types/ws@latest` (dev dependency)

#### 7. `tsconfig.json`
- **Change**: Excluded `scripts/**/*` from TypeScript compilation
- **Reason**: Prevents Next.js build from trying to compile admin scripts

#### 8. `jest.setup.js`
- **Change**: Added polyfills for `TextEncoder` and `TextDecoder`
- **Reason**: Neon adapter requires these APIs which aren't available in Node.js test environment

### Configuration Files

- `prisma.config.ts`: Already configured correctly for Prisma 7 (no changes needed)
- Database URL is still configured via the `DATABASE_URL` environment variable

### Testing

All existing tests pass successfully with the new configuration:
- ✅ Auth tests (passed)
- ✅ Categorias service tests (106 tests passed)
- ✅ API route tests (passed)
- ✅ Component tests (passed)

### Build Verification

✅ **Production build successful**:
```bash
npm run vercel-build
# ✓ Generated Prisma Client (v7.0.1)
# ✓ Compiled successfully
# ✓ Generated static pages
```

### Deployment Notes

**Environment Variables Required:**
- `DATABASE_URL`: Neon PostgreSQL connection string (with WebSocket support)

**For Vercel/Serverless:**
- The centralized Prisma client (`src/lib/prisma.ts`) is optimized for serverless
- Uses Neon's WebSocket connections for low latency
- Singleton pattern prevents connection pool exhaustion
- Message pipelining improves query performance

**Benefits of Neon Adapter:**
- ✨ WebSocket connections (faster than traditional TCP)
- ✨ Message pipelining (reduced round-trip latency)
- ✨ Optimized for serverless/edge environments
- ✨ Connection pooling handled by Neon

### References

- [Prisma 7 Client Configuration](https://pris.ly/d/prisma7-client-config)
- [Prisma Config Datasource](https://pris.ly/d/config-datasource)
- [Neon Serverless Driver](https://github.com/neondatabase/serverless)
- [Prisma Neon Adapter](https://www.prisma.io/docs/guides/database/neon)

---

**Migration completed**: December 2, 2025
**Prisma version**: 7.0.1
**Build status**: ✅ Passing
**Tests status**: ✅ All passing (106 tests)

