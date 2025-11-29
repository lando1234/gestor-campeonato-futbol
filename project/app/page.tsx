export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Gestor Campeonato Fútbol
        </h1>
        <p className="text-center text-lg">
          Sistema de gestión de campeonatos de fútbol
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-6 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <h2 className="text-xl font-semibold mb-2">Equipos</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Gestiona los equipos del campeonato
            </p>
          </div>
          <div className="p-6 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <h2 className="text-xl font-semibold mb-2">Partidos</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Programa y gestiona los partidos
            </p>
          </div>
          <div className="p-6 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <h2 className="text-xl font-semibold mb-2">Tabla de Posiciones</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Visualiza la tabla de posiciones actualizada
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

