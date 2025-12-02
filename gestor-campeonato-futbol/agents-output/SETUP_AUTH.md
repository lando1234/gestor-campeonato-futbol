# 🔧 Configuración de Autenticación - IMPORTANTE

## ⚠️ Error Detectado: Falta AUTH_SECRET

El sistema de autenticación requiere una variable de entorno `AUTH_SECRET` para funcionar correctamente.

## 📝 Solución Rápida

### Paso 1: Agregar AUTH_SECRET al archivo .env

Abre tu archivo `.env` y agrega la siguiente línea:

```bash
AUTH_SECRET="2whGR49n0iwAuTh/DseNBoYAgb3PKUzWVGcA4vbOhw8="
```

### Paso 2: Reiniciar el servidor

Después de agregar la variable, reinicia el servidor de desarrollo:

1. Detén el servidor actual (Ctrl+C en la terminal)
2. Vuelve a ejecutar: `npm run dev`

## 🔐 Generar un nuevo secret (opcional)

Si deseas generar un nuevo secret aleatorio, ejecuta:

```bash
npm run generate-secret
```

Esto generará un nuevo secret que puedes copiar y pegar en tu archivo `.env`.

## 📋 Tu archivo .env debería verse así:

```bash
# Database
DATABASE_URL="tu-url-de-base-de-datos"

# NextAuth
AUTH_SECRET="2whGR49n0iwAuTh/DseNBoYAgb3PKUzWVGcA4vbOhw8="
NEXTAUTH_URL="http://localhost:3000"
```

## ✅ Verificar que funciona

1. Ve a `http://localhost:3000/login`
2. Ingresa las credenciales:
   - **Usuario**: `admin`
   - **Contraseña**: `galaxia`
3. Deberías ser redirigido a `/admin`

## 🆘 Si sigue sin funcionar

Verifica que:
- El archivo `.env` está en la raíz del proyecto `gestor-campeonato-futbol/`
- No hay espacios extra alrededor del `=` en la variable
- Reiniciaste el servidor después de agregar la variable
- El usuario administrador fue creado correctamente (ejecuta `npm run create-admin` si no estás seguro)

