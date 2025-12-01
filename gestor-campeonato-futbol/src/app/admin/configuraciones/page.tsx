/**
 * Configuraciones Page
 * 
 * This page handles system-wide configuration settings.
 * 
 * Future functionality will include:
 * - Tournament configuration (dates, rules, format)
 * - Category management (age groups, divisions)
 * - Pricing and payment settings
 * - User roles and permissions
 * - System preferences
 * - Email templates and notifications
 */
export default function ConfiguracionesPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Configuraciones del Sistema</h1>
        <p className="mt-2 text-sm text-gray-600">
          Administra las configuraciones generales del campeonato y sistema
        </p>
      </div>

      {/* Content Area - Placeholder */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-indigo-800">Página en Desarrollo</h3>
            <div className="mt-2 text-sm text-indigo-700">
              <p>Esta sección permitirá:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Configurar torneos (fechas, formato, reglas)</li>
                <li>Gestionar categorías y divisiones</li>
                <li>Configurar precios y métodos de pago</li>
                <li>Administrar usuarios y permisos</li>
                <li>Personalizar notificaciones y emails</li>
                <li>Ajustar preferencias generales del sistema</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Configuration Sections Grid - Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Torneos</h3>
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <p className="text-sm text-gray-600">
            Configura fechas, formatos y reglas de los torneos
          </p>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Categorías</h3>
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <p className="text-sm text-gray-600">
            Gestiona categorías por edad y divisiones
          </p>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Pagos</h3>
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <p className="text-sm text-gray-600">
            Define precios y métodos de pago aceptados
          </p>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Usuarios</h3>
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <p className="text-sm text-gray-600">
            Administra usuarios y sus permisos de acceso
          </p>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Notificaciones</h3>
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <p className="text-sm text-gray-600">
            Configura emails y notificaciones automáticas
          </p>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">General</h3>
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <p className="text-sm text-gray-600">
            Preferencias generales del sistema
          </p>
        </div>
      </div>
    </div>
  );
}

