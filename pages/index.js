import Head from 'next/head'
import Image from 'next/image'
import ActorsSection from '../components/ActorsSection'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Head>
        <title>Secreview</title>
        <meta
          name="description"
          content="Cybersecurity incidents report analysis analytics data breaches compromised systems hacked"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full px-4 lg:px-12 pb-16 flex flex-col grow min-h-screen max-w-screen-xl">
        <div className="py-8 file:py-8 min-h-screen">
          <h1 className="m-0 leading-tight font-sm text-4xl lg:text-6xl">
            Cybersecurity Incident Review
          </h1>

          <div className="mt-8 lg:mt-[12rem] text-lg lg:text-2xl">
            <p className="my-2">You have analysed</p>
            <p className="my-4 text-5xl lg:text-8xl">9547</p>
            cybersecurity incidents from 2004 to today.
            <br /><br />
            {`'Here's what you found.`}
          </div>
        </div>

        <ActorsSection />
      </main>

      <footer className="w-full px-4 lg:px-12 py-4 flex flex-col border-t border-solid border-grey max-w-screen-xl">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
