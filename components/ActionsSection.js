import { SectionContainer, SectionTitle } from '../styled/Section'
import { useMemo } from 'react'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Legend } from 'recharts'
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

const objSum = (obj) => Object.values(obj).reduce((partialsum, a) => partialsum + a, 0)

export default function ActionsSection({ action_types_and_varieties_data }) {
  const types_and_vars_sorted = useMemo(
    () =>
      Object.entries(action_types_and_varieties_data).sort((a, b) => objSum(b[1]) - objSum(a[1])),
    [action_types_and_varieties_data],
  )
  const actor_types_cumulative = useMemo(
    () => types_and_vars_sorted.map(([type, varieties]) => ({ type, count: objSum(varieties) })),
    [types_and_vars_sorted],
  )
  console.log(actor_types_cumulative)
  return (
    <SectionContainer>
      <SectionTitle>Actions</SectionTitle>
      <p>In what form was the cybersecurity breach enacted?</p>
      <br />
      <BarChart
        width={730}
        height={350}
        data={actor_types_cumulative.filter(
          (item) => !['environmental', 'unknown'].includes(item.type),
        )}
        layout={'horizontal'}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="type" />
        <YAxis dataKey="count" type="number" />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
      {types_and_vars_sorted
        .filter((item) => item[0] !== 'unknown')
        .map(([type, varieties]) => (
          <div className="mt-6" key={type}>
            <h3 className="text-2xl">{`${objSum(varieties)} incidents were due to ${type}`}</h3>
            <TableContainer className="mt-2">
              <Table variant="simple" size="sm">
                <TableCaption>{`Number of incidents due to each ${type} variety.`}</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Variety</Th>
                    <Th isNumeric>Number</Th>
                    <Th isNumeric>Percentage</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {Object.entries(varieties)
                    .sort((a, b) => b[1] - a[1])
                    .map(([variety, count]) => {
                      const percentage = Math.round((10000 * count) / objSum(varieties)) / 100
                      if (type !== 'unknown' && count > 0 && percentage > 1) {
                        return (
                          <Tr key={variety}>
                            <Td>{variety}</Td>
                            <Td isNumeric>{count}</Td>
                            <Td isNumeric>{`${percentage}%`}</Td>
                          </Tr>
                        )
                      } else {
                        return null
                      }
                    })}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        ))}
    </SectionContainer>
  )
}
