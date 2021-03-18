import React, { useState, useRef } from 'react'
import {
    Drawer, Grid, Button, Card, CardHeader, IconButton, CardContent,
    Divider
} from '@material-ui/core'
import { SimpleInput, SelectInputOperador, SelectInput } from '../Components/Inputs'
import {
    FaGreaterThanEqual, FaGreaterThan, FaRegWindowClose,
    FaLessThanEqual, FaLessThan, FaEquals, FaWindowClose, FaRegSave
} from "react-icons/fa";
import { dateForMS } from '../hooks/filterData'
import useStyles from '../Components/style/useStyles'


// const optiosTable = [
//     { value: 'description_sku', label: "SKU", type: 'string' },
//     { value: 'line', label: "Linha", type: 'string' },
//     { value: 'desription_xarope', label: "Xarope", type: 'string' },
//     { value: 'month_year', label: "Més/Ano", type: 'date' },
//     { value: 'day_month_year', label: "Dia", type: 'date' },
//     { value: 'loss_xarope_teorico', label: "Perda Xarope", type: 'number' },
//     { value: 'loss_co2', label: "Perda Co2", type: 'number' },
//     { value: 'loss_box_teorico', label: "Perda de Caixa", type: 'number' },
//     { value: 'gain_xarope_teorico', label: "Rendimento Xarope", type: 'number' },
//     { value: 'gain_co2', label: "Redimento Co2", type: 'number' },
//     { value: 'loss_box_teorico', label: "Perda de Caixa", type: 'number' },
//     { value: 'gain_box_teorico', label: "Resultado Xarope", type: 'number' },
//     { value: 'result_co2', label: "Resultado Co2", type: 'number' },
//     { value: 'result_box_teorico', label: "Resultado Caixa", type: 'number' },
// ]



const DrawerFilter = ({ open, onClose, keyFilter, setListFilter,  optiosTableX, optiosTableY }) => {

const optiosTable = [...optiosTableX,  ...optiosTableY]

    const { buttoStyle } = useStyles()
    const [filters, setFilters] = useState([
        [
            {

                operetor: 'equal',
                key: '',
                type: '',
                totalDays: null,
                comparation: ""
            },

        ],

    ])




    const validatItens = () => {

        let isValidate = true

        filters.forEach(listItens => {
            listItens.forEach(itensObje => {
                console.log(itensObje)
                Object.values(itensObje).forEach(item => {
                    console.log(item)
                    let verfic = item === "" ? false : true
                    isValidate = isValidate === false ? false : verfic

                })
            })
        })

        return isValidate
    }



    const listOperador = [
        { label: FaEquals, value: 'equal' },
        { label: FaGreaterThan, value: 'greater' },
        { label: FaGreaterThanEqual, value: 'equalGreater' },
        { label: FaLessThan, value: 'less' },
        { label: FaLessThanEqual, value: 'equalLess' },

    ]



    const handleAddOrInputs = (i) => {
        let newsFilters = filters
        newsFilters[i] = [...newsFilters[i], {

            operetor: 'equal',
            key: '',
            type: '',
            totalDays: null,
            comparation: ""
        },]

        setFilters([...newsFilters])
    }

    const handleAddEInputs = () => {
        setFilters([...filters, [
            {
                operetor: 'equal',
                key: '',
                type: '',
                totalDays: null,
                comparation: ""
            }
        ]])
    }
    const removeInput = (indexList, indexKey) => {
        let newsFilters = filters
        if (newsFilters[indexList].length > 1) {
            newsFilters[indexList].splice(indexKey, 1)
        } else if (newsFilters.length > 1) {
            newsFilters.splice(indexList, 1)
        }

        setFilters([...newsFilters])

    }


    const onChangeVariavel = ({ target }, indexList, indexKey) => {
        const { value } = target

        const options = optiosTable.filter(op => op.value === value)[0]

        let newsFilters = filters
        if (options !== null) {
            newsFilters[indexList][indexKey].key = options.value
            newsFilters[indexList][indexKey].type = options.type
        } else {
            newsFilters[indexList][indexKey].key = ""
            newsFilters[indexList][indexKey].type = ""
            newsFilters[indexList][indexKey].comparation = ""
            newsFilters[indexList][indexKey].totalDays = null
        }
        setFilters([...newsFilters])
    }

    const handleChangeValue = (ev, indexList, indexKey) => {
        let newsFilters = filters

        newsFilters[indexList][indexKey].comparation = ev.target.value
        if (newsFilters[indexList][indexKey].type === "date" && newsFilters[indexList][indexKey].key === "month_year") {
         
            newsFilters[indexList][indexKey].totalDays = dateForMS(ev.target.value.slice(0, -3), 'yyyymm')
        } else if (newsFilters[indexList][indexKey].type === "date") {
            newsFilters[indexList][indexKey].totalDays = dateForMS(ev.target.value, 'mmddyyyy')
        }
        setFilters([...newsFilters])
    }


    const handleChangeOperador = (ev, indexList, indexKey) => {

        let newsFilters = filters
        newsFilters[indexList][indexKey].operetor = ev.target.value
        setFilters([...newsFilters])
    }

    const saveFilters = () => {
        console.log(filters)


        if (validatItens()) {
            setListFilter(filters)
            setFilters([
                [{

                    operetor: 'equal',
                    key: '',
                    type: '',
                    totalDays: null,
                    comparation: ""
                }

                ]

            ])
        }


    }





    return (

        <Drawer anchor='bottom' open={open} onClose={onClose}>
            <div style={{ padding: '20px' }}>
                <Grid container
                    justify="flex-end"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item>
                        <IconButton onClick={saveFilters} >
                            <FaRegSave />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton>
                            <FaRegWindowClose onClick={onClose} />
                        </IconButton>
                    </Grid>
                </Grid>
                {
                    filters.map((newListFilters, indexList) => (
                        <Grid key={`${indexList}a`} container spacing={1} alignItems='center' >

                            {
                                newListFilters.map(({ operetor, type, comparation }, indexKey) => (
                                    
                                        <Grid item xs={4} key={`${indexKey}b`}>
                                            <Card>
                                                <CardHeader
                                                    style={{ height: "30px" }}
                                                    action={
                                                        <IconButton onClick={() => removeInput(indexList, indexKey)}>
                                                            <FaWindowClose />
                                                        </IconButton>
                                                    }
                                                />
                                                <CardContent>
                                                    <Grid key={`${indexList}a`} container spacing={1}>
                                                        <Grid item xs>

                                                            <SelectInput
                                                                listItens={optiosTable}
                                                                onChange={(options) => onChangeVariavel(options, indexList, indexKey)}
                                                                label="Variável"
                                                                selectLabel="label"

                                                            />
                                                        </Grid>

                                                        <Grid item xs={3}>
                                                            <SelectInputOperador
                                                                onChange={(ev) => handleChangeOperador(ev, indexList, indexKey)}
                                                                value={operetor}
                                                                listItens={listOperador}
                                                                label={'Operador'}
                                                            />
                                                        </Grid>


                                                        <Grid item xs>
                                                            <SimpleInput
                                                                onChange={(ev) => handleChangeValue(ev, indexList, indexKey)}
                                                                value={comparation}
                                                                name='mensureKeyY'
                                                                label="Valor"
                                                                required={true}
                                                                type={type}

                                                            />
                                                        </Grid>

                                                    </Grid>


                                                </CardContent>
                                            </Card>

                                        </Grid>

                                 




                                ))
                            }



                            <Grid item xs={1}>
                                <Button onClick={() => handleAddOrInputs(indexList)} className={buttoStyle}  >
                                    Ou
                                     </Button>

                            </Grid>
                            <Grid item xs={12} style={{ paddingBottom: '5px' }}>
                                <Divider
                                    variant='fullWidth'
                                />
                            </Grid>

                        </Grid>


                    ))
                }

                <Grid container spacing={1}>
                    <Grid item xs={1}>
                        <Button className={buttoStyle} onClick={handleAddEInputs}  >
                            E
                            </Button>

                    </Grid>

                </Grid>

            </div>






        </Drawer>

    )
}
export default DrawerFilter