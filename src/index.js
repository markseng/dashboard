import React, { useState, useEffect, useRef } from 'react'
import Chart from './Chart'
import DrawerPie from './Drawers/DrawerPie'
import DrawerBar from './Drawers/DrawerBar'
import DrawerCombine from './Drawers/CombineDrawer'
import DrawerFilter from './Drawers/DrawerFilter'
import DrawerOpenSaveReport from './Drawers/DrawerOpenSaveReport'
import { Grid, Button } from '@material-ui/core'
import { DialogConfirmed } from './Dialog/dialog'
import useStyles from './Components/style/useStyles'

const HomeDashBoard = ({
  dataTable,
  optiosTableX,
  optiosTableY,
  saveReport,
  listReports
}) => {
  const [openFilterDrawer, setFilterDrawer] = useState(false)
  const [openDrawerReport, setOpenDrawerReport] = useState(false)
  const [optiosCharts, setOptionsChart] = useState([])
  const [openDrawerPie, setOpenDrawerPie] = useState(false)
  const [openDrawerBar, setOpenDrawerBar] = useState(false)
  const [openDrawerCombine, setOpenDrawerCombine] = useState(false)
  const [openDialogFilter, setOPenDialogFilter] = useState(false)
  const testeListFilter = useRef([])
  const futureChart = useRef({})
  const nameTable = 'result'
  const classes = useStyles()
  const seriesPie = {
    x: 'description_sku',
    y: 'result_box_teorico',
    typeY: 'number',
    title: 'Perda x Mês',
    chart: 'Pie'
  }

  const serieBar = {
    x: 'description_sku',
    listY: ['result_box_teorico', 'result_co2'],
    listTypeY: ['number', 'number'],
    title: 'Perda x Mês',
    chart: 'Bar',
    labelsLegend: ['Resultado Caixas', 'Resultado Co2']
  }

  const serieCombine = {
    x: 'description_sku',
    listY: ['result_box_teorico', 'result_co2'],
    typeSeries: ['line', 'bar'],
    typeY: 'number',
    title: 'Perda x Mês',
    chart: 'Combine',
    labelsLegend: ['Resultado Caixas', 'Resultado Co2']
  }

  const handleAddChart = (options) => {
    // setOptionsChart([...optiosCharts, { ...options }])
    setOpenDrawerBar(false)
    setOpenDrawerPie(false)
    setOpenDrawerCombine(false)
    setOPenDialogFilter(true)
    futureChart.current = { ...options }
  }

  const handleSetFilter = (listFilter) => {
    let parseTojson = JSON.stringify({ list: [...listFilter] })
    let parrseObj = JSON.parse(parseTojson)

    testeListFilter.current.push([...parrseObj.list])
    //  console.log([...optiosCharts, { ...futureChart.current }])
    setOptionsChart([...optiosCharts, { ...futureChart.current }])
    setFilterDrawer(false)

    // setListFilter([...listFilter])
  }
  const handleCancelOpenDrawerFilter = () => {
    const parserCharToJSON = JSON.stringify(futureChart.current)
    setOPenDialogFilter(false)
    testeListFilter.current.push([])

    setOptionsChart([...optiosCharts, { ...JSON.parse(parserCharToJSON) }])
  }
  const handleConfimedOpenDrawerFilter = () => {
    console.log(testeListFilter.current)
    setOPenDialogFilter(false)
    setFilterDrawer(true)
  }
  const setReports = (newListCharts, newListFilters) => {
    testeListFilter.current = [...newListFilters]
    setOptionsChart([...newListCharts])
    setOpenDrawerReport(false)
  }
  const deleteChart = (index) => {
    let newValue = optiosCharts
    newValue.splice(index, 1)
    testeListFilter.current.splice(index, 1)
    setOptionsChart([...newValue])
    console.log(testeListFilter.current.length, newValue.length)
  }

  return (
    <Grid
      container
      style={{ padding: '10px', maxWidth: '100%' }}
      direction='row'
      spacing={2}
    >
      <Grid item xs={12}>
        <Grid container justify='space-between'>
          <Button
            className={classes.buttoStyle}
            onClick={() => setOpenDrawerPie(true)}
          >
            Pie Chart
          </Button>
          <Button
            className={classes.buttoStyle}
            onClick={() => setOpenDrawerBar(true)}
          >
            Bar Chart
          </Button>
          <Button
            className={classes.buttoStyle}
            onClick={() => setOpenDrawerCombine(true)}
          >
            Combine Chart
          </Button>
          <Button
            className={classes.buttoStyle}
            onClick={() => setOpenDrawerReport(true)}
          >
            Save/Load
          </Button>
        </Grid>
      </Grid>

      {optiosCharts.map((options, i) => (
        <Chart
          dataTable={dataTable}
          deleteChart={() => deleteChart(i)}
          nameTable={nameTable}
          series={options}
          filter={testeListFilter.current[i]}
        />
      ))}

      <DrawerPie
        open={openDrawerPie}
        onClose={() => setOpenDrawerPie(false)}
        onSubmit={handleAddChart}
        optiosTableX={optiosTableX}
        optiosTableY={optiosTableY}
      />
      <DrawerBar
        open={openDrawerBar}
        onClose={() => setOpenDrawerBar(false)}
        onSubmit={handleAddChart}
        optiosTableX={optiosTableX}
        optiosTableY={optiosTableY}
      />
      <DrawerCombine
        open={openDrawerCombine}
        onClose={() => setOpenDrawerCombine(false)}
        onSubmit={handleAddChart}
        optiosTableX={optiosTableX}
        optiosTableY={optiosTableY}
      />
      <DrawerFilter
        open={openFilterDrawer}
        onClose={() => setFilterDrawer(false)}
        setListFilter={handleSetFilter}
        optiosTableX={optiosTableX}
        optiosTableY={optiosTableY}
      />
      <DialogConfirmed
        open={openDialogFilter}
        body='Deseja adicionar algum filtro?'
        onClose={() => {
          setOPenDialogFilter(false)
        }}
        onConfirm={() => handleConfimedOpenDrawerFilter()}
        onCancel={handleCancelOpenDrawerFilter}
      />
      <DrawerOpenSaveReport
        saveReport={saveReport}
        handleClose={() => setOpenDrawerReport(false)}
        open={openDrawerReport}
        listCharts={optiosCharts}
        listFilters={testeListFilter.current}
        setReports={setReports}
        listReports={listReports}
      />
    </Grid>
  )
}

export default HomeDashBoard
