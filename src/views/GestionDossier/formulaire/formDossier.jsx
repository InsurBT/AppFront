import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import ageceService from '../../../service/agence-service';
import { useState } from 'react';
import { useEffect } from 'react';
import agenceService from '../../../service/agence-service';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 250,
    },
  },
 
}));

export default function FormFiltre(props) {
  const classes = useStyles();

  const { dossier, setDossier } = props;

  // listes des agences pour le choix de l'agence
  const [agences, setAgences] = useState([]);

  const [medecin, setMedecin] = React.useState('');

  // chargement des agences de l'API
  useEffect(() => {
    agenceService.getAll().then(res => {
      if(typeof res === "string") {
        console.log(res);
      } else {
        setAgences(res);
      }
    })
  }, []);

  return (
      
    <form className={classes.root} noValidate autoComplete="off">
             
      <TextField
        label="N° Dossier"
        value={dossier.numDossier}
        onChange={(e) => {setDossier({...dossier, numDossier: e.target.value})}}
      />
      
      <TextField
        type="date"
        label="Date reception"
        value={dossier.dateReception}
        onChange={(e) => {setDossier({...dossier, dateReception: e.target.value})}}
      />

      <TextField
        type="date"
        label="Date debut de soins"
        value={dossier.debutSoin}
        onChange={(e) => {setDossier({...dossier, debutSoin: e.target.value})}}
      />

      <TextField
        type="date"
        label="Date fin de soins"
        value={dossier.finSoin}
        onChange={(e) => {setDossier({...dossier, finSoin: e.target.value})}}
      />

      <FormControl className={classes.formControl}>
          <InputLabel>Convention</InputLabel>
          <Select
            value={dossier.convention}
            onChange={(e) => {setDossier({...dossier, convention: e.target.value})}}
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value="Maroc">Maroc</MenuItem>
            <MenuItem value="France">France</MenuItem>
            <MenuItem value="Belgique">Belgique</MenuItem>
            <MenuItem value="Mautritanie">Mautritanie</MenuItem>
          </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
          <InputLabel>Agence</InputLabel>
          <Select
            value={dossier.agence}
            onChange={(e) => {setDossier({...dossier, agence: e.target.value})}}
          >
            <MenuItem value=""></MenuItem>
            {
              agences.map(agence => <MenuItem value={agence.label}>{agence.label}</MenuItem>)
            }
          </Select>
      </FormControl>

      <FormControlLabel
        value="start"
        control={<Switch color="primary" minWidth= "300" />}
        label="numerisé aprés enregistrement"
        labelPlacement="start"
      />
      
    </form>    
  );
}