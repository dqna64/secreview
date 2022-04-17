import {ResponsiveChoropleth} from '@nivo/geo'
import world_countries from '../data/world_countries.json'
import iso3166 from '../data/iso3166.json'

export default function MyResponsiveChoropleth({data}) {
    let a2a3map = {}
    for (let country of iso3166) {
        a2a3map[country['alpha-2']] = country['alpha-3']}
    const transformedData = data.map(country => ({id: a2a3map[country.id], value: country.value}))
    const maxVal = Math.max(transformedData.map(item => item.value))
    console.log(transformedData);
  return (
<ResponsiveChoropleth
        data={transformedData}
        features={world_countries.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors="nivo"
        domain={[ 0, 100]}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".2s"
        projectionTranslation={[ 0.5, 0.5 ]}
        projectionRotation={[ 0, 0, 0 ]}
        enableGraticule={true}
        graticuleLineColor="#dddddd"
        borderWidth={0.5}
        borderColor="#152538"
        legends={[
            {
                anchor: 'bottom-left',
                direction: 'column',
                justify: true,
                translateX: 20,
                translateY: -100,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                itemTextColor: '#444444',
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000000',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />  )
}