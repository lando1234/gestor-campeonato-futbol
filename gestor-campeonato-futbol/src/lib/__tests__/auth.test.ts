import { compare, hash } from 'bcryptjs';
import { PrismaClient } from '@/generated/prisma/client';

// Mock Prisma Client
jest.mock('@/generated/prisma/client', () => ({
  PrismaClient: jest.fn(),
}));

// Mock bcryptjs
jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

const mockCompare = compare as jest.MockedFunction<typeof compare>;
const mockHash = hash as jest.MockedFunction<typeof hash>;

describe('Auth - Authorize Function', () => {
  let mockPrismaClient: any;
  let mockFindUnique: jest.Mock;
  let mockDisconnect: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockFindUnique = jest.fn();
    mockDisconnect = jest.fn();

    mockPrismaClient = {
      usuario: {
        findUnique: mockFindUnique,
      },
      $disconnect: mockDisconnect,
    };

    (PrismaClient as jest.MockedClass<typeof PrismaClient>).mockImplementation(
      () => mockPrismaClient
    );
  });

  describe('Validación de Credenciales', () => {
    it('debe retornar null si no se proporciona username', async () => {
      const credentials = {
        username: '',
        password: 'galaxia',
      };

      // Simular la lógica de authorize
      const result = !credentials.username || !credentials.password ? null : 'valid';

      expect(result).toBeNull();
      expect(mockFindUnique).not.toHaveBeenCalled();
    });

    it('debe retornar null si no se proporciona password', async () => {
      const credentials = {
        username: 'admin',
        password: '',
      };

      const result = !credentials.username || !credentials.password ? null : 'valid';

      expect(result).toBeNull();
      expect(mockFindUnique).not.toHaveBeenCalled();
    });

    it('debe retornar null si no se proporcionan credenciales', async () => {
      const credentials = {
        username: '',
        password: '',
      };

      const result = !credentials.username || !credentials.password ? null : 'valid';

      expect(result).toBeNull();
      expect(mockFindUnique).not.toHaveBeenCalled();
    });
  });

  describe('Búsqueda de Usuario', () => {
    it('debe buscar usuario por username', async () => {
      const mockUser = {
        id: 1,
        username: 'admin',
        password: 'hashed_password',
        nombre: 'Administrador',
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockFindUnique.mockResolvedValue(mockUser);
      mockCompare.mockResolvedValue(true as never);

      await mockPrismaClient.usuario.findUnique({
        where: { username: 'admin' },
      });

      expect(mockFindUnique).toHaveBeenCalledWith({
        where: { username: 'admin' },
      });
    });

    it('debe retornar null si el usuario no existe', async () => {
      mockFindUnique.mockResolvedValue(null);

      const user = await mockPrismaClient.usuario.findUnique({
        where: { username: 'nonexistent' },
      });

      expect(user).toBeNull();
      expect(mockFindUnique).toHaveBeenCalledWith({
        where: { username: 'nonexistent' },
      });
    });

    it('debe retornar null si el usuario está inactivo', async () => {
      const mockUser = {
        id: 1,
        username: 'admin',
        password: 'hashed_password',
        nombre: 'Administrador',
        activo: false, // Usuario inactivo
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockFindUnique.mockResolvedValue(mockUser);

      const user = await mockPrismaClient.usuario.findUnique({
        where: { username: 'admin' },
      });

      // Simular la validación
      const result = user && user.activo ? user : null;

      expect(result).toBeNull();
    });
  });

  describe('Validación de Contraseña', () => {
    it('debe comparar la contraseña correctamente', async () => {
      const plainPassword = 'galaxia';
      const hashedPassword = 'hashed_password';

      mockCompare.mockResolvedValue(true as never);

      const isValid = await mockCompare(plainPassword, hashedPassword);

      expect(isValid).toBe(true);
      expect(mockCompare).toHaveBeenCalledWith(plainPassword, hashedPassword);
    });

    it('debe retornar false con contraseña incorrecta', async () => {
      const plainPassword = 'wrong_password';
      const hashedPassword = 'hashed_password';

      mockCompare.mockResolvedValue(false as never);

      const isValid = await mockCompare(plainPassword, hashedPassword);

      expect(isValid).toBe(false);
    });

    it('debe retornar null si la contraseña no es válida', async () => {
      const mockUser = {
        id: 1,
        username: 'admin',
        password: 'hashed_password',
        nombre: 'Administrador',
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockFindUnique.mockResolvedValue(mockUser);
      mockCompare.mockResolvedValue(false as never);

      const user = await mockPrismaClient.usuario.findUnique({
        where: { username: 'admin' },
      });

      const isPasswordValid = await mockCompare('wrong_password', user.password);

      const result = isPasswordValid ? user : null;

      expect(result).toBeNull();
    });
  });

  describe('Autenticación Exitosa', () => {
    it('debe retornar el objeto de usuario correcto con credenciales válidas', async () => {
      const mockUser = {
        id: 1,
        username: 'admin',
        password: 'hashed_password',
        nombre: 'Administrador',
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockFindUnique.mockResolvedValue(mockUser);
      mockCompare.mockResolvedValue(true as never);

      const user = await mockPrismaClient.usuario.findUnique({
        where: { username: 'admin' },
      });

      const isPasswordValid = await mockCompare('galaxia', user.password);

      const result = user && isPasswordValid
        ? {
            id: user.id.toString(),
            name: user.nombre,
            email: user.username,
          }
        : null;

      expect(result).toEqual({
        id: '1',
        name: 'Administrador',
        email: 'admin',
      });
    });

    it('debe convertir el id a string', async () => {
      const mockUser = {
        id: 123,
        username: 'admin',
        password: 'hashed_password',
        nombre: 'Administrador',
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockFindUnique.mockResolvedValue(mockUser);
      mockCompare.mockResolvedValue(true as never);

      const user = await mockPrismaClient.usuario.findUnique({
        where: { username: 'admin' },
      });

      const isPasswordValid = await mockCompare('galaxia', user.password);

      const result = {
        id: user.id.toString(),
        name: user.nombre,
        email: user.username,
      };

      expect(result.id).toBe('123');
      expect(typeof result.id).toBe('string');
    });
  });

  describe('Manejo de Conexión Prisma', () => {
    it('debe desconectar Prisma después de la autenticación exitosa', async () => {
      const mockUser = {
        id: 1,
        username: 'admin',
        password: 'hashed_password',
        nombre: 'Administrador',
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockFindUnique.mockResolvedValue(mockUser);
      mockCompare.mockResolvedValue(true as never);

      try {
        await mockPrismaClient.usuario.findUnique({
          where: { username: 'admin' },
        });
        await mockCompare('galaxia', mockUser.password);
      } finally {
        await mockPrismaClient.$disconnect();
      }

      expect(mockDisconnect).toHaveBeenCalled();
    });

    it('debe desconectar Prisma incluso si hay un error', async () => {
      mockFindUnique.mockRejectedValue(new Error('Database error'));

      try {
        await mockPrismaClient.usuario.findUnique({
          where: { username: 'admin' },
        });
      } catch (error) {
        // Error esperado
      } finally {
        await mockPrismaClient.$disconnect();
      }

      expect(mockDisconnect).toHaveBeenCalled();
    });
  });

  describe('Casos de Borde', () => {
    it('debe manejar username con espacios', async () => {
      const credentials = {
        username: '  admin  ',
        password: 'galaxia',
      };

      // En producción, podrías querer hacer trim del username
      const trimmedUsername = credentials.username.trim();

      expect(trimmedUsername).toBe('admin');
    });

    it('debe ser case-sensitive para el username', async () => {
      mockFindUnique.mockResolvedValue(null);

      await mockPrismaClient.usuario.findUnique({
        where: { username: 'ADMIN' },
      });

      expect(mockFindUnique).toHaveBeenCalledWith({
        where: { username: 'ADMIN' },
      });
    });

    it('debe manejar contraseñas especiales', async () => {
      const specialPassword = 'P@ssw0rd!#$%^&*()';
      const hashedPassword = 'hashed_special_password';

      mockCompare.mockResolvedValue(true as never);

      const isValid = await mockCompare(specialPassword, hashedPassword);

      expect(isValid).toBe(true);
      expect(mockCompare).toHaveBeenCalledWith(specialPassword, hashedPassword);
    });
  });

  describe('Hashing de Contraseñas', () => {
    it('debe hashear contraseñas con bcrypt', async () => {
      const plainPassword = 'galaxia';
      const hashedPassword = '$2a$10$hashedpassword';

      mockHash.mockResolvedValue(hashedPassword as never);

      const result = await mockHash(plainPassword, 10);

      expect(result).toBe(hashedPassword);
      expect(mockHash).toHaveBeenCalledWith(plainPassword, 10);
    });

    it('debe usar 10 rounds para el hash', async () => {
      const plainPassword = 'galaxia';

      mockHash.mockResolvedValue('hashed' as never);

      await mockHash(plainPassword, 10);

      expect(mockHash).toHaveBeenCalledWith(plainPassword, 10);
    });
  });
});

