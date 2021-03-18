import { TableSortLabel } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import {
    VictoryPie, VictoryLegend, VictoryChart, VictoryPolarAxis, VictoryLabel
} from 'victory';
import { useFormatData, useFomatDataPie } from '../hooks/formatData'








const PieChart = ({ table, series }) => {
    const { width, height } = series

    const formatDataPie = useFomatDataPie(table, series)
    const labels = formatDataPie.map(newData => ({ name: newData.x }))
    console.log(formatDataPie)
    return (

        <VictoryChart
            width={width}
            height={height}
            polar
            padding={{ left: width * 0.08, bottom: height * 0.03, right: width * 0.125, top: height * 0.04 }}
            domainPadding={20}
        >
            <VictoryPolarAxis

                dependentAxis
                labelPlacement="vertical"
                style={{ axis: { stroke: "none" } }}
                tickFormat={() => ""}
            />
            <VictoryPie
                data={formatDataPie}
                innerRadius={50}
                colorScale='qualitative'
                labels={({ datum }) => ` ${datum.y}`}
                style={{ labels: { fontSize: 10, padding: 10 } }}
            />
            <VictoryLegend

                colorScale='qualitative'
                data={labels}
                x={width * 0.85} y={0}

                rowGutter={{ top: 0, bottom: 0 }}
                gutter={0}
            />
            <VictoryLabel
                textAnchor="middle"
                style={{ fontSize: 15 }}
                x={width * 0.45} y={height * 0.5}
                text={series.title}
            />

        </VictoryChart>








    )
}
export default PieChart