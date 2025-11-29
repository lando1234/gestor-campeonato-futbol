// Tipos globales del proyecto

export type Team = {
  id: string
  name: string
  logo?: string
  createdAt: Date
  updatedAt: Date
}

export type Player = {
  id: string
  name: string
  number: number
  position: string
  teamId: string
  createdAt: Date
  updatedAt: Date
}

export type Match = {
  id: string
  homeTeamId: string
  awayTeamId: string
  homeScore?: number
  awayScore?: number
  date: Date
  location?: string
  status: 'scheduled' | 'in_progress' | 'finished' | 'cancelled'
  createdAt: Date
  updatedAt: Date
}

export type MatchStatus = 'scheduled' | 'in_progress' | 'finished' | 'cancelled'

