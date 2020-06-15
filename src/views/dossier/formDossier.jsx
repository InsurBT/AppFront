import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Box from '@material-ui/core/Box';
const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 250,
    },
  },
 
}));

export default function FormFiltre() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date('2020-06-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [medecin, setMedecin] = React.useState('');

  const handleChange = (event) => {
    setMedecin(event.target.value);
  };

  return (
      
    <form className={classes.root} noValidate autoComplete="off">


          <MuiPickersUtilsProvider utils={DateFnsUtils}  justify="space-around">
              

                   
                    <TextField id="standard-basic" label="N°Dossier" />
                    &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                   
                    <KeyboardDatePicker
                        
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date reception"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <pre>
                    &nbsp;&nbsp;
                    </pre>
             
                
              
                    <KeyboardDatePicker
                        
                        id="date-picker-dialog"
                        label="Date debut de soins"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                       &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date fin de soins"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                
                     <pre></pre>

               
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date début de soins"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />

                     &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;

                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Medecin traitant</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={medecin}
                        onChange={handleChange}
                        >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>

                <pre></pre>
               

                    <FormControlLabel
                        value="start"
                        control={<Switch color="primary" minWidth= "300" />}
                        label="numerisé aprés enregistrement"
                        labelPlacement="start"
                        />
                        <pre></pre>
   
               
                
            </MuiPickersUtilsProvider>
        </form>    
            

            
            
   
  );
}