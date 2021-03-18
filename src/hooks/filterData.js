import date from 'date-and-time'

export const dateForMS = (newDate, type) => {
  console.log(newDate, type)
  let parseDate

  switch (type) {
    case 'day_month_year':
      parseDate = date.parse(newDate, 'DD MM YYYY')
      break
    case 'month_year':
      parseDate = date.parse(newDate, 'MM YYYY')
      break
    case 'mmddyyyy':
      parseDate = date.parse(newDate, 'YYYY MM DD')

      break
    case 'yyyymm':
      parseDate = date.parse(newDate, 'YYYY MM')
  }
  //   let parseDateForDays =
  //     parseDate.getDate() +
  //     parseDate.getMonth() * 30 +
  //     parseDate.getFullYear() * 360;
  //     console.log(parseDateForDays - 727561)


  let parseDateForMs = parseDate.getTime()
  
  console.log(parseDateForMs)
  return parseDateForMs
}

const formatComparation = (type, key, value) => {
  switch (type) {
    case 'number':
      return parseFloat(value)
    case 'date':
      return dateForMS(value, key)
    case 'string':
      return value
  }
}

const operetorLogic = ({ reference, comparation, operetor }) =>
  ({
    equal: reference === comparation,
    equalGreater: comparation >= reference,
    equalLess: comparation <= reference,
    greater: comparation > reference,
    less: comparation < reference
  }[operetor])

export const OrLogic = ({
  dataTable,
  comparation,
  operetor,
  totalDays,
  type,
  key
}) => {
  const formatReference =
    type === 'date' ? totalDays : formatComparation(type, key, comparation)
 
  // const comparation = formatComparation(type, key, first);

  const newDataTable = dataTable.filter((data) => {
    const comparationTable = formatComparation(type, key, data[key])
   

    if (
      operetorLogic({
        reference: formatReference,
        operetor: operetor,
        comparation: comparationTable
      })
    ) {
      return data
    }
  })

  const oldTable = dataTable.filter((data) => {
    const comparationTable = formatComparation(type, key, data[key])
    if (
      operetorLogic({
        reference: formatReference,
        operetor: operetor,
        comparation: comparationTable
      })
    ) {
      return data
    }
  })

  return [newDataTable, oldTable]
}

const getNewTable = (dataTable, listFilerLogic) => {
  let tableFilter = []
  let tableNoFilter = []

  listFilerLogic.forEach((propsFilter, i) => {
    const [newDataTable, oldTable] = OrLogic({
      ...propsFilter,
      dataTable: dataTable
    })
    tableFilter = [...tableFilter, ...newDataTable]
    tableNoFilter = [...oldTable]
  })
  console.log(tableFilter)

  return tableFilter
}

const useFilter = (dataTable, listFilters) => {
  const logicPie = listFilters.reduce((results, actualFilters) => {
    return getNewTable(results, actualFilters)
  }, dataTable)

  return logicPie
}
export default useFilter
