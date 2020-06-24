import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    
    root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    }));
export default function GestionAyantDroit() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Grid container spacing={1}>
        <Grid item xs={6}>
      <Paper  className={classes.paper} elevation={3} >
        
            <TextField  id="standard-basic" label="Immatriculaton" />&nbsp;&nbsp;&nbsp;
            <TextField  id="standard-basic" label="N°d'ordre" />&nbsp;&nbsp;&nbsp;
            
            
            <TextField  id="standard-basic" label="Rang" />&nbsp;
            <TextField  id="standard-basic" label="Lien" />&nbsp;&nbsp;&nbsp;
            
            <TextField  id="standard-basic" label="Nom" />&nbsp;&nbsp;
            <TextField  id="standard-basic" label="Prénom" />&nbsp;&nbsp;&nbsp;
            
           
            <TextField  id="standard-basic" label="date naissance" />&nbsp;&nbsp;
            <TextField  id="standard-basic" label="Sexe" />&nbsp;&nbsp;&nbsp;
           
            <TextField  id="standard-basic" label="CIN" />&nbsp;&nbsp;
            <TextField  id="standard-basic" label="Adresse" />&nbsp;&nbsp;&nbsp;
    
        
     </Paper>
     </Grid> 
     </Grid>
      <Paper elevation={3} >

      </Paper>
    </div>
  );
}