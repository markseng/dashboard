import React, { useState, useRef } from "react";
import { Drawer, Grid, Button } from "@material-ui/core";
import { SelectInput, SimpleInput } from '../Components/Inputs'



// const optiosTable = [

//     { value: 'description_sku', label: "SKU", type: 'string' },
//     { value: 'line', label: "Linha", type: 'string' },
//     { value: 'desription_xarope', label: "Xarope", type: 'string' },
//     { value: 'month_year', label: "Més/Ano", type: 'date' },
//     { value: 'day_month_year', label: "Dia", type: 'date' },
//     { value: 'loss_xarope_teorico', label: "Perda Xarope", type: 'number' },
//     { value: 'loss_co2', label: "Perda Co2", type: 'number' },

// ]

const DrawerPie = ({ onSubmit, open, onClose, openFilterDrawer, optiosTableX, optiosTableY}) => {
    const optiosTable = [...optiosTableX, ...optiosTableY]
    const [valuesInputs, setValuesInput] = useState({
        KeyX: '',
        KeyY: '',
        title: '',
        width: '600',
        height: '600'

    })
    const serieChart = useRef({
        x: "",
        y: "",
        typeY: '',
        title: '',
        chart: 'Pie',
        width: '600',
        height: '600'
    })


    const handleDataKeyX = (value) => {

        serieChart.current.x = value

    }
    const handleDataKeyY = value => {
        const filterOptions = optiosTable.filter(row => row.value === value)
        serieChart.current.y = value
        serieChart.current.typeY = filterOptions[0].type
        console.log(serieChart)

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
    const handleOnSubmit = (ev) => {
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
                        <Grid item xs={12}>
                            <SelectInput
                                listItens={optiosTableY}
                                label="Y"
                                onChange={handleOnChange}
                                name='KeyY'
                                value={valuesInputs.KeyY}
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
                            <Button type='submit'>
                                Save
                   </Button>

                        </Grid>

                    </Grid>

                </form>


            </Drawer>
     
    );
};

export default DrawerPie;
