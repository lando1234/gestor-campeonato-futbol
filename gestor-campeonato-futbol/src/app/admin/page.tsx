import Link from 'next/link';

/**
 * Admin Dashboard Page
 * 
 * Main administrative dashboard with navigation to all admin sections:
 * - System Configuration
 * - Registration Management
 * - Special Registration
 * - Payments Management
 */
export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
        <p className="mt-2 text-sm text-gray-600">
          Bienvenido al panel de administración del sistema de gestión de campeonatos
        </p>
      </div>

      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-blue-900">Sistema de Gestión de Campeonatos</h3>
            <p className="mt-2 text-sm text-blue-700">
              Desde aquí puedes acceder a todas las herramientas de administración del campeonato.
              Selecciona una de las opciones a continuación para comenzar.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Configuraciones */}
        <Link 
          href="/admin/configuraciones"
          className="group bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-indigo-400 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                  <svg className="h-7 w-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  Configuraciones
                </h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Administra las configuraciones generales del sistema: torneos, categorías, pagos, usuarios y notificaciones.
              </p>
            </div>
            <svg className="h-6 w-6 text-gray-400 group-hover:text-indigo-600 transition-colors ml-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        {/* Inscripción */}
        <Link 
          href="/admin/inscripcion"
          className="group bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-blue-400 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <svg className="h-7 w-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Inscripción
                </h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Gestiona las inscripciones de equipos y jugadores. Ver, crear, editar y validar registros.
              </p>
            </div>
            <svg className="h-6 w-6 text-gray-400 group-hover:text-blue-600 transition-colors ml-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        {/* Inscripción Especial */}
        <Link 
          href="/admin/inscripcion-especial"
          className="group bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-purple-400 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <svg className="h-7 w-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                  Inscripción Especial
                </h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Procesa inscripciones con condiciones especiales o excepciones al proceso regular.
              </p>
            </div>
            <svg className="h-6 w-6 text-gray-400 group-hover:text-purple-600 transition-colors ml-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        {/* Pagos */}
        <Link 
          href="/admin/pagos"
          className="group bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-green-400 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <svg className="h-7 w-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                  Pagos
                </h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Administra pagos de inscripciones, verifica transacciones y gestiona registros contables.
              </p>
            </div>
            <svg className="h-6 w-6 text-gray-400 group-hover:text-green-600 transition-colors ml-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </div>

      {/* Quick Stats Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-6 mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Estadísticas Rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
            <p className="text-2xl font-bold text-gray-900">--</p>
            <p className="text-xs text-gray-600 mt-1">Equipos Inscritos</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
            <p className="text-2xl font-bold text-gray-900">--</p>
            <p className="text-xs text-gray-600 mt-1">Jugadores</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
            <p className="text-2xl font-bold text-gray-900">--</p>
            <p className="text-xs text-gray-600 mt-1">Partidos Programados</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
            <p className="text-2xl font-bold text-gray-900">--</p>
            <p className="text-xs text-gray-600 mt-1">Pagos Pendientes</p>
          </div>
        </div>
      </div>
    </div>
  );
}

