import { Team } from '@/types'

interface TeamCardProps {
  team: Team
}

export default function TeamCard({ team }: TeamCardProps) {
  return (
    <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
      {team.logo && (
        <div className="mb-4">
          <img
            src={team.logo}
            alt={`Logo de ${team.name}`}
            className="w-16 h-16 object-contain mx-auto"
          />
        </div>
      )}
      <h3 className="text-xl font-semibold text-center mb-2">{team.name}</h3>
      <div className="text-sm text-gray-500 text-center">
        Creado: {new Date(team.createdAt).toLocaleDateString('es-ES')}
      </div>
    </div>
  )
}

