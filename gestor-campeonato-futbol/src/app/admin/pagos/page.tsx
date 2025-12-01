/**
 * Pagos Page
 * 
 * This page handles payment management for teams and players.
 * 
 * Future functionality will include:
 * - View all payments
 * - Register new payments
 * - Track pending payments
 * - Generate payment reports
 * - Send payment reminders
 */
export default function PagosPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Pagos</h1>
        <p className="mt-2 text-sm text-gray-600">
          Administra los pagos de inscripciones y cuotas del campeonato
        </p>
      </div>

      {/* Content Area - Placeholder */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">Página en Desarrollo</h3>
            <div className="mt-2 text-sm text-green-700">
              <p>Esta sección permitirá:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Ver historial completo de pagos</li>
                <li>Registrar nuevos pagos recibidos</li>
                <li>Consultar pagos pendientes por equipo/jugador</li>
                <li>Generar reportes de ingresos</li>
                <li>Enviar recordatorios de pago automáticos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats - Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900">Pagos Totales</h3>
          <p className="text-3xl font-bold text-blue-700 mt-2">$--</p>
          <p className="text-sm text-blue-600 mt-1">Próximamente</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900">Pagos Confirmados</h3>
          <p className="text-3xl font-bold text-green-700 mt-2">$--</p>
          <p className="text-sm text-green-600 mt-1">Próximamente</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-900">Pagos Pendientes</h3>
          <p className="text-3xl font-bold text-red-700 mt-2">$--</p>
          <p className="text-sm text-red-600 mt-1">Próximamente</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-purple-900">Este Mes</h3>
          <p className="text-3xl font-bold text-purple-700 mt-2">$--</p>
          <p className="text-sm text-purple-600 mt-1">Próximamente</p>
        </div>
      </div>
    </div>
  );
}

