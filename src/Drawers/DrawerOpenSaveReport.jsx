import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Typography, IconButton, Toolbar, AppBar, Divider, List,
  ListItem, ListItemText, Dialog, Button,
} from '@material-ui/core';
import { AiFillCloseCircle } from "react-icons/ai";
import Slide from '@material-ui/core/Slide';
import { SimpleInput, Textera } from '../Components/Inputs'
// import {getAllRows, saveRow} from '../Components/electronDB/useDataElectron'


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));




const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DrawerOpenSaveReport({ open, handleOpen, handleClose, listCharts, listFilters, setReports, saveReport, listReports }) {

  console.log(listReports)
  const [valuesInput, setValuesInput] = useState({
    title: "",
    desciption: ""
  })
  const [listReportsState, setListReports] = useState([])


  useEffect(() => {
    // const listReports = getAllRows({nameTable: 'reports'})
    setListReports([...listReports])

    return () => {
      setListReports([])
      setValuesInput({
        title: "",
        desciption: ""
      })
    };
  }, [listReports]);

  const classes = useStyles();


  const handleOnChange = (ev) => {
    const { value, name } = ev.target
    let newValue = valuesInput
    newValue[name] = value
    setValuesInput({ ...newValue })

  }


  const handleValidat = () => {
    let isValidate = true
    Object.values(valuesInput).forEach(value => {
      let check = value === "" ? false : true
      isValidate = isValidate === false ? false : check
    })

    return isValidate


  }


  const handleSubmit = () => {
    // console.log( { ListCharts: listCharts, listFilters: listFilters, ...valuesInput })
    if (handleValidat()) {
      const listItemSave = { ListCharts: listCharts, listFilters: listFilters, ...valuesInput }
      setValuesInput({
        title: "",
        desciption: ""
      })
      setListReports([...listReportsState, { ListCharts: listCharts, listFilters: listFilters, ...valuesInput }])
      saveReport( listItemSave )

      handleClose()

    }




  }

  return (
    <div>

      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <AiFillCloseCircle />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Salvar/Carregar Relatório
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmit}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={3}
          style={{ padding: "10px" }}
        >
          <Grid item xs={4}>
            <SimpleInput
              onChange={handleOnChange}
              value={valuesInput.title}
              name='title'
              label="Titulo do relatório"
              required={true}
            />

          </Grid>
          <Grid item xs={4}>

            <Textera
              label="Descrição do Retório"
              value={valuesInput.desciption}
              name="desciption"
              onChange={handleOnChange}

            />
          </Grid>



        </Grid>

        <List>

          {listReportsState.map(({ ListCharts, listFilters, title, desciption }) => (
            <div>
              <ListItem button onClick={() => setReports(ListCharts, listFilters)}>
                <ListItemText primary={title} secondary={desciption} />
              </ListItem>
              <Divider />
            </div>


          ))}
        </List>
      </Dialog>
    </div >
  );
}