import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/teams - Obtener todos los equipos
export async function GET() {
  try {
    const teams = await prisma.team.findMany({
      include: {
        players: true,
        homeMatches: true,
        awayMatches: true,
      },
    })
    return NextResponse.json(teams)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener equipos' },
      { status: 500 }
    )
  }
}

// POST /api/teams - Crear un nuevo equipo
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, logo } = body

    if (!name) {
      return NextResponse.json(
        { error: 'El nombre es requerido' },
        { status: 400 }
      )
    }

    const team = await prisma.team.create({
      data: {
        name,
        logo,
      },
    })

    return NextResponse.json(team, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al crear equipo' },
      { status: 500 }
    )
  }
}

