import React from 'react'
import {
    VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack,
    VictoryGroup, VictoryLegend, VictoryLabel
} from 'victory';

import { useFormatDataBar } from '../hooks/formatData'


const BarChart = ({ table, series }) => {

    const { width, height } = series
    const dataTeste = [{ x: 'Teste', y: 10 }]
    const [listData, labels] = useFormatDataBar(table, series)
    console.log(labels)


    return (


        <VictoryChart
            width={width}
            height={height}
            domainPadding={20}
            theme={VictoryTheme.material}
            padding={{ left: width * 0.08, bottom: height * 0.03, right: width * 0.125, top: height * 0.04 }}

        >
            <VictoryAxis

                tickFormat={(x) => x}

                style={{
                    tickLabels: { fontSize: 10, padding: 1, fontWeight: 'bold', },
                    axisLabel: { fontSize: 10, padding: 15, fontWeight: 'bold', }
                }}
            />
            <VictoryAxis

                dependentAxis
                tickFormat={(x) => (`${x}`)}
                style={{
                    tickLabels: { fontSize: 10, padding: 1, fontWeight: 'bold', },
                    axisLabel: { fontSize: 10, padding: 25, fontWeight: 'bold', }
                }}

            />
            <VictoryLabel
                textAnchor="middle"
                style={{ fontSize: 15 }}
                x={width * 0.5} y={10}
                text={series.title}

            />

            <VictoryGroup
                offset={10}
                style={{ data: { width: 6 } }}
                colorScale="qualitative"
            >
                {listData.map((data, i) => (
                    <VictoryBar
                        key={i}
                        data={[...data]}
                        labels={({ datum }) => datum.y}
                        style={{ labels: { fill: "black" } }}
                        labelComponent={<VictoryLabel
                            textAnchor={"start"}
                            style={{ fontSize: 10 }}
                            // // textAnchor="end"
                            dx={1} dy={-5}
                            angle={-90}
                            verticalAnchor={"start"}
                        />}


                    />

                ))}



            </VictoryGroup>
            <VictoryLegend
                x={width * 0.9} y={0}
                style={{ labels: { fontSize: 10 } }}
                data={labels}
                colorScale="qualitative"
                rowGutter={{ top: 0, bottom: 0 }}
                gutter={0}

            />


        </VictoryChart>


    )
}

export default BarChart