import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  roo: {
    '& > *': {
      width: 420,
    },
  },
}));

export default function FormFiltre(props) {
  const classes = useStyles();

  const {assure, setAssure} = props;

  return (
    <form className={classes.root} noValidate autoComplete="off">
         
        <TextField
          label="Immatriculation"
          value={assure.imme}
          onChange={ (e) => { setAssure({...assure, imme: e.target.value}) } }
        />
        <TextField
          label="Nom"
          value={assure.nom}
          onChange={ (e) => { setAssure({...assure, nom: e.target.value}) } }
        />
        <TextField
          label="Date naissance"
          value={assure.imme}
          onChange={ (e) => { setAssure({...assure, imme: e.target.value}) } }
        />
        <pre>
        &nbsp;&nbsp;
        </pre>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
      
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date d'couverture"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{ 'aria-label': 'change date',}}  
          /> 
          <TextField id="standard-basic" label="Formulaire d'ouverture de droit" className={classes.roo} />
          <pre>
          &nbsp;&nbsp;
          </pre>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date fin d'couverture"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          
          <TextField id="standard-basic" label="Consomation" />
          <TextField id="standard-basic" label="Date sortie" />
          <pre>
          &nbsp;&nbsp;
          </pre>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Annul couverture"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
      
          <TextField id="standard-basic" label="Consomation famille" />
          <TextField id="standard-basic" label="Lien" />
          <pre>
          &nbsp;&nbsp;
          </pre>
      </MuiPickersUtilsProvider>
      
    </form>
  );
}