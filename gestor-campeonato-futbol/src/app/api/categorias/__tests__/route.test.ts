/**
 * Unit tests for /api/categorias routes
 * @jest-environment node
 */

import { NextRequest } from 'next/server';
import { GET, POST } from '../route';
import * as authModule from '@/lib/auth';
import * as categoriaService from '@/lib/services/categorias.service';

// Mock auth
jest.mock('@/lib/auth', () => ({
  auth: jest.fn(),
}));

// Mock categorias service
jest.mock('@/lib/services/categorias.service', () => ({
  getAllCategorias: jest.fn(),
  createCategoria: jest.fn(),
}));

describe('GET /api/categorias', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe retornar 401 si no hay sesión', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue(null);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe('No autorizado');
  });

  it('debe retornar 200 con array de categorías', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue({ user: { id: '1' } });

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
        tipo: 'juvenil',
        genero: 'F',
        fecha_inicio: null,
        fecha_fin: null,
      },
    ];

    (categoriaService.getAllCategorias as jest.Mock).mockResolvedValue(mockCategorias);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data).toHaveLength(2);
    expect(data[0].nombre).toBe('Sub 10');
    expect(data[1].nombre).toBe('Sub 12');
    expect(typeof data[0].fecha_inicio).toBe('string');
    expect(data[1].fecha_inicio).toBeNull();
  });

  it('debe retornar 500 si hay un error en el servicio', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue({ user: { id: '1' } });
    (categoriaService.getAllCategorias as jest.Mock).mockRejectedValue(new Error('Database error'));

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Error al obtener las categorías');
  });
});

describe('POST /api/categorias', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe retornar 401 si no hay sesión', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue(null);

    const request = new NextRequest('http://localhost:3000/api/categorias', {
      method: 'POST',
      body: JSON.stringify({ nombre: 'Sub 10', tipo: 'infantil' }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe('No autorizado');
  });

  it('debe crear categoría y retornar 201', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue({ user: { id: '1' } });

    const mockCreatedCategoria = {
      id_categoria: 1,
      nombre: 'Sub 10',
      tipo: 'infantil',
      genero: 'M',
      fecha_inicio: new Date('2024-01-01'),
      fecha_fin: new Date('2024-12-31'),
    };

    (categoriaService.createCategoria as jest.Mock).mockResolvedValue(mockCreatedCategoria);

    const request = new NextRequest('http://localhost:3000/api/categorias', {
      method: 'POST',
      body: JSON.stringify({
        nombre: 'Sub 10',
        tipo: 'infantil',
        genero: 'M',
        fecha_inicio: '2024-01-01',
        fecha_fin: '2024-12-31',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.nombre).toBe('Sub 10');
    expect(data.tipo).toBe('infantil');
    expect(data.genero).toBe('M');
    expect(typeof data.fecha_inicio).toBe('string');
  });

  it('debe retornar 400 si falta el nombre', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue({ user: { id: '1' } });

    const request = new NextRequest('http://localhost:3000/api/categorias', {
      method: 'POST',
      body: JSON.stringify({
        tipo: 'infantil',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain('nombre');
  });

  it('debe retornar 400 si el nombre no es string', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue({ user: { id: '1' } });

    const request = new NextRequest('http://localhost:3000/api/categorias', {
      method: 'POST',
      body: JSON.stringify({
        nombre: 123,
        tipo: 'infantil',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain('nombre');
  });

  it('debe retornar 400 si falta el tipo', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue({ user: { id: '1' } });

    const request = new NextRequest('http://localhost:3000/api/categorias', {
      method: 'POST',
      body: JSON.stringify({
        nombre: 'Sub 10',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain('tipo');
  });

  it('debe retornar 400 si el tipo es inválido', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue({ user: { id: '1' } });

    const request = new NextRequest('http://localhost:3000/api/categorias', {
      method: 'POST',
      body: JSON.stringify({
        nombre: 'Sub 10',
        tipo: 'senior',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain('tipo');
  });

  it('debe retornar 400 si el género es inválido', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue({ user: { id: '1' } });

    const request = new NextRequest('http://localhost:3000/api/categorias', {
      method: 'POST',
      body: JSON.stringify({
        nombre: 'Sub 10',
        tipo: 'infantil',
        genero: 'X',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain('género');
  });

  it('debe crear categoría sin campos opcionales', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue({ user: { id: '1' } });

    const mockCreatedCategoria = {
      id_categoria: 1,
      nombre: 'Sub 10',
      tipo: 'infantil',
      genero: null,
      fecha_inicio: null,
      fecha_fin: null,
    };

    (categoriaService.createCategoria as jest.Mock).mockResolvedValue(mockCreatedCategoria);

    const request = new NextRequest('http://localhost:3000/api/categorias', {
      method: 'POST',
      body: JSON.stringify({
        nombre: 'Sub 10',
        tipo: 'infantil',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.nombre).toBe('Sub 10');
    expect(data.genero).toBeNull();
    expect(data.fecha_inicio).toBeNull();
  });

  it('debe retornar 400 si el servicio lanza error de validación', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue({ user: { id: '1' } });
    (categoriaService.createCategoria as jest.Mock).mockRejectedValue(
      new Error('El nombre es requerido')
    );

    const request = new NextRequest('http://localhost:3000/api/categorias', {
      method: 'POST',
      body: JSON.stringify({
        nombre: 'Sub 10',
        tipo: 'infantil',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('El nombre es requerido');
  });

  it('debe retornar 500 si hay un error inesperado', async () => {
    (authModule.auth as jest.Mock).mockResolvedValue({ user: { id: '1' } });
    (categoriaService.createCategoria as jest.Mock).mockRejectedValue(
      new Error('Unexpected error')
    );

    const request = new NextRequest('http://localhost:3000/api/categorias', {
      method: 'POST',
      body: JSON.stringify({
        nombre: 'Sub 10',
        tipo: 'infantil',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Error al crear la categoría');
  });
});

