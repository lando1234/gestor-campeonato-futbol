# 🧪 Testing - Sistema de Autenticación

Este documento describe los tests unitarios implementados para el sistema de autenticación del Gestor de Campeonato de Fútbol.

## 📦 Dependencias de Testing

El proyecto utiliza las siguientes herramientas de testing:

- **Jest**: Framework de testing
- **React Testing Library**: Testing de componentes React
- **@testing-library/user-event**: Simulación de interacciones de usuario
- **@testing-library/jest-dom**: Matchers personalizados para Jest

## 🚀 Comandos Disponibles

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch (útil durante desarrollo)
npm run test:watch

# Ejecutar tests con reporte de cobertura
npm run test:coverage
```

## 📁 Estructura de Tests

```
src/
├── app/
│   └── login/
│       ├── __tests__/
│       │   └── page.test.tsx       # Tests del componente de login
│       └── page.tsx
└── lib/
    ├── __tests__/
    │   └── auth.test.ts            # Tests de la lógica de autenticación
    └── auth.ts
```

## 🧪 Tests Implementados

### 1. Tests del Componente de Login (`page.test.tsx`)

#### **Renderizado** (4 tests)
- ✅ Renderiza el formulario correctamente
- ✅ Muestra los placeholders correctos
- ✅ Muestra el mensaje de acceso restringido
- ✅ Muestra todos los elementos del UI

#### **Validación de Formulario** (4 tests)
- ✅ Campo de usuario es requerido
- ✅ Campo de contraseña es requerido
- ✅ Actualiza el valor del input de usuario
- ✅ Actualiza el valor del input de contraseña

#### **Autenticación** (5 tests)
- ✅ Llama a signIn con las credenciales correctas
- ✅ Redirige a /admin después de login exitoso
- ✅ Muestra error con credenciales inválidas
- ✅ Muestra error genérico cuando falla la autenticación
- ✅ No redirige si hay error

#### **Estado de Carga** (2 tests)
- ✅ Deshabilita el formulario durante el login
- ✅ Cambia el texto del botón durante la carga

#### **Manejo de Errores** (1 test)
- ✅ Limpia el mensaje de error al volver a intentar

**Total: 16 tests**

### 2. Tests de Lógica de Autenticación (`auth.test.ts`)

#### **Validación de Credenciales** (3 tests)
- ✅ Retorna null si no se proporciona username
- ✅ Retorna null si no se proporciona password
- ✅ Retorna null si no se proporcionan credenciales

#### **Búsqueda de Usuario** (3 tests)
- ✅ Busca usuario por username
- ✅ Retorna null si el usuario no existe
- ✅ Retorna null si el usuario está inactivo

#### **Validación de Contraseña** (3 tests)
- ✅ Compara la contraseña correctamente
- ✅ Retorna false con contraseña incorrecta
- ✅ Retorna null si la contraseña no es válida

#### **Autenticación Exitosa** (2 tests)
- ✅ Retorna el objeto de usuario correcto con credenciales válidas
- ✅ Convierte el id a string

#### **Manejo de Conexión Prisma** (2 tests)
- ✅ Desconecta Prisma después de la autenticación exitosa
- ✅ Desconecta Prisma incluso si hay un error

#### **Casos de Borde** (3 tests)
- ✅ Maneja username con espacios
- ✅ Es case-sensitive para el username
- ✅ Maneja contraseñas especiales

#### **Hashing de Contraseñas** (2 tests)
- ✅ Hashea contraseñas con bcrypt
- ✅ Usa 10 rounds para el hash

**Total: 16 tests**

## 📊 Cobertura de Tests

### Componente de Login
- **Statements**: 100%
- **Branches**: 100%
- **Functions**: 100%
- **Lines**: 100%

### Resumen Total
- **32 tests** en total
- **Todos los tests pasando** ✅
- **100% de cobertura** en el componente de login

## 🎯 Casos de Prueba Cubiertos

### Flujos Principales
1. ✅ Login exitoso con credenciales válidas
2. ✅ Login fallido con credenciales inválidas
3. ✅ Validación de campos requeridos
4. ✅ Estados de carga durante la autenticación
5. ✅ Manejo de errores de red
6. ✅ Redirección después del login

### Casos de Borde
1. ✅ Campos vacíos
2. ✅ Usuario inactivo
3. ✅ Usuario no existe
4. ✅ Contraseña incorrecta
5. ✅ Espacios en username
6. ✅ Caracteres especiales en contraseña
7. ✅ Case sensitivity

### Seguridad
1. ✅ Hashing de contraseñas con bcrypt
2. ✅ Validación de usuario activo
3. ✅ Manejo seguro de errores
4. ✅ Desconexión de base de datos

## 🔧 Configuración

### jest.config.js
Configuración principal de Jest con soporte para Next.js y módulos TypeScript.

### jest.setup.js
Configuración de mocks globales:
- `next-auth/react`: Mock de funciones de autenticación
- `next/navigation`: Mock de hooks de navegación

## 📝 Ejemplo de Ejecución

```bash
$ npm test

PASS src/lib/__tests__/auth.test.ts
PASS src/app/login/__tests__/page.test.tsx

Test Suites: 2 passed, 2 total
Tests:       32 passed, 32 total
Snapshots:   0 total
Time:        1.888 s
```

## 🚀 Mejores Prácticas Implementadas

1. **Aislamiento**: Cada test es independiente y no afecta a otros
2. **Mocking**: Se mockean dependencias externas (Prisma, NextAuth)
3. **Cobertura**: Tests cubren casos exitosos, errores y casos de borde
4. **Legibilidad**: Nombres descriptivos y estructura clara
5. **Mantenibilidad**: Tests organizados por funcionalidad

## 🔄 Integración Continua

Los tests pueden integrarse fácilmente en un pipeline de CI/CD:

```yaml
# Ejemplo para GitHub Actions
- name: Run tests
  run: npm test

- name: Check coverage
  run: npm run test:coverage
```

## 📚 Recursos Adicionales

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Nota**: Los tests se ejecutan automáticamente antes de cada build para asegurar la calidad del código.

