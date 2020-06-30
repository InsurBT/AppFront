import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import { Switch } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
    textField:{
        minWidth: 50,        
    },
    formControl: {
        minWidth: 100
    },
    label : {
        color: 'dodgerblue',
        fontStyle: 'oblique' 
    }
  }));


export default function FormIdentification() {
    const classes = useStyles();
    const [sexe, setSexe] = React.useState('');

    const handleChangeSexe = (event) => {
        setSexe(event.target.value);
    };
    const [nationalite, setNationalite] = React.useState('');

    const handleChangeNationalite = (event) => {
        setNationalite(event.target.value);
    };
    const [selectedDate, setSelectedDate] = useState(new Date('2020-06-18T21:11:54'));

    const handleDateChangeDate = (date) => {
      setSelectedDate(date);
    };


    return (
        <div className={classes.root}>
            <form >
                <Grid container spacing={1} >
                    
                   <Grid item container justify="space-between" xs="9">
                        <Grid  item >
                            <TextField  id="standard-basic" label="Nom" />
                        </Grid>
                        <Grid  item  >
                            <TextField  className={classes.textField1} id="standard-basic" label="Nom de jeune fille" />
                        </Grid>
                        <Grid  item >
                            <TextField   id="standard-basic" label="Prénom" />
                        </Grid>
                   </Grid>

                   <Grid item container justify="space-between" xs="9">
                        <Grid  item  >
                            <TextField  id="standard-basic" label="Age" /> 
                        </Grid>
                        <Grid  itemProp >
                            <TextField  id="standard-basic" label="CIN" />
                        </Grid>
                        <Grid  item className={classes.textField} >
                            <TextField  id="standard-basic" label="Passeport N°" />
                        </Grid>
                   </Grid>

                    
                    <Grid  item container justify="space-between" xs={9} >
                        <Grid item>
                            <FormControl className={classes.formControl}>
                                <InputLabel  id="demo-simple-select-label">Sexe</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={sexe}
                                    onChange={handleChangeSexe}
                                    >
                                    <MenuItem value={10}>Homme</MenuItem>
                                    <MenuItem value={20}>Femme</MenuItem>
                                    
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl className={classes.formControl}>
                                <InputLabel  id="demo-simple-select-label">Nationalité</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={nationalite}
                                        onChange={handleChangeNationalite}
                                        >
                                        <MenuItem value={10}>Maroccaine</MenuItem>
                                        <MenuItem value={20}>Française</MenuItem>
                                        
                                    </Select>
                            </FormControl>    
                        </Grid>
                        <Grid item>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Date de naissance"
                                    value={selectedDate}
                                    onChange={handleDateChangeDate}
                                    KeyboardButtonProps={{ 'aria-label': 'change date',}}  
                                />
                            </MuiPickersUtilsProvider>

                        </Grid>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <FormControlLabel
                            
                            value="start"
                            control={<Switch color="primary" minWidth= "300" />}
                            label="Réside au Maroc"
                            labelPlacement="start"
                        />

                    </Grid>
                </Grid>
            </form> 
        </div>
    )
}
