import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import agenceService from '../../../../service/agence-service';
import villeService from '../../../../service/ville-service';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          width: 140,
        },
      },
    
    textField:{
        marginRight:50,
        marginBottom:30,
        
    }, 
    textField2:{
        width: 250,
        marginRight:50,
        marginBottom:30,
        
    },  
  }));


export default function FormCoordonneesMaroc(props) {

    const {coordonneesMaroc,setCoodonnesMaroc}=props;
    const classes = useStyles();
    const [agences, setAgences] = useState([]);
    const [optionsVille,setOptionsVille] = useState([]);

    useEffect(() => {
      
        villeService.getAll(1).then(res => {
            setOptionsVille(res);
            console.log('les villes:',res);
    }
    ); 
        agenceService.getAll().then(res => {
            if (typeof res === "string") {
                console.log(res);
            } else {
                setAgences(res);
            }
        })
    }, []);
/*
    const handleChangeVille = (event) => {
        setVille(event.target.value);
    };

    const [agence, setAgence] = React.useState('');

    const handleChangeAgence = (event) => {
        setAgence(event.target.value);
    };
*/
    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField 
                className={classes.textField} 
                id="standard-basic" 
                label="Imm CNSS" 
                value={coordonneesMaroc.ImmCNSS}
                onChange={(e) => {setCoodonnesMaroc({...coordonneesMaroc, ImmCNSS: e.target.value})}}
                />

                <TextField 
                className={classes.textField2}  
                id="standard-basic"
                label="Adresse" 
                value={coordonneesMaroc.adresse}
                onChange={(e) => {setCoodonnesMaroc({...coordonneesMaroc, adresse: e.target.value})}}
                />

                <TextField className={classes.textField} 
                 id="standard-basic" 
                 label="Code Postal"
                 value={coordonneesMaroc.codPostal}
                 onChange={(e) => {setCoodonnesMaroc({...coordonneesMaroc, codPostal: e.target.value})}}
                 />

                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Ville</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={coordonneesMaroc.id}
                            onChange={(e) => {setCoodonnesMaroc({...coordonneesMaroc, id: e.target.value})}}
                            >
                               {
                                    optionsVille.map(villes => {
                                        return <MenuItem value={villes.id} selected={villes.nom === coordonneesMaroc.ville}>
                                            {villes.nom}
                                        </MenuItem>
                                    })
                            }
                        </Select>
                </FormControl> 

                <pre></pre>

                <TextField className={classes.textField}  
                id="standard-basic" 
                label="Tel" 
                value={coordonneesMaroc.tel}
                onChange={(e) => {setCoodonnesMaroc({...coordonneesMaroc, tel: e.target.value})}}
                />

                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Agence</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={coordonneesMaroc.idAgence}
                            onChange={(e) => {setCoodonnesMaroc({...coordonneesMaroc, idAgence: e.target.value})}}
                            >
                                   {
                                    agences.map(agence => {
                                        return <MenuItem value={agence.code} selected={agence.label === coordonneesMaroc.agence}>
                                            {agence.label}
                                        </MenuItem>
                                    })
                                    }
                            
                        </Select>
                </FormControl>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                <TextField className={classes.textField2}
                id="standard-basic"
                label="E-Mail"
                value={coordonneesMaroc.email}
                onChange={(e) => {setCoodonnesMaroc({...coordonneesMaroc, email: e.target.value})}}
                />

                <TextField className={classes.textField} 
                 id="standard-basic" 
                 label="Mobile"
                 value={coordonneesMaroc.mobile}
                 onChange={(e) => {setCoodonnesMaroc({...coordonneesMaroc, mobile: e.target.value})}} />
            </form>
            
        </div>
    )
}
