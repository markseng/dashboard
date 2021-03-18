import React, { useState, useRef } from "react";
import { Drawer, Grid, Button } from "@material-ui/core";
import { SelectInput, SimpleInput } from '../Components/Inputs'


// const optiosTableX = [
//     { value: 'description_sku', label: "SKU", type: 'string' },
//     { value: 'line', label: "Linha", type: 'string' },
//     { value: 'desription_xarope', label: "Xarope", type: 'string' },
//     { value: 'month_year', label: "Més/Ano", type: 'date' },
//     { value: 'day_month_year', label: "Dia", type: 'date' },
// ]


// const optiosTableY = [
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
const typeSeries = [
    { value: 'line', label: 'Linha' },
    { value: 'bar', label: 'Barra' },
]


const DrawerCombine = ({ onSubmit, open, onClose, openFilterDrawer, optiosTableX, optiosTableY }) => {
    const [valuesInputs, setValuesInput] = useState({
        KeyX: '',
        ListKeyY: [""],
        title: '',
        typeSeries: [],
        width: '600',
        height: '600'
    })
    const serieChart = useRef({
        x: "",
        listY: [],
        listTypeY: [],
        title: '',
        chart: 'Combine',
        labelsLegend: [],
        typeSeries: [],
        width: '600',
        height: '600'
    })


    const handleDataKeyX = (value) => {

        serieChart.current.x = value

    }
    const handleDataKeyY = (value, i) => {
        const filterOptions = optiosTableY.filter(row => row.value === value)
        serieChart.current.listY[i] = value
        serieChart.current.listTypeY[i] = filterOptions[0].type
        serieChart.current.labelsLegend[i] = filterOptions[0].label
        console.log(serieChart.current)

    }

    const handleOnChange = ({ target }) => {
        const { name, value } = target
        let newValues = valuesInputs
        newValues[name] = value
        setValuesInput({ ...newValues })
        switch (name) {
            case 'KeyX':
                handleDataKeyX(value)
                break
            case 'KeyY':
                handleDataKeyY(value)
                break
            case 'title':
                serieChart.current.title = value
                break
            default:
                serieChart.current[name] = value
                break

        }
    }

    const handleOnChangeKey = ({ target }, i) => {
        const { value } = target
        let newValues = valuesInputs
        newValues.ListKeyY[i] = value
        setValuesInput({ ...newValues })
        handleDataKeyY(value, i)

    }
    const handleOnChangeTypeChart = ({ target }, i) => {
        const { value } = target
        let newValues = valuesInputs
        newValues.typeSeries[i] = value
        setValuesInput({ ...newValues })
        serieChart.current.typeSeries[i] = value

    }

    const handleAddKey = () => {
        let newValues = valuesInputs
        newValues.ListKeyY.push("")
        setValuesInput({ ...newValues })
    }
    const handleRemoveKey = () => {
        let newValues = valuesInputs
        if (newValues.ListKeyY.length > 1) {
            newValues.ListKeyY.splice(newValues.ListKeyY.length - 1, 1)
        }
        setValuesInput({ ...newValues })

    }

    const handleOnSubmit = (ev) => {
        console.log(serieChart.current)
        onSubmit(serieChart.current)

        ev.preventDefault();
        ev.stopPropagation();

    }

    return (
      
            <Drawer anchor="right" open={open} onClose={onClose}>
                <form onSubmit={handleOnSubmit}>
                    <Grid container style={{ padding: "10px", width: '300px' }} direction='column' spacing={2} >
                        <Grid item xs={12}>
                            <SelectInput
                                listItens={optiosTableX}
                                label="X"
                                onChange={handleOnChange}
                                name='KeyX'
                                value={valuesInputs.KeyX}
                            />
                        </Grid>
                        {
                            valuesInputs.ListKeyY.map((valueInput, i) => (

                                <div key={`DrawerCombine${i}`}>
                                    <Grid item xs={12}>
                                        <SelectInput

                                            listItens={optiosTableY}
                                            label="Y"
                                            onChange={(ev) => handleOnChangeKey(ev, i)}
                                            name='KeyY'
                                            value={valueInput}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <SelectInput

                                            listItens={typeSeries}
                                            label="Série"
                                            onChange={(ev) => handleOnChangeTypeChart(ev, i)}
                                            name='KeyY'
                                            value={valuesInputs.typeSeries[i]}
                                        />
                                    </Grid>
                                </div>







                            ))
                        }

                        <Grid item xs={12}>
                            <Grid container justify='space-between' >
                                <Button onClick={handleAddKey}>
                                    Add
                              </Button>
                                <Button onClick={handleRemoveKey}>
                                    Remove
                              </Button>
                            </Grid>

                        </Grid>
                        <Grid item xs={12}>
                            <SimpleInput
                                label='Largura em px'
                                value={valuesInputs.width}
                                name='width'
                                onChange={handleOnChange}
                            />

                        </Grid>
                        <Grid item xs={12}>
                            <SimpleInput
                                label='Altura em px'
                                value={valuesInputs.height}
                                name='height'
                                onChange={handleOnChange}
                            />

                        </Grid>

                        <Grid item xs={12}>
                            <SimpleInput
                                label='Titulo'
                                value={valuesInputs.title}
                                name='title'
                                onChange={handleOnChange}

                            />

                        </Grid>
                        <Grid item xs={12}>
                            <Button type='submit'>
                                Save
                   </Button>

                        </Grid>

                    </Grid>

                </form>


            </Drawer>
       
    );
};

export default DrawerCombine;
