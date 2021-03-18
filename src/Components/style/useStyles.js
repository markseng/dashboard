import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            textAlign: 'center',
            paddingTop: theme.spacing(4),
        },
        paper: {
            margin: theme.spacing(3, 3, 2),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

        },
        chart: {
            minWidth: 400
        },
        drawer: {
            minWidth: 300,
            padding: 10

        },
        drawerItem:{
            padding: 5
        },
        containerChart: {
            border: "1px solid black",
            margin: 2
        },
        buttoStyle: {
            background: theme.palette.primary.main,
            margin: 10,
            color: 'white'
            
        },
        buttonDeleteChart:{
          
           

        }

    })

)


export default useStyles