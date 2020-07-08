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
  

export default function FormOuvertureDriot(props) {
    const classes = useStyles();
    const {ouverture,setOuverture}=props;
   
   
    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off" >
            
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Formulaire</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={ouverture.formulaire}
                            onChange={(e) => {setOuverture({...ouverture, formulaire: e.target.value})}} 
                            >
                            <MenuItem value={10}>Congé</MenuItem>
                            <MenuItem value={20}>Travail</MenuItem>
                            <MenuItem value={20}>Mission</MenuItem>
                            
                        </Select>    
                </FormControl> 
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            
                <TextField
                className={classes.TextField}
                id="standard-basic" 
                label="Désignation"
                value={ouverture.designation}
                onChange={(e) => {setOuverture({...ouverture, designation: e.target.value})}} 
                />
            
               
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField 
                            type="date"
                            id="standard-basic"
                            label="Date de réception"
                            value={ouverture.dateReception}
                            onChange={(e) => {setOuverture({...ouverture, dateReception: e.target.value})}} 
                />
            
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField 
                            type="date"
                            id="standard-basic"
                            label="Debut couverture"
                            value={ouverture.debutCouverture}
                            onChange={(e) => {setOuverture({...ouverture, debutCouverture: e.target.value})}} 
                         
                />
            
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField 
                            type="date"
                            id="standard-basic"
                            label="Fin couverture"
                            value={ouverture.finCouverture}
                            onChange={(e) => {setOuverture({...ouverture, finCouverture: e.target.value})}} 
                />
            
            </form>    
            
        </div>
    )
}
