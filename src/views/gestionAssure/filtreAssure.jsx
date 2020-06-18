import React , {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
      
    GridOne:{
        marginTop:25,
    },
    GriTwo:{
        minWidth: 120,
    }  
    
  }));


export default function FiltreAssure() {
    const classes = useStyles();
    const [agence, setAgence] = useState('');
    const handleChangeAgence = (event) => {
        setAgence(event.target.value);
    };
    const [DRegional, setDRegional] = useState('');
    const handleChangeDRegional = (event) => {
        setDRegional(event.target.value);
    };
    const [convention, setConvention] = useState('');
    const handleChangeConvention = (event) => {
        setConvention(event.target.value);
    };
    const [modepaiment, setModePaiment] = useState('');
    const handleChangeModePaiment = (event) => {
        setModePaiment(event.target.value);
    };
    const [formulaire, setFormulaire] = useState('');
    const handleChangeFormulaire = (event) => {
        setFormulaire(event.target.value);
    };
    const [state, setState] = useState({
        checkedB: true,

      });
    
    const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    };

    const [selectedDate, setSelectedDate] = useState(new Date('2020-06-18T21:11:54'));

    const handleDateChangeDate = (date) => {
      setSelectedDate(date);
    };
  

    return (
        <div className={classes.root}>
            <form >
                <Grid container spacing={2} >
                    
                    <Grid  item xs={3} className={classes.GridOne}>
                        <TextField  id="standard-basic" label="N°immatriculation" />
                        <TextField  id="standard-basic" label="date d'inscription" />
                    </Grid>

                    <Grid  item xs={3}>
                    <Typography color="primary">Assuré principal</Typography>
                        <TextField  id="standard-basic" label="Nom" />
                        <TextField  id="standard-basic" label="Prenom" />
                    </Grid>

                    <Grid  item xs={3}>
                    <Typography color="primary">Ayants droit</Typography>
                        <TextField  id="standard-basic" label="Nom" />
                        <TextField  id="standard-basic" label="Prenom" />
                    </Grid>

                    <pre> </pre>

                    <Grid  item xs={3}>
                    <Typography color="primary"> Agence </Typography>
                       
                            <Select  className={classes.GriTwo}
                               
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={agence}
                                onChange={handleChangeAgence}
                                >
                                <MenuItem value={10}>agence1</MenuItem>
                                <MenuItem value={20}>agence2</MenuItem>
                                <MenuItem value={30}>agence3</MenuItem>
                            </Select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Select  className={classes.GriTwo}
                                
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={DRegional}
                                onChange={handleChangeDRegional}
                                >
                                <MenuItem value={10}>DRegional1</MenuItem>
                                <MenuItem value={20}>DRegional1</MenuItem>
                                <MenuItem value={30}>DRegional1</MenuItem>
                            </Select>
                       
                    </Grid>

                    <Grid  item xs={5}>
                    <Typography color="primary">Convention-Formulaire</Typography>
                           <Select  className={classes.GriTwo}
                                
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={convention}
                                onChange={handleChangeConvention}
                                >
                                <MenuItem value={10}>convention1</MenuItem>
                                <MenuItem value={20}>convention2</MenuItem>
                                <MenuItem value={30}>convention3</MenuItem>
                            </Select>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Select  className={classes.GriTwo}
                                
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={modepaiment}
                                onChange={handleChangeModePaiment}
                                >
                                <MenuItem value={10}>Mode1</MenuItem>
                                <MenuItem value={20}>Mode2</MenuItem>
                                <MenuItem value={30}>Mode3</MenuItem>
                            </Select>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Select  className={classes.GriTwo}
                                
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formulaire}
                                onChange={handleChangeFormulaire}
                                >
                                <MenuItem value={10}>Formulaire</MenuItem>
                                <MenuItem value={20}>Formulaire3</MenuItem>
                                <MenuItem value={30}>Formulaire4</MenuItem>
                            </Select>
                    </Grid>
                  

                    <Grid item xs={12}>

                     <FormControlLabel control={
                            <Checkbox
                                checked={state.checkedB}
                                onChange={handleChange}
                                name="checkedB"
                                color="primary"
                            />
                            }
                            label="Couverture"
                    />
                    </Grid>
                    <Grid item xs={3}>
                       <MuiPickersUtilsProvider utils={DateFnsUtils}>
            
                            <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date debut"
                            value={selectedDate}
                            onChange={handleDateChangeDate}
                            KeyboardButtonProps={{ 'aria-label': 'change date',}}  
                            />
                        </MuiPickersUtilsProvider>

                    </Grid>
                    
                    <Grid item xs={3}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
            
                        <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date fin"
                        value={selectedDate}
                        onChange={handleDateChangeDate}
                        KeyboardButtonProps={{ 'aria-label': 'change date',}}  
                        />
                    </MuiPickersUtilsProvider>

                    </Grid>
                    <Grid>
                        <Button variant="contained" color="primary"> Filtrer</Button>
                    </Grid>
                </Grid>    
             </form>
            
        </div>
    )
}
