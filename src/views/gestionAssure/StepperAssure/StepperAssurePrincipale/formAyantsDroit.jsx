import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useState } from 'react';

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
  }));

export default function FormAyantsDroit(props) {
    const classes = useStyles();
 
    /*const [ayantDroit,setAyanyDroit]=useState({
        sitFamiliale :"",
        nbrConjoint : 0,
        nbrEnfant : 0,
        nbrayantDroit :""
     })
*/
   const {ayantDroit,setAyantDroit}=props;
  useEffect(() => {
    setAyantDroit({...ayantDroit, nbrayantDroit: getNomberAyantDroit(
      parseFloat(ayantDroit.nbrConjoint),
      parseFloat(ayantDroit.nbrEnfant),
 
    )});
  }, [ayantDroit.nbrConjoint, ayantDroit.nbrEnfant])

  function getNomberAyantDroit(nbrEnfant,nbrConjoint) {
    return nbrEnfant + nbrConjoint;
  }

  
    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">

                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Sit Familiale</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={ayantDroit.sitFamiliale}
                            onChange={(e) => {setAyantDroit({...ayantDroit, sitFamiliale: e.target.value})}}

                            >
                            <MenuItem value="marie">Marié(e)</MenuItem>
                            <MenuItem value="celebataire">Célibataire</MenuItem>
                            <MenuItem value="divorce">divorcé(e)</MenuItem>
                            
                        </Select>
                </FormControl> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                <TextField className={classes.textField } 
                 value={ayantDroit.nbrConjoint}
                 onChange={(e) => {setAyantDroit({...ayantDroit, nbrConjoint: e.target.value})}} 
                 id="standard-basic" 
                 label="Nbr Conjoint" 
                 />

                <TextField className={classes.textField}  
                id="standard-basic"
                 label="Nbr Enfant"
                 value={ayantDroit.nbrEnfant}
                 onChange={(e) => {setAyantDroit({...ayantDroit, nbrEnfant: e.target.value})}} 
                />

                <TextField className={classes.textField} 
                 id="standard-basic"
                label="Nbr Ayant Droit"
                value={ayantDroit.nbrayantDroit}
                disabled  
                />

            </form>  
        </div>
    )
}
