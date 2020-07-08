import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Box, Typography, CardActions } from '@material-ui/core';

import 'date-fns';


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

export default function FormMandataire(props) {
  const classes = useStyles();

  const { mandataire, setMandataire, valider, fermer  ,setOptionsVille,optionsVille} = props;



  return (
    <div className={classes.all} >
      
      <Grid constainer justify="space-between" >
          <Grid item>
            <TextField
                className={classes.root}
                label="Nom"
                value={mandataire.nom}
                onChange={(e) => {setMandataire({...mandataire, nom: e.target.value})}}
            />
            <TextField
                className={classes.root}
                label="Prénom"
                value={mandataire.prenom}
                onChange={(e) => {setMandataire({...mandataire, prenom: e.target.value})}}
            />
            <TextField
                className={classes.root}
                value={mandataire.CIN}
                label="CIN"
                onChange={(e) => {setMandataire({...mandataire, CIN: e.target.value})}}

            />
            <TextField
                className={classes.root}
                value={mandataire.lienDeparente}
                label="Lien de parenté"
                onChange={(e) => {setMandataire({...mandataire, lienDeparente: e.target.value})}}

            />
          
             <TextField
                            className={classes.root}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Ville"
                            value={mandataire.id}
                            onChange={(e) => {setMandataire({
                                ...mandataire,
                                id: e.target.value,
                                ville: optionsVille.find(ville => ville.id === e.target.value).nom
                            })}
                            }
                            select
                            >
                             {
                                    optionsVille.map(villes => {
                                        return <MenuItem value={villes.id} selected={villes.nom === mandataire.ville}>
                                            {villes.nom}
                                        </MenuItem>
                                    })
                            }
            </TextField>
            
             <TextField
                className={classes.root}
                value={mandataire.adresse}
                label="Adresse"
                onChange={(e) => {setMandataire({...mandataire, adresse: e.target.value})}}

            />
             <TextField
                className={classes.root}
                value={mandataire.codepostal}
                label="Code postal"
                onChange={(e) => {setMandataire({...mandataire, codepostal: e.target.value})}}

            />
            
            <TextField
                className={classes.root}
                value={mandataire.rang}
                label="Rang"
                onChange={(e) => {setMandataire({...mandataire, ImmCNSS: e.target.value})}}

            />
              <TextField
                type="date"
                className={classes.root}
                value={mandataire.datedebut}
                label="Date debut"
                onChange={(e) => {setMandataire({...mandataire, datedebut: e.target.value})}}

            />
           
              
            <TextField
                type="date"
                className={classes.root}
                value={mandataire.datefin}
                label="Date fin"
                onChange={(e) => {setMandataire({...mandataire, datefin: e.target.value})}}

            />
     
            <TextField
                className={classes.root}
                value={mandataire.mode}
                label="Mode de remboursement"
                onChange={(e) => {setMandataire({...mandataire, mode: e.target.value})}}
                select

            >
             <MenuItem value="Virement">Virement</MenuItem>
             <MenuItem value="cheque">Par chèque</MenuItem>
            </TextField>

            <TextField
                className={classes.root}
                value={mandataire.RIB}
                label="RIB"
                onChange={(e) => {setMandataire({...mandataire, RIB: e.target.value})}}

            />


       
           
            
         
           <CardActions>
               <Box>
          <Button
            className={classes.Button}
            variant="contained"
            onClick={() => {valider(mandataire)}}
          >Valider</Button> 
          <Button className={classes.Button} onclick={fermer} variant="contained">Fermer</Button>
          </Box>
          </CardActions>   
 
      </Grid>
      </Grid>
    </div>
  )
}
