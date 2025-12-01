/**
 * Unit tests for /api/categorias/[id] routes
 * @jest-environment node
 */

import { NextRequest } from 'next/server';
import { GET, PUT, DELETE } from '../[id]/route';
import * as authModule from '@/lib/auth';
import * as categoriaService from '@/lib/services/categorias.service';

// Mock auth
jest.mock('@/lib/auth', () => ({
  auth: jest.fn(),
}));

// Mock categorias service
jest.mock('@/lib/services/categorias.service', () => ({
  getCategoriaById: jest.fn(),
  updateCategoria: jest.fn(),
  deleteCategoria: jest.fn(),
}));

describe('GET /api/categorias/[id]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe retornar 401 si no hay sesión', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue(null);

    const request = new NextRequest('http://localhost:3000/api/categorias/1');
    const response = await GET(request, { params: { id: '1' } });
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe('No autorizado');
  });

  it('debe retornar 200 con la categoría', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue({ user: { id: '1' } });

    const mockCategoria = {
      id_categoria: 1,
      nombre: 'Sub 10',
      tipo: 'infantil',
      genero: 'M',
      fecha_inicio: new Date('2024-01-01'),
      fecha_fin: new Date('2024-12-31'),
    };

    (categoriaService.getCategoriaById as jest.Mock).mockResolvedValue(mockCategoria);

    const request = new NextRequest('http://localhost:3000/api/categorias/1');
    const response = await GET(request, { params: { id: '1' } });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.nombre).toBe('Sub 10');
    expect(data.tipo).toBe('infantil');
    expect(typeof data.fecha_inicio).toBe('string');
  });

  it('debe retornar 404 si la categoría no existe', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue({ user: { id: '1' } });
    (categoriaService.getCategoriaById as jest.Mock).mockResolvedValue(null);

    const request = new NextRequest('http://localhost:3000/api/categorias/999');
    const response = await GET(request, { params: { id: '999' } });
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.error).toBe('Categoría no encontrada');
  });

  it('debe retornar 400 si el ID es inválido', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue({ user: { id: '1' } });

    const request = new NextRequest('http://localhost:3000/api/categorias/abc');
    const response = await GET(request, { params: { id: 'abc' } });
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('ID inválido');
  });

  it('debe retornar 500 si hay un error en el servicio', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue({ user: { id: '1' } });
    (categoriaService.getCategoriaById as jest.Mock).mockRejectedValue(new Error('Database error'));

    const request = new NextRequest('http://localhost:3000/api/categorias/1');
    const response = await GET(request, { params: { id: '1' } });
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Error al obtener la categoría');
  });
});

describe('PUT /api/categorias/[id]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe retornar 401 si no hay sesión', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue(null);

    const request = new NextRequest('http://localhost:3000/api/categorias/1', {
      method: 'PUT',
      body: JSON.stringify({ nombre: 'Sub 10 Actualizada' }),
    });

    const response = await PUT(request, { params: { id: '1' } });
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe('No autorizado');
  });

  it('debe actualizar y retornar 200', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue({ user: { id: '1' } });

    const mockUpdatedCategoria = {
      id_categoria: 1,
      nombre: 'Sub 10 Actualizada',
      tipo: 'infantil',
      genero: 'M',
      fecha_inicio: new Date('2024-01-01'),
      fecha_fin: new Date('2024-12-31'),
    };

    (categoriaService.updateCategoria as jest.Mock).mockResolvedValue(mockUpdatedCategoria);

    const request = new NextRequest('http://localhost:3000/api/categorias/1', {
      method: 'PUT',
      body: JSON.stringify({ nombre: 'Sub 10 Actualizada' }),
    });

    const response = await PUT(request, { params: { id: '1' } });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.nombre).toBe('Sub 10 Actualizada');
  });

  it('debe retornar 404 si la categoría no existe', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue({ user: { id: '1' } });
    (categoriaService.updateCategoria as jest.Mock).mockResolvedValue(null);

    const request = new NextRequest('http://localhost:3000/api/categorias/999', {
      method: 'PUT',
      body: JSON.stringify({ nombre: 'Sub 10 Actualizada' }),
    });

    const response = await PUT(request, { params: { id: '999' } });
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.error).toBe('Categoría no encontrada');
  });

  it('debe retornar 400 si el ID es inválido', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue({ user: { id: '1' } });

    const request = new NextRequest('http://localhost:3000/api/categorias/abc', {
      method: 'PUT',
      body: JSON.stringify({ nombre: 'Sub 10 Actualizada' }),
    });

    const response = await PUT(request, { params: { id: 'abc' } });
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('ID inválido');
  });

  it('debe retornar 400 si el nombre está vacío', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue({ user: { id: '1' } });

    const request = new NextRequest('http://localhost:3000/api/categorias/1', {
      method: 'PUT',
      body: JSON.stringify({ nombre: '' }),
    });

    const response = await PUT(request, { params: { id: '1' } });
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain('nombre');
  });

  it('debe retornar 400 si el tipo es inválido', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue({ user: { id: '1' } });

    const request = new NextRequest('http://localhost:3000/api/categorias/1', {
      method: 'PUT',
      body: JSON.stringify({ tipo: 'senior' }),
    });

    const response = await PUT(request, { params: { id: '1' } });
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain('tipo');
  });

  it('debe retornar 400 si el género es inválido', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue({ user: { id: '1' } });

    const request = new NextRequest('http://localhost:3000/api/categorias/1', {
      method: 'PUT',
      body: JSON.stringify({ genero: 'X' }),
    });

    const response = await PUT(request, { params: { id: '1' } });
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain('género');
  });

  it('debe retornar 400 si el servicio lanza error de validación', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue({ user: { id: '1' } });
    (categoriaService.updateCategoria as jest.Mock).mockRejectedValue(
      new Error('El nombre no puede estar vacío')
    );

    const request = new NextRequest('http://localhost:3000/api/categorias/1', {
      method: 'PUT',
      body: JSON.stringify({ nombre: 'Test' }),
    });

    const response = await PUT(request, { params: { id: '1' } });
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('El nombre no puede estar vacío');
  });

  it('debe retornar 500 si hay un error inesperado', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue({ user: { id: '1' } });
    (categoriaService.updateCategoria as jest.Mock).mockRejectedValue(
      new Error('Unexpected error')
    );

    const request = new NextRequest('http://localhost:3000/api/categorias/1', {
      method: 'PUT',
      body: JSON.stringify({ nombre: 'Test' }),
    });

    const response = await PUT(request, { params: { id: '1' } });
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Error al actualizar la categoría');
  });
});

describe('DELETE /api/categorias/[id]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe retornar 401 si no hay sesión', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue(null);

    const request = new NextRequest('http://localhost:3000/api/categorias/1', {
      method: 'DELETE',
    });

    const response = await DELETE(request, { params: { id: '1' } });
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe('No autorizado');
  });

  it('debe eliminar y retornar 200', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue({ user: { id: '1' } });
    (categoriaService.deleteCategoria as jest.Mock).mockResolvedValue({ success: true });

    const request = new NextRequest('http://localhost:3000/api/categorias/1', {
      method: 'DELETE',
    });

    const response = await DELETE(request, { params: { id: '1' } });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.message).toBe('Categoría eliminada exitosamente');
  });

  it('debe retornar 404 si la categoría no existe', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue({ user: { id: '1' } });
    (categoriaService.deleteCategoria as jest.Mock).mockResolvedValue(null);

    const request = new NextRequest('http://localhost:3000/api/categorias/999', {
      method: 'DELETE',
    });

    const response = await DELETE(request, { params: { id: '999' } });
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.error).toBe('Categoría no encontrada');
  });

  it('debe retornar 400 si el ID es inválido', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue({ user: { id: '1' } });

    const request = new NextRequest('http://localhost:3000/api/categorias/abc', {
      method: 'DELETE',
    });

    const response = await DELETE(request, { params: { id: 'abc' } });
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('ID inválido');
  });

  it('debe retornar 409 si hay registros relacionados', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue({ user: { id: '1' } });
    (categoriaService.deleteCategoria as jest.Mock).mockRejectedValue(
      new Error('No se puede eliminar la categoría porque tiene registros relacionados (equipos, inscripciones o fixtures)')
    );

    const request = new NextRequest('http://localhost:3000/api/categorias/1', {
      method: 'DELETE',
    });

    const response = await DELETE(request, { params: { id: '1' } });
    const data = await response.json();

    expect(response.status).toBe(409);
    expect(data.error).toContain('registros relacionados');
  });

  it('debe retornar 500 si hay un error inesperado', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue({ user: { id: '1' } });
    (categoriaService.deleteCategoria as jest.Mock).mockRejectedValue(
      new Error('Unexpected error')
    );

    const request = new NextRequest('http://localhost:3000/api/categorias/1', {
      method: 'DELETE',
    });

    const response = await DELETE(request, { params: { id: '1' } });
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Error al eliminar la categoría');
  });
});

