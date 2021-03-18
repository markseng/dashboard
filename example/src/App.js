import React from 'react'

import Dashboard from 'dashboard-with-victoriachart'
import 'dashboard-with-victoriachart/dist/index.css'

const dataTable = [
  {
    less: Math.floor(Math.random() * 100) ,
    gain: Math.floor(Math.random() * 100) + 10,
    month_year: '01/2021'
  },
  {
    less: Math.floor(Math.random() * 100) + 10,
    gain: Math.floor(Math.random() * 100) + 10,
    month_year: '02/2021'
  },
  {
    less: Math.floor(Math.random() * 100) + 10,
    gain: Math.floor(Math.random() * 100) + 10,
    month_year: '03/2021'
  },
  {
    less: Math.floor(Math.random() * 100) + 10,
    gain: Math.floor(Math.random() * 100) + 10,
    month_year: '04/2021'
  },
  {
    less: Math.floor(Math.random() * 100) + 10,
    gain: Math.floor(Math.random() * 100) + 10,
    month_year: '05/2021'
  },
  {
    less: Math.floor(Math.random() * 100) + 10,
    gain: Math.floor(Math.random() * 100) + 10,
    month_year: '06/2021'
  },
  {
    less: Math.floor(Math.random() * 100) + 10,
    gain: Math.floor(Math.random() * 100) + 10,
    month_year: '07/2021'
  },
  {
    less: Math.floor(Math.random() * 100) + 10,
    gain: Math.floor(Math.random() * 100) + 10,
    month_year: '08/2021'
  },
  {
    less: Math.floor(Math.random() * 100) + 10,
    gain: Math.floor(Math.random() * 100) + 10,
    month_year: '09/2021'
  }
]
const optiosTableX = [{ value: 'month_year', label: 'Més/Ano', type: 'date' }]
const optiosTableY = [
  { value: 'less', label: 'Ganho', type: 'number' },
  { value: 'gain', label: 'Perda', type: 'number' }
]

const listReports = [
  {
    ListCharts: [
      {
        x: 'month_year',
        y: 'less',
        typeY: 'number',
        title: 'Teste',
        chart: 'Pie',
        width: '600',
        height: '600'
      }
    ],
    listFilters: [
      [
        [
          {
            operetor: 'greater',
            key: 'month_year',
            type: 'date',
            totalDays: 1614567600000,
            comparation: '2021-03-16'
          }
        ]
      ]
    ],
    title: 'Teste',
    desciption: 'description teste'
  },
  {
    ListCharts: [
      {
        x: 'month_year',
        listY: ['less'],
        listTypeY: ['number'],
        title: 'Teste',
        chart: 'Bar',
        labelsLegend: ['Ganho'],
        width: '600',
        height: '600'
      },
      {
        x: 'month_year',
        listY: ['less', 'gain'],
        listTypeY: ['number', 'number'],
        title: 'Teste',
        chart: 'Combine',
        labelsLegend: ['Ganho', 'Perda'],
        typeSeries: ['bar', 'line'],
        width: '600',
        height: '600'
      }
    ],
    listFilters: [[], []],
    title: 'Teste 2',
    desciption: 'description tese 2'
  }
]

const App = () => {
  console.log(dataTable)
  const saveReport = (data) => {
    console.log(data)
  }
  return (
    <Dashboard
      listReports={listReports}
      optiosTableX={optiosTableX}
      optiosTableY={optiosTableY}
      dataTable={dataTable}
      saveReport={saveReport}
    />
  )
}

export default App
