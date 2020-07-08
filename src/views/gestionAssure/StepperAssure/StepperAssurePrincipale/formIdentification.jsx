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


export default function FormIdentification(props) {
    const classes = useStyles();
    const {identification,setIdentification}=props;


    return (
        <div className={classes.root}>
            <form >
                <Grid container spacing={1} >
                    
                   <Grid item container justify="space-between" xs="9">
                        <Grid  item >
                            <TextField 
                             id="standard-basic" 
                             label="Nom" 
                             value={identification.nom}
                             onChange={(e) => {setIdentification({...identification, nom: e.target.value})}}
                             />
                        </Grid>

                        <Grid  item  >
                            <TextField 
                             className={classes.textField1} 
                             id="standard-basic" 
                             label="Nom de jeune fille" 
                             value={identification.jeunefille}
                             onChange={(e) => {setIdentification({...identification, jeunefille: e.target.value})}}
                             />
                        </Grid>

                        <Grid  item >
                            <TextField 
                            id="standard-basic"
                            label="Prénom" 
                            value={identification.prenom}
                            onChange={(e) => {setIdentification({...identification, prenom: e.target.value})}}/>
                        </Grid>

                      </Grid>

                   <Grid item container justify="space-between" xs="9">
                        <Grid  item  >
                            <TextField
                            id="standard-basic"
                            label="Age"
                            value={identification.age}
                            onChange={(e) => {setIdentification({...identification, age: e.target.value})}}
                            /> 
                        </Grid>
                        <Grid  itemProp >
                            <TextField  
                            id="standard-basic"
                            label="CIN" 
                            value={identification.CIN}
                            onChange={(e) => {setIdentification({...identification, CIN: e.target.value})}}
                            />
                        </Grid>
                        <Grid  item className={classes.textField} >
                            <TextField 
                            id="standard-basic"
                            label="Passeport N°"
                            value={identification.passeport}
                            onChange={(e) => {setIdentification({...identification, passeport: e.target.value})}} />
                        </Grid>
                   </Grid>

                    
                    <Grid  item container justify="space-between" xs={9} >
                        <Grid item>
                            <FormControl className={classes.formControl}>
                                <InputLabel  id="demo-simple-select-label">Sexe</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={identification.sexe}
                                    onChange={(e) => {setIdentification({...identification, sexe: e.target.value})}}
                                    >
                                    <MenuItem value="homme">Homme</MenuItem>
                                    <MenuItem value="femme">Femme</MenuItem>
                                    
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl className={classes.formControl}>
                                <InputLabel  id="demo-simple-select-label">Nationalité</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={identification.nationnalite}
                                        onChange={(e) => {setIdentification({...identification, nationnalite: e.target.value})}} 
                                        >
                                        <MenuItem value={10}>Maroccaine</MenuItem>
                                        <MenuItem value={20}>Française</MenuItem>
                                        
                                    </Select>
                            </FormControl>    
                        </Grid>
                        <Grid item>
                        <TextField 
                            type="date"
                            id="standard-basic"
                            label="Date de naissance"
                            value={identification.dateNaissance}
                            onChange={(e) => {setIdentification({...identification, dateNaissance: e.target.value})}} 
                        />

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

