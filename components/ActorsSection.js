import { SectionContainer, SectionTitle } from '../pages/Section'
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'
import styled from '@emotion/styled'
import { useMemo } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import dynamic from 'next/dynamic'

const ActorTypeCardTitle = styled.h3`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
`

const ActorTypeCardPara = styled.p`
  text-align: center;
`

const MyResponsiveChoropleth = dynamic(() => import('./ResponsiveChoropleth'), {ssr:false})


export default function ActorsSection({
  actor_types_data,
  actor_varieties_data,
  actor_motives_data,
  actor_countries_data,
}) {
  // console.log(actor_types_data)
  // console.log(actor_varieties_data)
  const external_varieties_sorted = useMemo(
    () =>
      actor_varieties_data
        .filter((item) => item.actor_type === 'external')
        .sort((a, b) => b.count - a.count),
    [actor_varieties_data],
  )
  const total_external_variety_count = useMemo(
    () => external_varieties_sorted.reduce((partialsum, a) => partialsum + a.count, 0),
    [external_varieties_sorted],
  )
  const internal_varieties_sorted = useMemo(
    () =>
      actor_varieties_data
        .filter((item) => item.actor_type === 'internal')
        .sort((a, b) => b.count - a.count),
    [actor_varieties_data],
  )
  const total_internal_variety_count = useMemo(
    () => internal_varieties_sorted.reduce((partialsum, a) => partialsum + a.count, 0),
    [internal_varieties_sorted],
  )

    console.log("hfdsjfdks")
  console.log(actor_motives_data)
  const actor_motives_sorted_arr = useMemo(
    () => Object.entries(actor_motives_data).sort((a, b) => b[1] - a[1]),
    [actor_motives_data],
  )

  const actor_countries = actor_countries_data

  return (
    <SectionContainer>
      <SectionTitle>Threat Actors</SectionTitle>
      <h3 className="text-2xl">Who or what was the cause for cybersecurity breaches?</h3>
      <br />
      <p>
        Entities that cause or contribute to an incident are referred to as threat actors. Each
        incident can have one or more actors and they could be acting with malicious or
        non-malicious intent, or even unintentionally.
      </p>
      <br />
      <p>
        VERIS recognises three primary categories of threat actors: External, Internal, and Partner.
      </p>
      <br />
      <div className=" space-y-4 md:space-y-0 md:space-x-8 md:grid md:grid-cols-3">
        <div className="p-4 rounded-md bg-gradient-to-br from-blue-100 to-blue-200">
          <ActorTypeCardTitle>External</ActorTypeCardTitle>
          <ActorTypeCardPara>
            External actors originate from outside the victim organisation and its network of
            partners. They typically have no pre-existing trust or privilege granted by the victim,
            although they can of course obtain these via unsolicited means.
          </ActorTypeCardPara>
          <br />
          <p className="text-center">Most common external threat actors:</p>
          <ol>
            {external_varieties_sorted
              .filter((item) => !['Unknown', 'Other', 'Unaffiliated'].includes(item.actor_variety))
              .slice(0, 3)
              .map((item) => (
                <li className="font-bold text-center" key={item.actor_variety}>{`${
                  item.actor_variety
                } (${Math.round((100 * item.count) / total_external_variety_count)}%)`}</li>
              ))}
          </ol>
        </div>
        <div className="p-4 rounded-md bg-gradient-to-br from-blue-100 to-blue-200">
          <ActorTypeCardTitle>Internal</ActorTypeCardTitle>
          <ActorTypeCardPara>
            Internal actors, also known as insiders, are those originating from within the victim
            organisation. Typically they are trusted and have privileges or insider knowledge which
            they exploit, whether intentional or not in their attack.
          </ActorTypeCardPara>
          <br />
          <p className="text-center">Most common internal threat actors:</p>
          <ol>
            {internal_varieties_sorted
              .filter((item) => !['Unknown', 'Other', 'Unaffiliated'].includes(item.actor_variety))
              .slice(0, 3)
              .map((item) => (
                <li className="font-bold text-center" key={item.actor_variety}>{`${
                  item.actor_variety
                } (${Math.round((100 * item.count) / total_internal_variety_count)}%)`}</li>
              ))}
          </ol>
        </div>
        <div className="p-4 rounded-md bg-gradient-to-br from-blue-100 to-blue-200">
          <ActorTypeCardTitle>Partner</ActorTypeCardTitle>
          <ActorTypeCardPara>
            Partner actors are affliated with the victim organisation in some way, usually in
            business. This includes suppliers, vendors, cloud providers, outsourced development etc.
            They typically have a limited amount of trust and privileged.
          </ActorTypeCardPara>
        </div>
      </div>
      <div className="w-full h-80">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={actor_types_data}
              nameKey="actor_type"
              dataKey="count"
              cx="50%"
              cy="50%"
              outerRadius={50}
              fill="#8884d8"
            />
            <Pie
              data={actor_varieties_data}
              nameKey="actor_variety"
              dataKey="count"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#82ca9d"
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <h3 className="text-2xl">Motivations</h3>
      <p>What are the motives behind threat actors committing cyber attacks?</p>
      <br />
      <TableContainer>
        <Table variant="simple" size="sm">
          <TableCaption>Number of threat actors with each motive type</TableCaption>
          <Thead>
            <Tr>
              <Th>Motive</Th>
              <Th isNumeric>Number</Th>
              <Th isNumeric>Percentage</Th>
            </Tr>
          </Thead>
          <Tbody>
            {actor_motives_sorted_arr.map(([motive, count]) => (
              <Tr key={motive}>
                <Td>{motive}</Td>
                <Td isNumeric>{count}</Td>
                <Td isNumeric>{`${
                  Math.round(
                    (10000 * count) / actor_motives_sorted_arr.reduce((sum, a) => sum + a[1], 0),
                  ) / 100
                }%`}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <h3 className="text-2xl">Country</h3>
      <p>Which countries do threat actors hail from?</p>
      <br />
      <div className="w-full h-80">
      <MyResponsiveChoropleth data={actor_countries_data}/>
      </div>
    </SectionContainer>
  )
}


// const actor_types_data = [
//   {
//     actor_type: 'external',
//     count: 234,
//   },
//   { actor_type: 'internal', count: 542 },
//   { actor_type: 'partner', count: 261 },

// ]

// const actor_varieties_data = [
//   {
//     actor_variety: 'activist',
//     actor_variety_label: 'Activist',
//     count: 115,
//   },
//   {
//     actor_variety: 'competitor',
//     actor_variety_label: 'Competitor',
//     count: 119,
//   },
//   {
//      actor_variety: 'cashier',
//      actor_variety_label: 'Cashier',
//   count: 258 },
//   {
//      actor_variety: 'end-user',
//      actor_variety_label: 'End-user',
//   count: 284 },
//   {
//      actor_variety: 'partner',
//      actor_variety_label: 'Partner',
//   count: 261 },
// ]

const actor_motives = {
  Fear: 8,
  Secondary: 17,
  Convenience: 102,
  Unknown: 2452,
  NA: 2487,
  Fun: 523,
  Ideology: 413,
  Espionage: 387,
  Other: 71,
  Grudge: 191,
  Financial: 3109,
}
