/**
 * Inscripción Page
 * 
 * This page handles team and player registration management.
 * 
 * Future functionality will include:
 * - View all registrations
 * - Create new registrations
 * - Edit existing registrations
 * - Validate registration requirements
 * - Assign teams to categories
 */
export default function InscripcionPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Inscripciones</h1>
        <p className="mt-2 text-sm text-gray-600">
          Administra las inscripciones de equipos y jugadores al campeonato
        </p>
      </div>

      {/* Content Area - Placeholder */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Página en Desarrollo</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>Esta sección permitirá:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Ver listado de todas las inscripciones</li>
                <li>Registrar nuevos equipos y jugadores</li>
                <li>Editar información de inscripciones existentes</li>
                <li>Validar requisitos de inscripción</li>
                <li>Gestionar documentación requerida</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats - Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-purple-900">Inscripciones Totales</h3>
          <p className="text-3xl font-bold text-purple-700 mt-2">--</p>
          <p className="text-sm text-purple-600 mt-1">Próximamente</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900">Inscripciones Aprobadas</h3>
          <p className="text-3xl font-bold text-green-700 mt-2">--</p>
          <p className="text-sm text-green-600 mt-1">Próximamente</p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-amber-900">Pendientes</h3>
          <p className="text-3xl font-bold text-amber-700 mt-2">--</p>
          <p className="text-sm text-amber-600 mt-1">Próximamente</p>
        </div>
      </div>
    </div>
  );
}

