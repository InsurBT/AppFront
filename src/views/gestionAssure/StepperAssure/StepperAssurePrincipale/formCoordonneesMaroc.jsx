import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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


export default function FormCoordonneesMaroc() {

    const classes = useStyles();
    const [ville, setVille] = React.useState('');

    const handleChangeVille = (event) => {
        setVille(event.target.value);
    };

    const [agence, setAgence] = React.useState('');

    const handleChangeAgence = (event) => {
        setAgence(event.target.value);
    };

    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField className={classes.textField} id="standard-basic" label="Imm CNSS" />
                <TextField className={classes.textField2}  id="standard-basic" label="Adresse" />
                <TextField className={classes.textField}  id="standard-basic" label="Code Postal" />
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Ville</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={ville}
                            onChange={handleChangeVille}
                            >
                            <MenuItem value={10}>Casablanca</MenuItem>
                            <MenuItem value={20}>Rabat</MenuItem>
                            <MenuItem value={20}>Agadir</MenuItem>
                            
                        </Select>
                </FormControl> 
                <pre></pre>
                <TextField className={classes.textField}  id="standard-basic" label="Tel" />
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Agence</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={agence}
                            onChange={handleChangeAgence}
                            >
                            <MenuItem value={10}>Agadir 1</MenuItem>
                            <MenuItem value={20}>Agadir 2</MenuItem>
                            
                        </Select>
                </FormControl>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField className={classes.textField2}  id="standard-basic" label="E-Mail" />
                <TextField className={classes.textField}  id="standard-basic" label="Mobile" />
            </form>
            
        </div>
    )
}
