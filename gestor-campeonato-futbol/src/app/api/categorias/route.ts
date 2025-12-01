/**
 * API Routes for Categorias
 * GET /api/categorias - List all categorias
 * POST /api/categorias - Create a new categoria
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getAllCategorias, createCategoria } from '@/lib/services/categorias.service';
import { CategoriaInput } from '@/types/categoria.types';

/**
 * GET /api/categorias
 * Returns all categorias
 */
export async function GET() {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const categorias = await getAllCategorias();
    
    // Format dates as ISO strings for JSON response
    const formattedCategorias = categorias.map((cat) => ({
      id_categoria: cat.id_categoria,
      nombre: cat.nombre,
      tipo: cat.tipo,
      genero: cat.genero,
      fecha_inicio: cat.fecha_inicio ? cat.fecha_inicio.toISOString() : null,
      fecha_fin: cat.fecha_fin ? cat.fecha_fin.toISOString() : null,
    }));

    return NextResponse.json(formattedCategorias, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/categorias:', error);
    return NextResponse.json(
      { error: 'Error al obtener las categorías' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/categorias
 * Creates a new categoria
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validate required fields
    if (!body.nombre || typeof body.nombre !== 'string') {
      return NextResponse.json(
        { error: 'El nombre es requerido y debe ser un texto' },
        { status: 400 }
      );
    }

    if (!body.tipo || !['infantil', 'juvenil'].includes(body.tipo)) {
      return NextResponse.json(
        { error: 'El tipo es requerido y debe ser "infantil" o "juvenil"' },
        { status: 400 }
      );
    }

    if (body.genero && !['M', 'F', null].includes(body.genero)) {
      return NextResponse.json(
        { error: 'El género debe ser "M" o "F"' },
        { status: 400 }
      );
    }

    const categoriaInput: CategoriaInput = {
      nombre: body.nombre,
      tipo: body.tipo,
      genero: body.genero || null,
      fecha_inicio: body.fecha_inicio || null,
      fecha_fin: body.fecha_fin || null,
    };

    const categoria = await createCategoria(categoriaInput);

    const formattedCategoria = {
      id_categoria: categoria.id_categoria,
      nombre: categoria.nombre,
      tipo: categoria.tipo,
      genero: categoria.genero,
      fecha_inicio: categoria.fecha_inicio ? categoria.fecha_inicio.toISOString() : null,
      fecha_fin: categoria.fecha_fin ? categoria.fecha_fin.toISOString() : null,
    };

    return NextResponse.json(formattedCategoria, { status: 201 });
  } catch (error: any) {
    console.error('Error in POST /api/categorias:', error);
    
    // Return validation errors with 400 status
    if (error.message && (
      error.message.includes('requerido') || 
      error.message.includes('debe ser') ||
      error.message.includes('inválido')
    )) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Error al crear la categoría' },
      { status: 500 }
    );
  }
}

