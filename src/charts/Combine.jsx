import React, { useEffect, useState } from 'react'
import {
    VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack,
    VictoryGroup, VictoryLegend, VictoryLine, VictoryLabel, VictoryScatter, VictoryVoronoiContainer, VictoryTooltip
} from 'victory';
import { useFormatDataBar } from '../hooks/formatData'



const CombineChart = ({ table, series }) => {
    const { width, height } = series
    const { typeSeries } = series
    const [listData, labels] = useFormatDataBar(table, series)

    return (
        <VictoryChart
            width={width}
            height={height}
            domainPadding={20}
            theme={VictoryTheme.material}
            padding={{ left: width * 0.08, bottom: height * 0.03, right: width * 0.125, top: height * 0.03 }}
            containerComponent={<VictoryVoronoiContainer />}
        >

            <VictoryAxis
                tickFormat={(x) => x}
                style={{
                    tickLabels: { fontSize: 10, padding: 1, fontWeight: 'bold', },
                    axisLabel: { fontSize: 10, padding: 25, fontWeight: 'bold', }
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

            <VictoryLegend
                x={width * 0.9} y={0}
                style={{ labels: { fontSize: 10 } }}
                data={labels}
                colorScale="qualitative"
                rowGutter={{ top: 0, bottom: 0 }}
                gutter={0}

            />
            <VictoryGroup
                offset={10}
                style={{ data: { width: 10 } }}
                colorScale="qualitative"

            >
                {typeSeries.map((newSerie, i) => {
                    if (newSerie === 'bar') {
                        return (
                            <VictoryBar
                                key={`${i}bar`}
                                data={listData[i]}
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
                        )
                    } else {
                        return (
                            <VictoryBar
                                key={`${i}bar`}
                                data={[{ x: null, y: null }]}
                            />
                        )
                    }

                })}
            </VictoryGroup>
            <VictoryGroup
                offset={0}
                style={{ data: { width: 10 } }}
                colorScale="qualitative"

            >
                {typeSeries.map((newSerie, i) => {
                    if (newSerie === 'line') {
                        return (
                            <VictoryLine
                                data={listData[i]}
                                key={`line${i}`}
                                colorScale='qualitative'
                                labels={({ datum }) => `${datum.y}`}
                                // labelComponent={
                                //     <VictoryTooltip
                                //         style={{ fontSize: 7 }}
                                //     />
                                // }
                                labelComponent={<VictoryLabel
                                    textAnchor={"start"}
                                    style={{ fontSize: 10 }}
                                    // // textAnchor="end"
                                    dx={-5} dy={7}
                                    angle={0}
                                    verticalAnchor={"start"}
                                />}
                            />
                        )
                    } else {
                        return (
                            <VictoryBar
                                key={`${i}bar`}
                                data={[{ x: null, y: null }]}
                            />
                        )
                    }

                })}
            </VictoryGroup>


        </VictoryChart >
    )
}
export default CombineChart