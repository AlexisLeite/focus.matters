'use client'

import { QueryResultRow, sql } from '@vercel/postgres'
import { signIn, useSession } from 'next-auth/react'

export const SessionRender = ({ rows }: { rows: QueryResultRow[] }) => {
  const { data: session, status } = useSession()

  return (
    <div>
      {' '}
      ClientComponent {status}{' '}
      {status === 'authenticated' && session.user?.name}
      {status === 'unauthenticated' && (
        <button onClick={() => signIn()}>Login</button>
      )}
      {rows?.map((row) => (
        <div key={row.id}>
          {row.id} - {row.first_name} {row.last_name}
          {new Date(row.birth_date).toLocaleString()} {row.email}
        </div>
      ))}
    </div>
  )
}
