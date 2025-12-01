'use client';

/**
 * Categorias Configuration Page
 * 
 * Manages tournament categories (age groups, divisions)
 */

import { useState, useEffect } from 'react';
import { CategoriaResponse, CategoriaFormData } from '@/types/categoria.types';

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState<CategoriaResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<CategoriaFormData>>({});
  const [newCategoriaData, setNewCategoriaData] = useState<CategoriaFormData>({
    nombre: '',
    tipo: '',
    genero: '',
    fecha_inicio: '',
    fecha_fin: '',
  });
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  // Fetch categorias on mount
  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/categorias');
      
      if (!response.ok) {
        throw new Error('Error al cargar las categorías');
      }

      const data = await response.json();
      setCategorias(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error al cargar las categorías');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategoria = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCategoriaData.nombre || !newCategoriaData.tipo) {
      setError('El nombre y tipo son requeridos');
      return;
    }

    try {
      setActionLoading(-1);
      const response = await fetch('/api/categorias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: newCategoriaData.nombre,
          tipo: newCategoriaData.tipo,
          genero: newCategoriaData.genero || null,
          fecha_inicio: newCategoriaData.fecha_inicio || null,
          fecha_fin: newCategoriaData.fecha_fin || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al crear la categoría');
      }

      await fetchCategorias();
      setShowModal(false);
      setNewCategoriaData({
        nombre: '',
        tipo: '',
        genero: '',
        fecha_inicio: '',
        fecha_fin: '',
      });
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error al crear la categoría');
    } finally {
      setActionLoading(null);
    }
  };

  const handleUpdateCategoria = async (id: number) => {
    try {
      setActionLoading(id);
      const response = await fetch(`/api/categorias/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editFormData,
          genero: editFormData.genero || null,
          fecha_inicio: editFormData.fecha_inicio || null,
          fecha_fin: editFormData.fecha_fin || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al actualizar la categoría');
      }

      await fetchCategorias();
      setEditingId(null);
      setEditFormData({});
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error al actualizar la categoría');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteCategoria = async (id: number, nombre: string) => {
    if (!confirm(`¿Estás seguro de eliminar la categoría "${nombre}"?`)) {
      return;
    }

    try {
      setActionLoading(id);
      const response = await fetch(`/api/categorias/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al eliminar la categoría');
      }

      await fetchCategorias();
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Error al eliminar la categoría');
    } finally {
      setActionLoading(null);
    }
  };

  const startEditing = (categoria: CategoriaResponse) => {
    setEditingId(categoria.id_categoria);
    setEditFormData({
      nombre: categoria.nombre,
      tipo: categoria.tipo,
      genero: categoria.genero || '',
      fecha_inicio: categoria.fecha_inicio ? categoria.fecha_inicio.split('T')[0] : '',
      fecha_fin: categoria.fecha_fin ? categoria.fecha_fin.split('T')[0] : '',
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditFormData({});
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('es-ES');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Categorías</h1>
        <p className="mt-2 text-sm text-gray-600">
          Administra las categorías de torneos por edad y divisiones
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-400 hover:text-red-600"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Categorias Section */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Categorías</h2>
            <p className="mt-1 text-sm text-gray-600">
              Lista de todas las categorías del sistema
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nueva Categoría
          </button>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-sm text-gray-600">Cargando categorías...</p>
            </div>
          ) : categorias.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No hay categorías registradas. Haz clic en "Nueva Categoría" para agregar una.
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Género
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha Inicio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha Fin
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categorias.map((categoria) => (
                  <tr
                    key={categoria.id_categoria}
                    className={`hover:bg-gray-50 ${editingId === categoria.id_categoria ? 'bg-blue-50' : ''}`}
                  >
                    {editingId === categoria.id_categoria ? (
                      <>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={editFormData.nombre || ''}
                            onChange={(e) => setEditFormData({ ...editFormData, nombre: e.target.value })}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black placeholder:text-gray-400"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={editFormData.tipo || ''}
                            onChange={(e) => setEditFormData({ ...editFormData, tipo: e.target.value as any })}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black placeholder:text-gray-400"
                          >
                            <option value="infantil">Infantil</option>
                            <option value="juvenil">Juvenil</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={editFormData.genero || ''}
                            onChange={(e) => setEditFormData({ ...editFormData, genero: e.target.value as any })}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black placeholder:text-gray-400"
                          >
                            <option value="">-</option>
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="date"
                            value={editFormData.fecha_inicio || ''}
                            onChange={(e) => setEditFormData({ ...editFormData, fecha_inicio: e.target.value })}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black placeholder:text-gray-400"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="date"
                            value={editFormData.fecha_fin || ''}
                            onChange={(e) => setEditFormData({ ...editFormData, fecha_fin: e.target.value })}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black placeholder:text-gray-400"
                          />
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button
                            onClick={() => handleUpdateCategoria(categoria.id_categoria)}
                            disabled={actionLoading === categoria.id_categoria}
                            className="text-green-600 hover:text-green-900 disabled:opacity-50"
                            title="Guardar"
                          >
                            {actionLoading === categoria.id_categoria ? '...' : '✓'}
                          </button>
                          <button
                            onClick={cancelEditing}
                            disabled={actionLoading === categoria.id_categoria}
                            className="text-gray-600 hover:text-gray-900 disabled:opacity-50"
                            title="Cancelar"
                          >
                            ✕
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {categoria.nombre}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                          {categoria.tipo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {categoria.genero === 'M' ? 'Masculino' : categoria.genero === 'F' ? 'Femenino' : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(categoria.fecha_inicio)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(categoria.fecha_fin)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <button
                            onClick={() => startEditing(categoria)}
                            disabled={actionLoading !== null}
                            className="text-blue-600 hover:text-blue-900 disabled:opacity-50"
                            title="Editar"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteCategoria(categoria.id_categoria, categoria.nombre)}
                            disabled={actionLoading !== null}
                            className="text-red-600 hover:text-red-900 disabled:opacity-50"
                            title="Eliminar"
                          >
                            {actionLoading === categoria.id_categoria ? '...' : 'Eliminar'}
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Nueva Categoría</h3>
            </div>
            <form onSubmit={handleCreateCategoria} className="px-6 py-4 space-y-4">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                  Nombre *
                </label>
                <input
                  type="text"
                  id="nombre"
                  value={newCategoriaData.nombre}
                  onChange={(e) => setNewCategoriaData({ ...newCategoriaData, nombre: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black placeholder:text-gray-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
                  Tipo *
                </label>
                <select
                  id="tipo"
                  value={newCategoriaData.tipo}
                  onChange={(e) => setNewCategoriaData({ ...newCategoriaData, tipo: e.target.value as any })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black placeholder:text-gray-400"
                  required
                >
                  <option value="">Seleccionar...</option>
                  <option value="infantil">Infantil</option>
                  <option value="juvenil">Juvenil</option>
                </select>
              </div>
              <div>
                <label htmlFor="genero" className="block text-sm font-medium text-gray-700">
                  Género
                </label>
                <select
                  id="genero"
                  value={newCategoriaData.genero}
                  onChange={(e) => setNewCategoriaData({ ...newCategoriaData, genero: e.target.value as any })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black placeholder:text-gray-400"
                >
                  <option value="">Sin especificar</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                </select>
              </div>
              <div>
                <label htmlFor="fecha_inicio" className="block text-sm font-medium text-gray-700">
                  Fecha Inicio
                </label>
                <input
                  type="date"
                  id="fecha_inicio"
                  value={newCategoriaData.fecha_inicio}
                  onChange={(e) => setNewCategoriaData({ ...newCategoriaData, fecha_inicio: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black placeholder:text-gray-400"
                />
              </div>
              <div>
                <label htmlFor="fecha_fin" className="block text-sm font-medium text-gray-700">
                  Fecha Fin
                </label>
                <input
                  type="date"
                  id="fecha_fin"
                  value={newCategoriaData.fecha_fin}
                  onChange={(e) => setNewCategoriaData({ ...newCategoriaData, fecha_fin: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black placeholder:text-gray-400"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setNewCategoriaData({
                      nombre: '',
                      tipo: '',
                      genero: '',
                      fecha_inicio: '',
                      fecha_fin: '',
                    });
                  }}
                  disabled={actionLoading === -1}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={actionLoading === -1}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {actionLoading === -1 ? 'Creando...' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

