import styles from './page.module.css'
import { AppSessionProvider } from '../../components/session/AppSessionProvider'
import { SessionRender } from '../../components/test/SessionRender'
import { sql } from '@vercel/postgres'
import { PrismaClient } from '@prisma/client'

export default async function Home({ params }: { params: { user: string } }) {
  const rows = await new PrismaClient().personas.findMany()

  return (
    <AppSessionProvider>
      <main className={styles.main}>
        <SessionRender rows={rows} />
      </main>
    </AppSessionProvider>
  )
}
