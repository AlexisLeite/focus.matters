import styles from './page.module.css'
import { AppSessionProvider } from '../../components/session/AppSessionProvider'
import { SessionRender } from '../../components/test/SessionRender'
import { sql } from '@vercel/postgres'

export default async function Home({ params }: { params: { user: string } }) {
  const { rows } = await sql`select * from personas`

  return (
    <AppSessionProvider>
      <main className={styles.main}>
        <SessionRender rows={rows} />
      </main>
    </AppSessionProvider>
  )
}
