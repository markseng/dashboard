const filterListX = (table, serie) => {
  let newListX = table.map((oldTable) => oldTable[serie.x])
  //// excluindo dados redundantes
  newListX = [...new Set(newListX)]
  let newListY = newListX.map((keyX) => {
    return table.filter((oldTable) => oldTable[serie.x] === keyX)
  })
  return [newListX, newListY]
}

const HandleFiltredY = (newListY, { y }) => {
  const filter = newListY.map((oldTable) => {
    return oldTable.map((row) => row[y])
  })
  return filter
}

const sumListY = (listY) => {
  const newListSumY = listY.map((list) => {
    return list.reduce((a, b) => a + b)
  })
  return newListSumY
}

const handleKeyY = (y, { typeY }) => {
  switch (typeY) {
    case 'percentual':
      return Number((y * 100).toFixed(2))
    default:
      return Number(y.toFixed(2))
  }
}

const HandleAgrupedData = (listX, listY, i) => {
  const agruped = listY.map((keyY, index) => ({
    x: listX[index],
    y: Number(keyY.toFixed(2))
  }))
  return agruped
}

export const useFomatDataPie = (table, serie) => {
  const [newListX, newListY] = filterListX(table, serie)
  const filterY = HandleFiltredY(newListY, serie)
  const sumY = sumListY(filterY)

  const list = newListX.map((keyX, i) => ({
    x: keyX,
    y: handleKeyY(sumY[i], serie)
  }))
  return list
}

const formatLabels = (listSerieX) => listSerieX.map((keyX) => ({ name: keyX }))

export const useFormatDataBar = (table, serie) => {
  const { listY, labelsLegend } = serie
  const [newListX, newListY] = filterListX(table, serie)
  const listFilterY = listY.map((keyY) => HandleFiltredY(newListY, { y: keyY }))
  const listSumY = listFilterY.map((list) => sumListY(list))
  const agruped = listSumY.map((newListY, i) =>
    HandleAgrupedData(newListX, newListY, i)
  )
  const labels = formatLabels(labelsLegend)
  return [agruped, labels]
}
