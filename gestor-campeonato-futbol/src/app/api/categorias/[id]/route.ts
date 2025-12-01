/**
 * API Routes for specific Categoria
 * GET /api/categorias/[id] - Get a specific categoria
 * PUT /api/categorias/[id] - Update a categoria
 * DELETE /api/categorias/[id] - Delete a categoria
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import {
  getCategoriaById,
  updateCategoria,
  deleteCategoria,
} from '@/lib/services/categorias.service';
import { CategoriaInput } from '@/types/categoria.types';

/**
 * GET /api/categorias/[id]
 * Returns a specific categoria by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const { id: idParam } = await params;
    const id = parseInt(idParam, 10);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      );
    }

    const categoria = await getCategoriaById(id);

    if (!categoria) {
      return NextResponse.json(
        { error: 'Categoría no encontrada' },
        { status: 404 }
      );
    }

    const formattedCategoria = {
      id_categoria: categoria.id_categoria,
      nombre: categoria.nombre,
      tipo: categoria.tipo,
      genero: categoria.genero,
      fecha_inicio: categoria.fecha_inicio ? categoria.fecha_inicio.toISOString() : null,
      fecha_fin: categoria.fecha_fin ? categoria.fecha_fin.toISOString() : null,
    };

    return NextResponse.json(formattedCategoria, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/categorias/[id]:', error);
    return NextResponse.json(
      { error: 'Error al obtener la categoría' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/categorias/[id]
 * Updates a specific categoria
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const { id: idParam } = await params;
    const id = parseInt(idParam, 10);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Validate fields if provided
    if (body.nombre !== undefined && (typeof body.nombre !== 'string' || body.nombre.trim() === '')) {
      return NextResponse.json(
        { error: 'El nombre debe ser un texto válido' },
        { status: 400 }
      );
    }

    if (body.tipo !== undefined && !['infantil', 'juvenil'].includes(body.tipo)) {
      return NextResponse.json(
        { error: 'El tipo debe ser "infantil" o "juvenil"' },
        { status: 400 }
      );
    }

    if (body.genero !== undefined && body.genero !== null && !['M', 'F'].includes(body.genero)) {
      return NextResponse.json(
        { error: 'El género debe ser "M" o "F"' },
        { status: 400 }
      );
    }

    const updateData: Partial<CategoriaInput> = {};

    if (body.nombre !== undefined) updateData.nombre = body.nombre;
    if (body.tipo !== undefined) updateData.tipo = body.tipo;
    if (body.genero !== undefined) updateData.genero = body.genero;
    if (body.fecha_inicio !== undefined) updateData.fecha_inicio = body.fecha_inicio;
    if (body.fecha_fin !== undefined) updateData.fecha_fin = body.fecha_fin;

    const categoria = await updateCategoria(id, updateData);

    if (!categoria) {
      return NextResponse.json(
        { error: 'Categoría no encontrada' },
        { status: 404 }
      );
    }

    const formattedCategoria = {
      id_categoria: categoria.id_categoria,
      nombre: categoria.nombre,
      tipo: categoria.tipo,
      genero: categoria.genero,
      fecha_inicio: categoria.fecha_inicio ? categoria.fecha_inicio.toISOString() : null,
      fecha_fin: categoria.fecha_fin ? categoria.fecha_fin.toISOString() : null,
    };

    return NextResponse.json(formattedCategoria, { status: 200 });
  } catch (error: any) {
    console.error('Error in PUT /api/categorias/[id]:', error);

    // Return validation errors with 400 status
    if (error.message && (
      error.message.includes('requerido') || 
      error.message.includes('debe ser') ||
      error.message.includes('inválido') ||
      error.message.includes('no puede estar vacío')
    )) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Error al actualizar la categoría' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/categorias/[id]
 * Deletes a specific categoria
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const { id: idParam } = await params;
    const id = parseInt(idParam, 10);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      );
    }

    const result = await deleteCategoria(id);

    if (!result) {
      return NextResponse.json(
        { error: 'Categoría no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Categoría eliminada exitosamente' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error in DELETE /api/categorias/[id]:', error);

    // Return constraint errors with 409 status
    if (error.message && error.message.includes('registros relacionados')) {
      return NextResponse.json(
        { error: error.message },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Error al eliminar la categoría' },
      { status: 500 }
    );
  }
}

