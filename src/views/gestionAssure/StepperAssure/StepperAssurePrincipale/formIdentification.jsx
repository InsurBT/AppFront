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
        width: 50,
        marginRight:50,
        
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
    textField2:{
        marginBottom: 20,  
    },
    textField1:{
        width: 290,  
    },
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
                    
                    <Grid  item xs={3} >
                        <TextField  id="standard-basic" label="Nom" />
                    </Grid>
                    <Grid  item xs={6}  >
                        <TextField className={classes.textField1} id="standard-basic" label="Nom de jeune fille" />
                    </Grid>
                    <pre> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</pre>
                    <Grid  item xs={3} >
                        <TextField  id="standard-basic" label="Prénom" />
                    </Grid>
                    <Grid  item xs={8} >
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Sexe</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={sexe}
                                    onChange={handleChangeSexe}
                                    >
                                    <MenuItem value={10}>Homme</MenuItem>
                                    <MenuItem value={20}>Femme</MenuItem>
                                    
                                </Select>
                        </FormControl>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Nationalité</InputLabel>
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
                    <Grid item xs={3}>
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
                    <Grid  item xs={2}  >
                        <TextField className={classes.textField} id="standard-basic" label="Age" />
                        
                    </Grid>
                    <Grid  item xs={6} >
                        <TextField className={classes.textField} id="standard-basic" label="CIN" />
                    </Grid>
                    <Grid  item xs={3} className={classes.textField2} >
                        <TextField  id="standard-basic" label="Passeport N°" />
                    </Grid>&nbsp;&nbsp;&nbsp;
                    <Grid item xs={3}>
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
