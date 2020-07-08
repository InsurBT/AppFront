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

export default function FormAyantDroit(props) {
  const classes = useStyles();

  const { ayantDroit, setAyantDroit, valider, fermer ,options ,setOptions,optionsVille,setOptionsVille} = props;



  return (
    <div className={classes.all} >
      
      <Grid constainer justify="space-between" >
          <Grid item>
            <TextField
                className={classes.root}
                label="Nom"
                value={ayantDroit.nom}
                onChange={(e) => {setAyantDroit({...ayantDroit, nom: e.target.value})}}
            />
            <TextField
                className={classes.root}
                label="Prénom"
                value={ayantDroit.prenom}
                onChange={(e) => {setAyantDroit({...ayantDroit, prenom: e.target.value})}}
            />
            <TextField
                className={classes.root}
                value={ayantDroit.nomJeuneFille}
                label="Nom jeune fille"
                onChange={(e) => {setAyantDroit({...ayantDroit, nomJeuneFille: e.target.value})}}

            />
            <TextField
                className={classes.root}
                value={ayantDroit.lienDeparente}
                label="Lien de parenté"
                onChange={(e) => {setAyantDroit({...ayantDroit, lienDeparente: e.target.value})}}

            />
            <TextField
                className={classes.root}
                value={ayantDroit.CIN}
                label="CIN"
                onChange={(e) => {setAyantDroit({...ayantDroit, CIN: e.target.value})}}

            />
             <TextField
                className={classes.root}
                value={ayantDroit.sexe}
                label="Sexe"
                onChange={(e) => {setAyantDroit({...ayantDroit, sexe: e.target.value})}}

            />
            
              <TextField
                type="date"
                className={classes.root}
                value={ayantDroit.DateNaissance}
                label="Date naissance"
                onChange={(e) => {setAyantDroit({...ayantDroit, DateNaissance: e.target.value})}}

            />
           
              
              <TextField
                type="date"
                className={classes.root}
                value={ayantDroit.DateInscription}
                label="Date inscription"
                onChange={(e) => {setAyantDroit({...ayantDroit, DateInscription: e.target.value})}}

            />
     
            <TextField
                className={classes.root}
                value={ayantDroit.age}
                label="Age"
                onChange={(e) => {setAyantDroit({...ayantDroit, age: e.target.value})}}

            />
              <TextField
                className={classes.root}
                value={ayantDroit.status}
                label="Status"
                onChange={(e) => {setAyantDroit({...ayantDroit, status: e.target.value})}}

            />
            
            <TextField
                className={classes.root}
                value={ayantDroit.ImmCNSS}
                label="Imm CNSS"
                onChange={(e) => {setAyantDroit({...ayantDroit, ImmCNSS: e.target.value})}}

            />

            <TextField
                className={classes.root}
                value={ayantDroit.rang}
                label="Rang"
                onChange={(e) => {setAyantDroit({...ayantDroit, rang: e.target.value})}}

            />

          <TextField
                            className={classes.root}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Pays"
                            value={ayantDroit.idpays}
                            onChange={(e) => {setAyantDroit({
                                ...ayantDroit,
                                idpays: e.target.value,
                                pays: options.find(pays => pays.id === e.target.value).label
                              })}
                            }
                            select
                            >
                             {
                                    options.map(payss => {
                                        return <MenuItem value={payss.id} selected={payss.label === ayantDroit.pays}>
                                            {payss.label}
                                        </MenuItem>
                                    })
                            }
            </TextField>
            <TextField
                            className={classes.root}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Ville"
                            value={ayantDroit.id}
                            onChange={(e) => {setAyantDroit({
                                ...ayantDroit,
                                id: e.target.value,
                                ville: optionsVille.find(ville => ville.id === e.target.value).nom
                              })}
                            }
                            select
                            >
                             {
                                    optionsVille.map(villes => {
                                        return <MenuItem value={villes.id} selected={villes.nom === ayantDroit.ville}>
                                            {villes.nom}
                                        </MenuItem>
                                    })
                            }
            </TextField>
            
            
         
           <CardActions>
               <Box>
          <Button
            className={classes.Button}
            variant="contained"
            onClick={() => {valider(ayantDroit)}}
          >Valider</Button> 
          <Button className={classes.Button} onclick={fermer} variant="contained">Fermer</Button>
          </Box>
          </CardActions>   
 
      </Grid>
      </Grid>
    </div>
  )
}
