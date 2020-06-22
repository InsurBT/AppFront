import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
          width: 250,
        },
      },
      TextField :{
        width: "60%",
      }
      
    }));
  

export default function FormOuvertureDriot() {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(new Date('2020-06-18T21:11:54'));
    const handleDateChange = (date) => {
        setSelectedDate(date);
      };

    const [formulaire, setFormulaire] = React.useState('');

    const handleChangeFormulaire = (event) => {
        setFormulaire(event.target.value);
    };
  
   
    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off" >
            
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Formulaire</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formulaire}
                            onChange={handleChangeFormulaire}
                            >
                            <MenuItem value={10}>1</MenuItem>
                            <MenuItem value={20}>2</MenuItem>
                            <MenuItem value={20}>3</MenuItem>
                            
                        </Select>    
                </FormControl> 
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            
                <TextField className={classes.TextField} id="standard-basic" label="Désignation"  > </TextField>
            
                <pre></pre>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                
                    <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date inscription"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{ 'aria-label': 'change date',}}  
                    /> 
                </MuiPickersUtilsProvider>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                
                    <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date de reception"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{ 'aria-label': 'change date',}}  
                    /> 
                </MuiPickersUtilsProvider>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                
                    <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Debut couverture"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{ 'aria-label': 'change date',}}  
                    /> 
                </MuiPickersUtilsProvider>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                
                    <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Fin couverture"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{ 'aria-label': 'change date',}}  
                    /> 
                </MuiPickersUtilsProvider>
        
            </form>    
            
        </div>
    )
}
