/**
 * Categorias Service Layer
 * Handles all database operations for categorias
 */

import { getPrismaClient } from '@/lib/prisma';
import { CategoriaInput } from '@/types/categoria.types';

/**
 * Get all categorias ordered by name
 */
export async function getAllCategorias() {
  const prisma = getPrismaClient();
  try {
    const categorias = await prisma.categoria.findMany({
      orderBy: {
        nombre: 'asc',
      },
    });
    return categorias;
  } catch (error) {
    console.error('Error fetching categorias:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Get a specific categoria by ID
 */
export async function getCategoriaById(id: number) {
  const prisma = getPrismaClient();
  try {
    const categoria = await prisma.categoria.findUnique({
      where: {
        id_categoria: id,
      },
    });
    return categoria;
  } catch (error) {
    console.error(`Error fetching categoria with id ${id}:`, error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Create a new categoria
 */
export async function createCategoria(data: CategoriaInput) {
  const prisma = getPrismaClient();
  try {
    // Validate required fields
    if (!data.nombre || data.nombre.trim() === '') {
      throw new Error('El nombre es requerido');
    }

    if (!data.tipo || !['infantil', 'juvenil'].includes(data.tipo)) {
      throw new Error('El tipo debe ser "infantil" o "juvenil"');
    }

    if (data.genero && !['M', 'F'].includes(data.genero)) {
      throw new Error('El género debe ser "M" o "F"');
    }

    // Convert string dates to Date objects if necessary
    const categoriaData: any = {
      nombre: data.nombre.trim(),
      tipo: data.tipo,
      genero: data.genero || null,
    };

    if (data.fecha_inicio) {
      categoriaData.fecha_inicio = typeof data.fecha_inicio === 'string' 
        ? new Date(data.fecha_inicio) 
        : data.fecha_inicio;
    }

    if (data.fecha_fin) {
      categoriaData.fecha_fin = typeof data.fecha_fin === 'string' 
        ? new Date(data.fecha_fin) 
        : data.fecha_fin;
    }

    // Use transaction to create categoria and its config
    const categoria = await prisma.$transaction(async (tx) => {
      // Create categoria
      const newCategoria = await tx.categoria.create({
        data: categoriaData,
      });

      // Create categoria_config with default values (all false/0)
      await tx.categoria_config.create({
        data: {
          id_categoria: newCategoria.id_categoria,
          jugadores: 0,
          equipos: 0,
          fixtures: 0,
          posiciones: 0,
          texto: null,
          reglamento: 'empty',
          ver_jugadores: 0,
        },
      });

      return newCategoria;
    });

    return categoria;
  } catch (error) {
    console.error('Error creating categoria:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Update an existing categoria
 */
export async function updateCategoria(id: number, data: Partial<CategoriaInput>) {
  const prisma = getPrismaClient();
  try {
    // Check if categoria exists
    const existing = await prisma.categoria.findUnique({
      where: { id_categoria: id },
    });

    if (!existing) {
      return null;
    }

    // Validate fields if provided
    if (data.nombre !== undefined && data.nombre.trim() === '') {
      throw new Error('El nombre no puede estar vacío');
    }

    if (data.tipo && !['infantil', 'juvenil'].includes(data.tipo)) {
      throw new Error('El tipo debe ser "infantil" o "juvenil"');
    }

    if (data.genero && !['M', 'F'].includes(data.genero)) {
      throw new Error('El género debe ser "M" o "F"');
    }

    // Prepare update data
    const updateData: any = {};

    if (data.nombre !== undefined) {
      updateData.nombre = data.nombre.trim();
    }

    if (data.tipo !== undefined) {
      updateData.tipo = data.tipo;
    }

    if (data.genero !== undefined) {
      updateData.genero = data.genero || null;
    }

    if (data.fecha_inicio !== undefined) {
      updateData.fecha_inicio = data.fecha_inicio 
        ? (typeof data.fecha_inicio === 'string' ? new Date(data.fecha_inicio) : data.fecha_inicio)
        : null;
    }

    if (data.fecha_fin !== undefined) {
      updateData.fecha_fin = data.fecha_fin 
        ? (typeof data.fecha_fin === 'string' ? new Date(data.fecha_fin) : data.fecha_fin)
        : null;
    }

    const categoria = await prisma.categoria.update({
      where: { id_categoria: id },
      data: updateData,
    });

    return categoria;
  } catch (error) {
    console.error(`Error updating categoria with id ${id}:`, error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Delete a categoria
 */
export async function deleteCategoria(id: number) {
  const prisma = getPrismaClient();
  try {
    // Check if categoria exists
    const existing = await prisma.categoria.findUnique({
      where: { id_categoria: id },
      include: {
        equipo: true,
        inscripcion: true,
        fixture: true,
      },
    });

    if (!existing) {
      return null;
    }

    // Check for dependent records
    if (existing.equipo.length > 0 || existing.inscripcion.length > 0 || existing.fixture.length > 0) {
      throw new Error('No se puede eliminar la categoría porque tiene registros relacionados (equipos, inscripciones o fixtures)');
    }

    // Use transaction to delete categoria_config and categoria
    await prisma.$transaction(async (tx) => {
      // First delete categoria_config
      await tx.categoria_config.deleteMany({
        where: { id_categoria: id },
      });

      // Then delete categoria
      await tx.categoria.delete({
        where: { id_categoria: id },
      });
    });

    return { success: true };
  } catch (error) {
    console.error(`Error deleting categoria with id ${id}:`, error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

