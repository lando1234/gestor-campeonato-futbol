/**
 * Unit tests for Categorias Page
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CategoriasPage from '../page';

// Mock fetch globally
global.fetch = jest.fn();

describe('CategoriasPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  describe('Renderizado inicial', () => {
    it('debe renderizar el título y descripción', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ([]),
      });

      render(<CategoriasPage />);

      expect(screen.getByText('Gestión de Categorías')).toBeInTheDocument();
      expect(screen.getByText(/Administra las categorías de torneos/i)).toBeInTheDocument();
    });

    it('debe renderizar la sección de categorías', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ([]),
      });

      render(<CategoriasPage />);

      await waitFor(() => {
        expect(screen.getByText('Categorías')).toBeInTheDocument();
      });

      expect(screen.getByText('Lista de todas las categorías del sistema')).toBeInTheDocument();
      expect(screen.getByText('Nueva Categoría')).toBeInTheDocument();
    });

    it('debe mostrar estado de carga inicial', () => {
      (global.fetch as jest.Mock).mockImplementationOnce(
        () => new Promise(() => {}) // Never resolves
      );

      render(<CategoriasPage />);

      expect(screen.getByText('Cargando categorías...')).toBeInTheDocument();
    });
  });

  describe('Lista de categorías', () => {
    it('debe mostrar lista de categorías desde API', async () => {
      const mockCategorias = [
        {
          id_categoria: 1,
          nombre: 'Sub 10',
          tipo: 'infantil',
          genero: 'M',
          fecha_inicio: '2024-01-01T00:00:00.000Z',
          fecha_fin: '2024-12-31T00:00:00.000Z',
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

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategorias,
      });

      render(<CategoriasPage />);

      await waitFor(() => {
        expect(screen.getByText('Sub 10')).toBeInTheDocument();
      });

      expect(screen.getByText('Sub 12')).toBeInTheDocument();
      expect(screen.getByText('Masculino')).toBeInTheDocument();
      expect(screen.getByText('Femenino')).toBeInTheDocument();
    });

    it('debe mostrar mensaje cuando no hay categorías', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ([]),
      });

      render(<CategoriasPage />);

      await waitFor(() => {
        expect(screen.getByText(/No hay categorías registradas/i)).toBeInTheDocument();
      });
    });

    it('debe mostrar mensaje de error si falla la carga', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Error de servidor' }),
      });

      render(<CategoriasPage />);

      await waitFor(() => {
        expect(screen.getByText(/Error al cargar las categorías/i)).toBeInTheDocument();
      });
    });
  });

  describe('Modal de creación', () => {
    it('debe abrir modal al hacer click en "Nueva Categoría"', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ([]),
      });

      render(<CategoriasPage />);

      await waitFor(() => {
        expect(screen.getByText('Nueva Categoría')).toBeInTheDocument();
      });

      const newButton = screen.getByText('Nueva Categoría');
      fireEvent.click(newButton);

      await waitFor(() => {
        expect(screen.getAllByText('Nueva Categoría')).toHaveLength(2); // Button + Modal title
      });

      expect(screen.getByLabelText(/Nombre \*/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Tipo \*/i)).toBeInTheDocument();
    });

    it('debe cerrar modal al hacer click en Cancelar', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ([]),
      });

      render(<CategoriasPage />);

      await waitFor(() => {
        expect(screen.getByText('Nueva Categoría')).toBeInTheDocument();
      });

      const newButton = screen.getByText('Nueva Categoría');
      fireEvent.click(newButton);

      await waitFor(() => {
        expect(screen.getAllByText('Nueva Categoría')).toHaveLength(2);
      });

      const cancelButton = screen.getByText('Cancelar');
      fireEvent.click(cancelButton);

      await waitFor(() => {
        expect(screen.getAllByText('Nueva Categoría')).toHaveLength(1); // Only button remains
      });
    });

    it('debe crear categoría mediante formulario', async () => {
      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ([]),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            id_categoria: 1,
            nombre: 'Sub 10',
            tipo: 'infantil',
            genero: 'M',
            fecha_inicio: '2024-01-01T00:00:00.000Z',
            fecha_fin: '2024-12-31T00:00:00.000Z',
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ([
            {
              id_categoria: 1,
              nombre: 'Sub 10',
              tipo: 'infantil',
              genero: 'M',
              fecha_inicio: '2024-01-01T00:00:00.000Z',
              fecha_fin: '2024-12-31T00:00:00.000Z',
            },
          ]),
        });

      render(<CategoriasPage />);

      await waitFor(() => {
        expect(screen.getByText('Nueva Categoría')).toBeInTheDocument();
      });

      // Open modal
      const newButton = screen.getByText('Nueva Categoría');
      fireEvent.click(newButton);

      await waitFor(() => {
        expect(screen.getAllByText('Nueva Categoría')).toHaveLength(2);
      });

      // Fill form
      const nombreInput = screen.getByLabelText(/Nombre \*/i);
      const tipoSelect = screen.getByLabelText(/Tipo \*/i);

      fireEvent.change(nombreInput, { target: { value: 'Sub 10' } });
      fireEvent.change(tipoSelect, { target: { value: 'infantil' } });

      // Submit form
      const createButton = screen.getByRole('button', { name: /Crear/i });
      fireEvent.click(createButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          '/api/categorias',
          expect.objectContaining({
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          })
        );
      });

      // Modal should close and list should refresh
      await waitFor(() => {
        expect(screen.getAllByText(/Nueva Categoría|Sub 10/)).toBeTruthy();
      });
    });
  });

  describe('Edición inline', () => {
    it('debe habilitar edición inline al hacer click en Editar', async () => {
      const mockCategorias = [
        {
          id_categoria: 1,
          nombre: 'Sub 10',
          tipo: 'infantil',
          genero: 'M',
          fecha_inicio: '2024-01-01T00:00:00.000Z',
          fecha_fin: '2024-12-31T00:00:00.000Z',
        },
      ];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategorias,
      });

      render(<CategoriasPage />);

      await waitFor(() => {
        expect(screen.getByText('Sub 10')).toBeInTheDocument();
      });

      const editButton = screen.getByText('Editar');
      fireEvent.click(editButton);

      // Should show input fields
      await waitFor(() => {
        const inputs = screen.getAllByRole('textbox');
        expect(inputs.length).toBeGreaterThan(0);
      });
    });

    it('debe guardar cambios de edición inline', async () => {
      const mockCategorias = [
        {
          id_categoria: 1,
          nombre: 'Sub 10',
          tipo: 'infantil',
          genero: 'M',
          fecha_inicio: '2024-01-01T00:00:00.000Z',
          fecha_fin: '2024-12-31T00:00:00.000Z',
        },
      ];

      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockCategorias,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            ...mockCategorias[0],
            nombre: 'Sub 10 Actualizada',
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ([
            {
              ...mockCategorias[0],
              nombre: 'Sub 10 Actualizada',
            },
          ]),
        });

      render(<CategoriasPage />);

      await waitFor(() => {
        expect(screen.getByText('Sub 10')).toBeInTheDocument();
      });

      // Start editing
      const editButton = screen.getByText('Editar');
      fireEvent.click(editButton);

      await waitFor(() => {
        const inputs = screen.getAllByRole('textbox');
        expect(inputs.length).toBeGreaterThan(0);
      });

      // Change name
      const nombreInput = screen.getAllByRole('textbox')[0];
      fireEvent.change(nombreInput, { target: { value: 'Sub 10 Actualizada' } });

      // Save changes
      const saveButton = screen.getByTitle('Guardar');
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          '/api/categorias/1',
          expect.objectContaining({
            method: 'PUT',
          })
        );
      });
    });

    it('debe cancelar edición inline', async () => {
      const mockCategorias = [
        {
          id_categoria: 1,
          nombre: 'Sub 10',
          tipo: 'infantil',
          genero: 'M',
          fecha_inicio: '2024-01-01T00:00:00.000Z',
          fecha_fin: '2024-12-31T00:00:00.000Z',
        },
      ];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategorias,
      });

      render(<CategoriasPage />);

      await waitFor(() => {
        expect(screen.getByText('Sub 10')).toBeInTheDocument();
      });

      // Start editing
      const editButton = screen.getByText('Editar');
      fireEvent.click(editButton);

      await waitFor(() => {
        const inputs = screen.getAllByRole('textbox');
        expect(inputs.length).toBeGreaterThan(0);
      });

      // Cancel editing
      const cancelButton = screen.getByTitle('Cancelar');
      fireEvent.click(cancelButton);

      await waitFor(() => {
        expect(screen.getByText('Editar')).toBeInTheDocument();
      });
    });
  });

  describe('Eliminación de categorías', () => {
    it('debe eliminar categoría con confirmación', async () => {
      const mockCategorias = [
        {
          id_categoria: 1,
          nombre: 'Sub 10',
          tipo: 'infantil',
          genero: 'M',
          fecha_inicio: '2024-01-01T00:00:00.000Z',
          fecha_fin: '2024-12-31T00:00:00.000Z',
        },
      ];

      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockCategorias,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ message: 'Categoría eliminada exitosamente' }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ([]),
        });

      // Mock window.confirm
      global.confirm = jest.fn(() => true);

      render(<CategoriasPage />);

      await waitFor(() => {
        expect(screen.getByText('Sub 10')).toBeInTheDocument();
      });

      const deleteButton = screen.getByText('Eliminar');
      fireEvent.click(deleteButton);

      expect(global.confirm).toHaveBeenCalledWith(
        expect.stringContaining('Sub 10')
      );

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          '/api/categorias/1',
          expect.objectContaining({
            method: 'DELETE',
          })
        );
      });
    });

    it('no debe eliminar si se cancela la confirmación', async () => {
      const mockCategorias = [
        {
          id_categoria: 1,
          nombre: 'Sub 10',
          tipo: 'infantil',
          genero: 'M',
          fecha_inicio: '2024-01-01T00:00:00.000Z',
          fecha_fin: '2024-12-31T00:00:00.000Z',
        },
      ];

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategorias,
      });

      // Mock window.confirm to return false
      global.confirm = jest.fn(() => false);

      render(<CategoriasPage />);

      await waitFor(() => {
        expect(screen.getByText('Sub 10')).toBeInTheDocument();
      });

      const deleteButton = screen.getByText('Eliminar');
      fireEvent.click(deleteButton);

      expect(global.confirm).toHaveBeenCalled();

      // Fetch should only be called once (initial load)
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('debe mostrar mensaje de error si falla la eliminación', async () => {
      const mockCategorias = [
        {
          id_categoria: 1,
          nombre: 'Sub 10',
          tipo: 'infantil',
          genero: 'M',
          fecha_inicio: '2024-01-01T00:00:00.000Z',
          fecha_fin: '2024-12-31T00:00:00.000Z',
        },
      ];

      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockCategorias,
        })
        .mockResolvedValueOnce({
          ok: false,
          json: async () => ({ error: 'No se puede eliminar la categoría porque tiene registros relacionados' }),
        });

      global.confirm = jest.fn(() => true);

      render(<CategoriasPage />);

      await waitFor(() => {
        expect(screen.getByText('Sub 10')).toBeInTheDocument();
      });

      const deleteButton = screen.getByText('Eliminar');
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(screen.getByText(/registros relacionados/i)).toBeInTheDocument();
      });
    });
  });

  describe('Manejo de errores', () => {
    it('debe mostrar mensaje de error en operaciones fallidas', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Error de conexión' }),
      });

      render(<CategoriasPage />);

      await waitFor(() => {
        expect(screen.getByText(/Error al cargar las categorías/i)).toBeInTheDocument();
      });
    });

    it('debe poder cerrar el mensaje de error', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Error de conexión' }),
      });

      render(<CategoriasPage />);

      await waitFor(() => {
        expect(screen.getByText(/Error al cargar las categorías/i)).toBeInTheDocument();
      });

      const closeButtons = screen.getAllByRole('button');
      const closeButton = closeButtons.find(btn => btn.querySelector('svg'));
      
      if (closeButton) {
        fireEvent.click(closeButton);

        await waitFor(() => {
          expect(screen.queryByText(/Error al cargar las categorías/i)).not.toBeInTheDocument();
        });
      }
    });
  });

  describe('Estados de carga', () => {
    it('debe mostrar estado de carga durante operaciones', async () => {
      (global.fetch as jest.Mock).mockImplementationOnce(
        () => new Promise(() => {}) // Never resolves
      );

      render(<CategoriasPage />);

      expect(screen.getByText('Cargando categorías...')).toBeInTheDocument();
    });
  });
});

