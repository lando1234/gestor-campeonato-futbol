"use client";

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

/**
 * Navbar Component
 * 
 * Navigation bar for the admin section with dropdown menus.
 * Uses hover-based dropdowns (CSS only) to navigate between admin subsections.
 * 
 * Sections:
 * - Inscripción: Manage registrations
 * - Pagos: Manage payments
 * - Inscripción Especial: Special registration cases
 * - Configuraciones: System configurations
 */
export default function Navbar() {
  const { data: session } = useSession();
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex-shrink-0">
            <Link href="/admin" className="text-white text-xl font-bold hover:text-blue-100 transition-colors">
              Admin Panel
            </Link>
          </div>

          {/* Navigation Links with Dropdowns */}
          <div className="flex space-x-1">
            
            {/* Inscripción Dropdown */}
            <div className="relative group">
              <button className="text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition-colors">
                Inscripción
                <svg className="inline-block ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Dropdown Menu - Shows on hover */}
              <div className="absolute left-0 mt-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1">
                  <Link 
                    href="/admin/inscripcion" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    Ver Inscripciones
                  </Link>
                  <Link 
                    href="/admin/inscripcion/nueva" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    Nueva Inscripción
                  </Link>
                  <Link 
                    href="/admin/inscripcion/gestionar" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    Gestionar
                  </Link>
                </div>
              </div>
            </div>

            {/* Pagos Dropdown */}
            <div className="relative group">
              <button className="text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition-colors">
                Pagos
                <svg className="inline-block ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Dropdown Menu - Shows on hover */}
              <div className="absolute left-0 mt-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1">
                  <Link 
                    href="/admin/pagos" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    Ver Pagos
                  </Link>
                  <Link 
                    href="/admin/pagos/registrar" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    Registrar Pago
                  </Link>
                  <Link 
                    href="/admin/pagos/pendientes" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    Pendientes
                  </Link>
                </div>
              </div>
            </div>

            {/* Inscripción Especial Dropdown */}
            <div className="relative group">
              <button className="text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition-colors">
                Inscripción Especial
                <svg className="inline-block ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Dropdown Menu - Shows on hover */}
              <div className="absolute left-0 mt-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1">
                  <Link 
                    href="/admin/inscripcion-especial" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    Ver Casos Especiales
                  </Link>
                  <Link 
                    href="/admin/inscripcion-especial/nuevo" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    Nuevo Caso
                  </Link>
                </div>
              </div>
            </div>

            {/* Configuraciones Dropdown */}
            <div className="relative group">
              <button className="text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition-colors">
                Configuraciones
                <svg className="inline-block ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Dropdown Menu - Shows on hover */}
              <div className="absolute left-0 mt-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1">
                  <Link 
                    href="/admin/configuraciones" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    General
                  </Link>
                  <Link 
                    href="/admin/configuraciones/torneos" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    Torneos
                  </Link>
                  <Link 
                    href="/admin/configuraciones/categorias" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    Categorías
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* User Info and Logout */}
          <div className="flex items-center space-x-4">
            {session?.user && (
              <>
                <span className="text-white text-sm">
                  {session.user.name || session.user.email}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="text-white px-4 py-2 rounded-md text-sm font-medium bg-blue-800 hover:bg-blue-900 transition-colors"
                >
                  Cerrar Sesión
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

