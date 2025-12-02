/**
 * Unit tests for Categorias Service Layer
 */

import { PrismaClient } from '@/generated/prisma/client';
import {
  getAllCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} from '../categorias.service';

// Mock Prisma Client
jest.mock('@/generated/prisma/client', () => ({
  PrismaClient: jest.fn(),
}));

describe('Categorias Service', () => {
  let mockPrismaClient: any;
  let mockFindMany: jest.Mock;
  let mockFindUnique: jest.Mock;
  let mockCreate: jest.Mock;
  let mockUpdate: jest.Mock;
  let mockDelete: jest.Mock;
  let mockDeleteMany: jest.Mock;
  let mockDisconnect: jest.Mock;
  let mockTransaction: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockFindMany = jest.fn();
    mockFindUnique = jest.fn();
    mockCreate = jest.fn();
    mockUpdate = jest.fn();
    mockDelete = jest.fn();
    mockDeleteMany = jest.fn();
    mockDisconnect = jest.fn();
    mockTransaction = jest.fn();

    mockPrismaClient = {
      categoria: {
        findMany: mockFindMany,
        findUnique: mockFindUnique,
        create: mockCreate,
        update: mockUpdate,
        delete: mockDelete,
      },
      categoria_config: {
        create: jest.fn(),
        deleteMany: mockDeleteMany,
      },
      $disconnect: mockDisconnect,
      $transaction: mockTransaction,
    };

    (PrismaClient as jest.MockedClass<typeof PrismaClient>).mockImplementation(
      () => mockPrismaClient
    );
  });

  describe('getAllCategorias', () => {
    it('debe retornar todas las categorías ordenadas por nombre', async () => {
      const mockCategorias = [
        {
          id_categoria: 1,
          nombre: 'Sub 10',
          tipo: 'infantil',
          genero: 'M',
          fecha_inicio: new Date('2024-01-01'),
          fecha_fin: new Date('2024-12-31'),
        },
        {
          id_categoria: 2,
          nombre: 'Sub 12',
          tipo: 'infantil',
          genero: 'F',
          fecha_inicio: new Date('2024-01-01'),
          fecha_fin: new Date('2024-12-31'),
        },
      ];

      mockFindMany.mockResolvedValue(mockCategorias);

      const result = await getAllCategorias();

      expect(result).toEqual(mockCategorias);
      expect(mockFindMany).toHaveBeenCalledWith({
        orderBy: {
          nombre: 'asc',
        },
      });
      expect(mockDisconnect).toHaveBeenCalled();
    });

    it('debe desconectar Prisma incluso si hay un error', async () => {
      mockFindMany.mockRejectedValue(new Error('Database error'));

      await expect(getAllCategorias()).rejects.toThrow('Database error');
      expect(mockDisconnect).toHaveBeenCalled();
    });
  });

  describe('getCategoriaById', () => {
    it('debe retornar la categoría correcta por ID', async () => {
      const mockCategoria = {
        id_categoria: 1,
        nombre: 'Sub 10',
        tipo: 'infantil',
        genero: 'M',
        fecha_inicio: new Date('2024-01-01'),
        fecha_fin: new Date('2024-12-31'),
      };

      mockFindUnique.mockResolvedValue(mockCategoria);

      const result = await getCategoriaById(1);

      expect(result).toEqual(mockCategoria);
      expect(mockFindUnique).toHaveBeenCalledWith({
        where: { id_categoria: 1 },
      });
      expect(mockDisconnect).toHaveBeenCalled();
    });

    it('debe retornar null si la categoría no existe', async () => {
      mockFindUnique.mockResolvedValue(null);

      const result = await getCategoriaById(999);

      expect(result).toBeNull();
      expect(mockFindUnique).toHaveBeenCalledWith({
        where: { id_categoria: 999 },
      });
      expect(mockDisconnect).toHaveBeenCalled();
    });

    it('debe desconectar Prisma incluso si hay un error', async () => {
      mockFindUnique.mockRejectedValue(new Error('Database error'));

      await expect(getCategoriaById(1)).rejects.toThrow('Database error');
      expect(mockDisconnect).toHaveBeenCalled();
    });
  });

  describe('createCategoria', () => {
    it('debe crear una categoría con datos válidos', async () => {
      const inputData = {
        nombre: 'Sub 10',
        tipo: 'infantil' as const,
        genero: 'M' as const,
        fecha_inicio: '2024-01-01',
        fecha_fin: '2024-12-31',
      };

      const mockCreatedCategoria = {
        id_categoria: 1,
        nombre: 'Sub 10',
        tipo: 'infantil',
        genero: 'M',
        fecha_inicio: new Date('2024-01-01'),
        fecha_fin: new Date('2024-12-31'),
      };

      // Mock transaction to execute callback
      mockTransaction.mockImplementation(async (callback) => {
        return await callback({
          categoria: {
            create: mockCreate,
          },
          categoria_config: {
            create: jest.fn(),
          },
        });
      });

      mockCreate.mockResolvedValue(mockCreatedCategoria);

      const result = await createCategoria(inputData);

      expect(result).toEqual(mockCreatedCategoria);
      expect(mockTransaction).toHaveBeenCalled();
      expect(mockDisconnect).toHaveBeenCalled();
    });

    it('debe crear una categoría sin fechas opcionales', async () => {
      const inputData = {
        nombre: 'Sub 14',
        tipo: 'juvenil' as const,
      };

      const mockCreatedCategoria = {
        id_categoria: 2,
        nombre: 'Sub 14',
        tipo: 'juvenil',
        genero: null,
        fecha_inicio: null,
        fecha_fin: null,
      };

      // Mock transaction to execute callback
      mockTransaction.mockImplementation(async (callback) => {
        return await callback({
          categoria: {
            create: mockCreate,
          },
          categoria_config: {
            create: jest.fn(),
          },
        });
      });

      mockCreate.mockResolvedValue(mockCreatedCategoria);

      const result = await createCategoria(inputData);

      expect(result).toEqual(mockCreatedCategoria);
      expect(mockTransaction).toHaveBeenCalled();
      expect(mockDisconnect).toHaveBeenCalled();
    });

    it('debe fallar si el nombre está vacío', async () => {
      const inputData = {
        nombre: '',
        tipo: 'infantil' as const,
      };

      await expect(createCategoria(inputData)).rejects.toThrow('El nombre es requerido');
      expect(mockCreate).not.toHaveBeenCalled();
      expect(mockDisconnect).toHaveBeenCalled();
    });

    it('debe fallar si el nombre solo tiene espacios', async () => {
      const inputData = {
        nombre: '   ',
        tipo: 'infantil' as const,
      };

      await expect(createCategoria(inputData)).rejects.toThrow('El nombre es requerido');
      expect(mockCreate).not.toHaveBeenCalled();
      expect(mockDisconnect).toHaveBeenCalled();
    });

    it('debe fallar si el tipo es inválido', async () => {
      const inputData = {
        nombre: 'Sub 10',
        tipo: 'senior' as any,
      };

      await expect(createCategoria(inputData)).rejects.toThrow('El tipo debe ser "infantil" o "juvenil"');
      expect(mockCreate).not.toHaveBeenCalled();
      expect(mockDisconnect).toHaveBeenCalled();
    });

    it('debe fallar si el género es inválido', async () => {
      const inputData = {
        nombre: 'Sub 10',
        tipo: 'infantil' as const,
        genero: 'X' as any,
      };

      await expect(createCategoria(inputData)).rejects.toThrow('El género debe ser "M" o "F"');
      expect(mockCreate).not.toHaveBeenCalled();
      expect(mockDisconnect).toHaveBeenCalled();
    });

    it('debe trimear el nombre antes de crear', async () => {
      const inputData = {
        nombre: '  Sub 10  ',
        tipo: 'infantil' as const,
      };

      const mockCreatedCategoria = {
        id_categoria: 1,
        nombre: 'Sub 10',
        tipo: 'infantil',
        genero: null,
        fecha_inicio: null,
        fecha_fin: null,
      };

      // Mock transaction to execute callback
      mockTransaction.mockImplementation(async (callback) => {
        return await callback({
          categoria: {
            create: mockCreate,
          },
          categoria_config: {
            create: jest.fn(),
          },
        });
      });

      mockCreate.mockResolvedValue(mockCreatedCategoria);

      await createCategoria(inputData);

      expect(mockTransaction).toHaveBeenCalled();
      expect(mockDisconnect).toHaveBeenCalled();
    });
  });

  describe('updateCategoria', () => {
    it('debe actualizar campos correctamente', async () => {
      const existingCategoria = {
        id_categoria: 1,
        nombre: 'Sub 10',
        tipo: 'infantil',
        genero: 'M',
        fecha_inicio: new Date('2024-01-01'),
        fecha_fin: new Date('2024-12-31'),
      };

      const updateData = {
        nombre: 'Sub 10 Actualizada',
        genero: 'F' as const,
      };

      const updatedCategoria = {
        ...existingCategoria,
        ...updateData,
      };

      mockFindUnique.mockResolvedValue(existingCategoria);
      mockUpdate.mockResolvedValue(updatedCategoria);

      const result = await updateCategoria(1, updateData);

      expect(result).toEqual(updatedCategoria);
      expect(mockFindUnique).toHaveBeenCalledWith({
        where: { id_categoria: 1 },
      });
      expect(mockUpdate).toHaveBeenCalledWith({
        where: { id_categoria: 1 },
        data: expect.objectContaining({
          nombre: 'Sub 10 Actualizada',
          genero: 'F',
        }),
      });
      expect(mockDisconnect).toHaveBeenCalled();
    });

    it('debe retornar null si la categoría no existe', async () => {
      mockFindUnique.mockResolvedValue(null);

      const result = await updateCategoria(999, { nombre: 'Test' });

      expect(result).toBeNull();
      expect(mockUpdate).not.toHaveBeenCalled();
      expect(mockDisconnect).toHaveBeenCalled();
    });

    it('debe fallar si el nombre está vacío', async () => {
      const existingCategoria = {
        id_categoria: 1,
        nombre: 'Sub 10',
        tipo: 'infantil',
        genero: 'M',
        fecha_inicio: null,
        fecha_fin: null,
      };

      mockFindUnique.mockResolvedValue(existingCategoria);

      await expect(updateCategoria(1, { nombre: '' })).rejects.toThrow('El nombre no puede estar vacío');
      expect(mockUpdate).not.toHaveBeenCalled();
      expect(mockDisconnect).toHaveBeenCalled();
    });

    it('debe fallar si el tipo es inválido', async () => {
      const existingCategoria = {
        id_categoria: 1,
        nombre: 'Sub 10',
        tipo: 'infantil',
        genero: 'M',
        fecha_inicio: null,
        fecha_fin: null,
      };

      mockFindUnique.mockResolvedValue(existingCategoria);

      await expect(updateCategoria(1, { tipo: 'senior' as any })).rejects.toThrow('El tipo debe ser "infantil" o "juvenil"');
      expect(mockUpdate).not.toHaveBeenCalled();
      expect(mockDisconnect).toHaveBeenCalled();
    });

    it('debe fallar si el género es inválido', async () => {
      const existingCategoria = {
        id_categoria: 1,
        nombre: 'Sub 10',
        tipo: 'infantil',
        genero: 'M',
        fecha_inicio: null,
        fecha_fin: null,
      };

      mockFindUnique.mockResolvedValue(existingCategoria);

      await expect(updateCategoria(1, { genero: 'X' as any })).rejects.toThrow('El género debe ser "M" o "F"');
      expect(mockUpdate).not.toHaveBeenCalled();
      expect(mockDisconnect).toHaveBeenCalled();
    });

    it('debe actualizar solo los campos proporcionados', async () => {
      const existingCategoria = {
        id_categoria: 1,
        nombre: 'Sub 10',
        tipo: 'infantil',
        genero: 'M',
        fecha_inicio: new Date('2024-01-01'),
        fecha_fin: new Date('2024-12-31'),
      };

      mockFindUnique.mockResolvedValue(existingCategoria);
      mockUpdate.mockResolvedValue({ ...existingCategoria, nombre: 'Sub 11' });

      await updateCategoria(1, { nombre: 'Sub 11' });

      expect(mockUpdate).toHaveBeenCalledWith({
        where: { id_categoria: 1 },
        data: {
          nombre: 'Sub 11',
        },
      });
      expect(mockDisconnect).toHaveBeenCalled();
    });
  });

  describe('deleteCategoria', () => {
    it('debe eliminar una categoría exitosamente', async () => {
      const existingCategoria = {
        id_categoria: 1,
        nombre: 'Sub 10',
        tipo: 'infantil',
        genero: 'M',
        fecha_inicio: null,
        fecha_fin: null,
        equipo: [],
        inscripcion: [],
        fixture: [],
      };

      mockFindUnique.mockResolvedValue(existingCategoria);
      
      // Mock transaction to execute callback
      mockTransaction.mockImplementation(async (callback) => {
        return await callback({
          categoria_config: {
            deleteMany: mockDeleteMany,
          },
          categoria: {
            delete: mockDelete,
          },
        });
      });

      mockDeleteMany.mockResolvedValue({ count: 1 });
      mockDelete.mockResolvedValue(existingCategoria);

      const result = await deleteCategoria(1);

      expect(result).toEqual({ success: true });
      expect(mockFindUnique).toHaveBeenCalledWith({
        where: { id_categoria: 1 },
        include: {
          equipo: true,
          inscripcion: true,
          fixture: true,
        },
      });
      expect(mockTransaction).toHaveBeenCalled();
      expect(mockDisconnect).toHaveBeenCalled();
    });

    it('debe retornar null si la categoría no existe', async () => {
      mockFindUnique.mockResolvedValue(null);

      const result = await deleteCategoria(999);

      expect(result).toBeNull();
      expect(mockDelete).not.toHaveBeenCalled();
      expect(mockDisconnect).toHaveBeenCalled();
    });

    it('debe fallar si hay equipos relacionados', async () => {
      const existingCategoria = {
        id_categoria: 1,
        nombre: 'Sub 10',
        tipo: 'infantil',
        genero: 'M',
        fecha_inicio: null,
        fecha_fin: null,
        equipo: [{ id_equipo: 1, nombre: 'Equipo A' }],
        inscripcion: [],
        fixture: [],
      };

      mockFindUnique.mockResolvedValue(existingCategoria);

      await expect(deleteCategoria(1)).rejects.toThrow('No se puede eliminar la categoría porque tiene registros relacionados');
      expect(mockDelete).not.toHaveBeenCalled();
      expect(mockDisconnect).toHaveBeenCalled();
    });

    it('debe fallar si hay inscripciones relacionadas', async () => {
      const existingCategoria = {
        id_categoria: 1,
        nombre: 'Sub 10',
        tipo: 'infantil',
        genero: 'M',
        fecha_inicio: null,
        fecha_fin: null,
        equipo: [],
        inscripcion: [{ id_inscripcion: 1 }],
        fixture: [],
      };

      mockFindUnique.mockResolvedValue(existingCategoria);

      await expect(deleteCategoria(1)).rejects.toThrow('No se puede eliminar la categoría porque tiene registros relacionados');
      expect(mockDelete).not.toHaveBeenCalled();
      expect(mockDisconnect).toHaveBeenCalled();
    });

    it('debe fallar si hay fixtures relacionados', async () => {
      const existingCategoria = {
        id_categoria: 1,
        nombre: 'Sub 10',
        tipo: 'infantil',
        genero: 'M',
        fecha_inicio: null,
        fecha_fin: null,
        equipo: [],
        inscripcion: [],
        fixture: [{ id_fixture: 1 }],
      };

      mockFindUnique.mockResolvedValue(existingCategoria);

      await expect(deleteCategoria(1)).rejects.toThrow('No se puede eliminar la categoría porque tiene registros relacionados');
      expect(mockDelete).not.toHaveBeenCalled();
      expect(mockDisconnect).toHaveBeenCalled();
    });
  });
});

