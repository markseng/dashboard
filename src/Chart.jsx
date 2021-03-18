
import React, { useEffect, useState } from 'react';

import { AiFillDelete } from "react-icons/ai";
import { IconButton } from '@material-ui/core';
import PieChart from './charts/Pie'
import BarChart from './charts/Bar'
import CombineChart from './charts/Combine'
import useFilter from './hooks/filterData'
const ListCaharts = (chart) => ({
    Pie: PieChart,
    Bar: BarChart,
    Combine: CombineChart,
})[chart]


const Chart = ({ dataTable, series, filter , deleteChart}) => {
   
    const { chart, width, height } = series
    const newTable = dataTable
    const tableFilter = useFilter(newTable, filter)
    

    const CreateChart = ListCaharts(chart)

    return (
     
            <div style={{ width: `${width}px`, height:`${height}px`, padding: '20px' }}>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
                    <IconButton onClick={() => deleteChart()}>
                        <AiFillDelete />
                    </IconButton>
                </div>
                <CreateChart
                    table={tableFilter}
                    series={series}
                />
            </div>

        

    )




}

export default Chart

