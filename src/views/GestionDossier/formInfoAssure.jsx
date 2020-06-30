import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  roo: {
    '& > *': {
      width: 420,
    },
  },
}));

export default function FormFiltre(props) {
  const classes = useStyles();

  const {assure, setAssure} = props;

  return (
    <form className={classes.root} noValidate autoComplete="off">
         
        <TextField
          label="Immatriculation"
          value={assure.imme}
          onChange={ (e) => { setAssure({...assure, imme: e.target.value}) } }
        />
        <TextField
          label="Nom"
          value={assure.nom}
          onChange={ (e) => { setAssure({...assure, nom: e.target.value}) } }
        />
        <TextField
          label="Prenom"
          value={assure.prenom}
          onChange={ (e) => { setAssure({...assure, prenom: e.target.value}) } }
        />
        <TextField
          label="Date de naissance"
          type="date"
          value={assure.dateNaissance}
          onChange={ (e) => { setAssure({...assure, dateNaissance: e.target.value}) } }
        />
      
        <TextField
            label="Date de couverture"
            type="date"
            value={assure.debutCouverture}
            onChange={ (e) => { setAssure({...assure, debutCouverture: e.target.value}) } }
        />
        
        <TextField
          label="Date de fin de couverture"
          type="date"
          value={assure.finCouverture}
          onChange={ (e) => { setAssure({...assure, finCouverture: e.target.value}) } }
        />

        <TextField
          label="Formulaire d'ouverture de droit"
          value={assure.formulaireDroit}
          onChange={ (e) => { setAssure({...assure, formulaireDroit: e.target.value}) } }
        />   
    </form>
  );
}