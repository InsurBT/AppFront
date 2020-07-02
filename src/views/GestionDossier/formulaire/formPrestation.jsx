import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import Input from '@material-ui/core/Input';

import prestationService from '../../../service/prestation-service';

const useStyles = makeStyles(theme => ({          
    all: {
        marginLeft:"5%",
        marginTop:"5%",
    
    }, 
    root: {
      '& > *': {
        width: 250,  
      },
    },
    paper: {
        padding: theme.spacing(2), 
        color: theme.palette.text.secondary,
      
      }, 
    text:{
        color:'#42a5f5',
        fontSize: 15,

    },
    Button: {
      '& > *': {
        margin: theme.spacing(8),
      },
    },  
    input:{
      width: 320,

  },
}));

export default function FormPrestation(props) {
  const classes = useStyles();

  const {prestation, setPrestation} = props;

  const [choixPrestations, setChoixPrestations] = useState([]);

  useEffect(() => {
    prestationService.getAll().then((res => {
      if (typeof res === "string") {
        console.log(res);
      } else {
        setChoixPrestations(res);
      }
    })).catch(error => { console.log(error); });
  }, [])

  return (
    <div className={classes.all} >
      
      <Grid constainer justify="space-between" >
          <Grid item>
            <FormControl className={classes.root}>
                <InputLabel id="demo-simple-select-label">Prestation</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={prestation.prestation}
                    onChange={(e) => {setPrestation({...prestation, prestation: e.target.value})}}
                  >
                    <MenuItem value=""></MenuItem>
                    {
                      choixPrestations.map(choix => <MenuItem value={choix.type} >{choix.type}</MenuItem>)
                    }
                  </Select>
            </FormControl>
          </Grid>
                  
          <Grid item>
            <FormControl className={classes.root}>
              <InputLabel id="demo-simple-select-label">Cotation</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={""}
                    onChange={() => {}}
                    >
                    <MenuItem value={10}>10%</MenuItem>
                    <MenuItem value={20}>20%</MenuItem>
                    <MenuItem value={30}>30%</MenuItem>
                </Select>
            </FormControl>
          </Grid>
                  
          <Grid item>
            <TextField className={classes.root} label="Tarif" />
          </Grid>
            
          <Grid item>
            <TextField className={classes.root} label="Taux remboursement" />
          </Grid>

      </Grid>

      <Grid item xs={10}>
          <p className={classes.text}>Decision sur prestation</p>
            <Paper className={classes.paper}>
                    <FormControlLabel
                            value="start"
                            control={<Switch color="primary" minWidth= "300" />}
                            label="Non remboursable"
                            labelPlacement="start"
                    />
                      
                    <Input placeholder="Motif" inputProps={{ 'aria-label': 'description' }} className={classes.input} />

            </Paper>     
      </Grid>

      <TextField
        label="Frais engagés"
        value={prestation.montantEngage}
        onChange={(e) => {setPrestation({...prestation, montantEngage: e.target.value})}}
      />
      <TextField
        label="Nombre d'actes"
        value={prestation.nbrActes}
        onChange={(e) => {setPrestation({...prestation, nbrActes: e.target.value})}}
      />
      <TextField label="Mt à rembourser" />

                  
      <Box className={classes.Button}>
          <Button variant="contained">Valider</Button> 
          <Button variant="contained">Quiter</Button>
      </Box>
          
    </div>
  )
}
