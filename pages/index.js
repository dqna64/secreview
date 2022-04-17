import Head from 'next/head'
import Image from 'next/image'
import ActorsSection from '../components/ActorsSection'
import styles from '../styles/Home.module.css'

export default function Home(props) {
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

      <main className="w-full px-4 lg:px-12 pb-16 flex flex-col grow min-h-screen max-w-screen-lg">
        <div className="py-8 file:py-8 min-h-screen">
          <h1 className="m-0 leading-tight font-sm text-4xl lg:text-6xl">
            Cybersecurity Incident Review
          </h1>

          <div className="mt-8 lg:mt-[12rem] text-lg lg:text-2xl">
            <p className="my-2">You have analysed</p>
            <p className="my-4 text-5xl lg:text-8xl">9547</p>
            {`cybersecurity incidents from 2004 to today.`}
            <br />
            <br />
            {`Here's what you found.`}
          </div>
        </div>

        <ActorsSection
          actor_types_data={props.actor_types_data}
          actor_varieties_data={props.actor_varieties_data}
          actor_motives_data={props.actor_motives_data}
          actor_countries_data={props.actor_countries_data}
        />
      </main>

      <footer className="w-full px-4 lg:px-12 py-4 flex flex-col border-t border-solid border-grey max-w-screen-lg">
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

export async function getStaticProps() {
  let data
  try {
    const res = await fetch('http://localhost:5000/actor_types_and_varieties')
    data = await res.json()
    // console.log(data)
  } catch (err) {
    console.err(err)
  }

  const actor_types_data = Array()
  const actor_varieties_data = Array()
  if (data) {
    for (let [ actor_type, actor_type_varieties ] of Object.entries(data)) {
      if (actor_type == 'partner') {
        // Actor type "varieties" is an exception; its corersponding value
        // is just a count bc it has no varieties.
        actor_types_data.push({actor_type, count: actor_type_varieties})
          actor_varieties_data.push({actor_type, actor_variety: actor_type, count: actor_type_varieties})
        } else {
        actor_types_data.push({
          actor_type,
          count: Object.values(actor_type_varieties).reduce((partialSum, val) => partialSum + val, 0),
        })
        for (const [ actor_variety, count ] of Object.entries(actor_type_varieties)) {
          actor_varieties_data.push({actor_type, actor_variety, count})
        }
        
      }
      }
    // console.log(actor_types_data)
    // console.log(actor_varieties_data)
  }

  let actor_motives_data;
  try {
    const res = await fetch('http://localhost:5000/actor_motives')
    actor_motives_data = await res.json()

    console.log(actor_motives_data)
  } catch (err) {
    console.err(err)
  }

  let actor_countries_data = {}; // Turns into []
  try {
    const res = await fetch('http://localhost:5000/actor_countries')
    actor_countries_data = await res.json()
    actor_countries_data = Object.entries(actor_countries_data).map(country=> {
      return {id: country[0], value: country[1]}
    })
    console.log(actor_countries_data)
  } catch (err) {
    console.err(err)
  }


  return {
    props: {
      actor_types_data,
      actor_varieties_data,
      actor_motives_data,
      actor_countries_data
    },
  }
}
