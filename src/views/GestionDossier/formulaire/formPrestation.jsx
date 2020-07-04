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

import prestationService from '../../../service/referentiel/prestation-service';

const useStyles = makeStyles(theme => ({          
    all: {
        marginLeft:"5%",
        marginTop:"5%",
    
    }, 
    root: {
      '& > *': {
        width: 250,  
      },
      margin :"0 20px"
    },
    paper: {
        padding: theme.spacing(2), 
        color: theme.palette.text.secondary,
        display: "flex",
        justifyContent: "space-between"
      }, 
    text:{
        color:'#42a5f5',
        fontSize: 15,

    },
    Button: {
      backgroundColor : '#b3d9ff',
      '&:hover' : {
      backgroundColor : "#1a8cff"
      },
      margin:'0 80px'
    },  
    input:{
      width: '200px',
  },
}));

export default function FormPrestation(props) {
  const classes = useStyles();

  const { prestation, setPrestation, valider, fermer } = props;

  const [choixPrestations, setChoixPrestations] = useState([]);

  useEffect(() => {
    prestationService.getAll().then((res => {
      if (typeof res === "string") {
        console.log(res);
      } else {
        setChoixPrestations(res);
      }
    })).catch(error => { console.log(error); });
  }, []);

  useEffect(() => {
    setPrestation({...prestation, montantRembourse: getMontantRembourse(
      parseFloat(prestation.prestation.tarif),
      parseFloat(prestation.montantEngage),
      parseFloat(prestation.nbrActes),
      parseFloat(prestation.prestation.tauxRemboursement)
    )});
  }, [prestation.prestation, prestation.nbrActes, prestation.montantEngage])

  function getMontantRembourse(tarif, montantEngage, nbrActes, tauxRemboursement) {
    let prix = (tarif > montantEngage) ? montantEngage : tarif;

    return prix * nbrActes * tauxRemboursement / 100;
  }

  return (
    <div className={classes.all} >
      
      <Grid constainer justify="space-between" >
          <Grid item>
            <FormControl className={classes.root}>
                <InputLabel id="demo-simple-select-label">Prestation</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={prestation.prestation.type}
                  onChange={
                    (e) => {
                      if (e.target.value !== "") {
                        setPrestation({
                          ...prestation,
                          prestation: choixPrestations.find((choix) => {
                            return choix.type === e.target.value;
                          })
                        });
                      }
                    }
                  }
                >
                  <MenuItem value=""></MenuItem>
                  {
                    choixPrestations.map(choix => <MenuItem value={choix.type} >{choix.type}</MenuItem>)
                  }
                </Select>
            </FormControl>
          </Grid>
                  
          <Grid item>
            <TextField className={classes.root} value={prestation.prestation.tarif} label="Tarif" />
            <TextField className={classes.root} value={prestation.prestation.tauxRemboursement} label="Taux remboursement" />
          </Grid>

      </Grid>

      <Grid item xs={10}>
          <p className={classes.text}>Decision sur prestation</p>
            <Paper className={classes.paper}>
                    <FormControlLabel
                      value="start"
                      control={
                        <Switch
                          color="primary"
                          minWidth="300"
                          checked={!prestation.remboursable}
                          onChange={(e) => { setPrestation({...prestation, remboursable: !e.target.checked, motif: ""})}}
                        />
                      }
                      label="Non remboursable"
                      labelPlacement="start"
                    />
                    <TextField
                      label="Motif"
                      className={classes.input}
                      disabled={prestation.remboursable}
                      value={prestation.motif}
                      onChange={(e) => {setPrestation({...prestation, motif: e.target.value})}}
                    />
            </Paper>     
      </Grid>

      <TextField
        className={classes.root}
        label="Frais engagés"
        value={prestation.montantEngage}
        onChange={(e) => {setPrestation({...prestation, montantEngage: e.target.value})}}
      />
      <TextField
        className={classes.root}
        label="Nombre d'actes"
        value={prestation.nbrActes}
        onChange={(e) => {setPrestation({...prestation, nbrActes: e.target.value})}}
      />
      <TextField
        className={classes.root}
        value={prestation.montantRembourse}
        label="Mt à rembourser"
        disabled
      />
      
      <Box >
          <Button
            className={classes.Button}
            variant="contained"
            onClick={() => {valider(prestation)}}
          >Valider</Button> 
          <Button className={classes.Button} onclick={fermer} variant="contained">Fermer</Button>
      </Box>
    </div>
  )
}
