# Instrucciones de Configuración Inicial

## Requisitos Previos

- Node.js 18 o superior
- npm, yarn o pnpm

## Pasos para Iniciar el Proyecto

### 1. Instalar Dependencias

```bash
npm install
```

o si usas yarn:

```bash
yarn install
```

o si usas pnpm:

```bash
pnpm install
```

### 2. Configurar Variables de Entorno

El proyecto necesita variables de entorno para funcionar. Crea un archivo `.env` en la raíz del proyecto:

```bash
# En la raíz del proyecto
touch .env
```

Agrega el siguiente contenido al archivo `.env`:

```env
DATABASE_URL="file:./dev.db"
```

> **Nota**: Consulta `ENV_SETUP.md` para más detalles sobre las variables de entorno.

### 3. Inicializar Prisma y la Base de Datos

Genera el cliente de Prisma:

```bash
npx prisma generate
```

Crea la base de datos y las tablas:

```bash
npx prisma db push
```

### 4. Ejecutar el Proyecto en Modo Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

### 5. (Opcional) Abrir Prisma Studio

Para ver y editar los datos de la base de datos visualmente:

```bash
npx prisma studio
```

Esto abrirá Prisma Studio en [http://localhost:5555](http://localhost:5555)

## Comandos Útiles

### Desarrollo
- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

### Prisma
- `npx prisma studio` - Abre el editor visual de base de datos
- `npx prisma generate` - Genera el cliente de Prisma
- `npx prisma db push` - Sincroniza el schema con la base de datos
- `npx prisma migrate dev` - Crea una nueva migración
- `npx prisma migrate reset` - Reinicia la base de datos (elimina todos los datos)

## Verificar la Instalación

Después de ejecutar `npm run dev`, visita:

1. **Página Principal**: [http://localhost:3000](http://localhost:3000)
2. **API de Equipos**: [http://localhost:3000/api/teams](http://localhost:3000/api/teams)
3. **Prisma Studio**: `npx prisma studio` → [http://localhost:5555](http://localhost:5555)

## Solución de Problemas

### Error: "Cannot find module '@prisma/client'"

Solución:
```bash
npx prisma generate
```

### Error: "Environment variable not found: DATABASE_URL"

Solución: Asegúrate de haber creado el archivo `.env` con la variable `DATABASE_URL`

### Error al ejecutar `npm run dev`

Solución: Verifica que todas las dependencias estén instaladas:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Próximos Pasos

Una vez que el proyecto esté funcionando:

1. Explora la estructura de carpetas
2. Revisa el schema de Prisma en `prisma/schema.prisma`
3. Prueba la API de equipos en `app/api/teams/route.ts`
4. Crea nuevos componentes en `components/`
5. Añade nuevas rutas en `app/`

¡Listo para comenzar a desarrollar! 🚀

