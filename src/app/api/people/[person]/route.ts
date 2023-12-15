import { PrismaClient, personas } from '@prisma/client'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

/**
 * Con las importaciones y el uso de Response asumidos como correctos, aquí hay algunas consideraciones sobre tu código:

Control de Tipos en Parámetros: Estás asumiendo que el parámetro person es siempre una cadena que puede convertirse a un número. Sería prudente verificar si la conversión es exitosa antes de proceder con la consulta a la base de datos.

Manejo de Errores para DELETE y PUT: En ambas funciones, estás verificando si person existe, pero no estás verificando si es válido después de convertirlo a un número. Deberías agregar una verificación adicional después de Number.parseInt.

Validación de Datos en PUT: En tu función PUT, realizas una validación para asegurarte de que el id no esté presente en el cuerpo de la solicitud. Esto está bien, pero podrías considerar añadir validaciones adicionales para otros campos que podrían ser necesarios o tener restricciones específicas.

Manejo de Excepciones: Considera agregar bloques try-catch para manejar posibles excepciones que puedan surgir durante las operaciones de la base de datos, especialmente en operaciones como delete y update donde podrían surgir errores si el id proporcionado no existe.

Respuestas HTTP: Asegúrate de que las respuestas HTTP sean consistentes en términos de estructura y códigos de estado. Por ejemplo, cuando un recurso no se encuentra, devolver un código de estado 404 podría ser más adecuado que un 200.

Estas son sugerencias generales basadas en las prácticas estándar de desarrollo de API. La implementación específica puede variar según tus requisitos y el contexto de tu aplicación.
 */

export async function GET(
  request: NextRequest,
  { params: { person } }: { params: { person: string } }
) {
  const result = await prisma.personas.findFirst({
    where: { id: Number.parseInt(person) },
  })

  if (!result) {
    return Response.json({ error: 'Not found' })
  }

  return Response.json(result)
}

export async function DELETE(
  request: unknown,
  { params: { person } }: { params: { person: string } }
) {
  if (!person) return Response.json({ error: 'No id provided' })

  return Response.json(
    await prisma.personas.delete({ where: { id: Number.parseInt(person) } })
  )
}

export async function PUT(
  r: NextRequest,
  { params: { person } }: { params: { person: string } }
) {
  if (!person) return Response.json({ error: 'No id provided' })

  const data = (await r.json()) as Partial<personas>

  if ('id' in data)
    return Response.json({ error: 'You must not provide id in the body' })

  return Response.json(
    await prisma.personas.update({
      where: { id: Number.parseInt(person) },
      data,
    })
  )
}
