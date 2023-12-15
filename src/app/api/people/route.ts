import { PrismaClient, personas } from '@prisma/client'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  const personas = await prisma.personas.findMany()

  return Response.json({ personas })
}

function validatePerson(person: personas) {
  if (
    !person.birth_date ||
    !person.email ||
    !person.first_name ||
    !person.last_name
  )
    throw new Error('The data provided is not a valid person')

  const res = person as Partial<personas>
  delete res.id
  res.birth_date = new Date(res.birth_date ?? '')

  return res
}

export async function POST(request: NextRequest) {
  try {
    const data = validatePerson((await request.json()) as personas)

    const result = await prisma.personas.create({ data })

    return Response.json(result)
  } catch (error) {
    return Response.json({ error: String(error) })
  }
}
