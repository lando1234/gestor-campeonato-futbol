/**
 * TypeScript types for Categoria management
 */

/**
 * Input data for creating or editing a categoria
 */
export interface CategoriaInput {
  nombre: string;
  tipo: 'infantil' | 'juvenil';
  genero?: 'M' | 'F' | null;
  fecha_inicio?: Date | string | null;
  fecha_fin?: Date | string | null;
}

/**
 * Response data from API for a categoria
 */
export interface CategoriaResponse {
  id_categoria: number;
  nombre: string;
  tipo: 'infantil' | 'juvenil';
  genero: 'M' | 'F' | null;
  fecha_inicio: string | null;
  fecha_fin: string | null;
}

/**
 * Form data for categoria UI
 */
export interface CategoriaFormData {
  nombre: string;
  tipo: 'infantil' | 'juvenil' | '';
  genero: 'M' | 'F' | '';
  fecha_inicio: string;
  fecha_fin: string;
}

/**
 * Categoria validation error
 */
export interface CategoriaValidationError {
  field: string;
  message: string;
}

