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

export default function FormCoordonnesEtranger() {
    const classes = useStyles();
    const [ville, setVille] = React.useState('');

    const handleChangeVille = (event) => {
        setVille(event.target.value);
    };

    const [pays, setPays] = React.useState('');

    const handleChangePays = (event) => {
        setPays(event.target.value);
    };
    const [caisse, setCaisse] = React.useState('');

    const handleChangeCaisse = (event) => {
        setCaisse(event.target.value);
    };
    const [caisseMere, setCaisseMere] = React.useState('');

    const handleChangeCaisseMere = (event) => {
        setCaisseMere(event.target.value);
    };

    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">
               
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Pays</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={pays}
                            onChange={handleChangePays}
                            >
                            <MenuItem value={10}>France</MenuItem>
                            <MenuItem value={20}>Italie</MenuItem>
                            <MenuItem value={20}>Belgique</MenuItem>
                            
                        </Select>
                </FormControl> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField className={classes.textField} id="standard-basic" label="Imm CE" />
                <TextField className={classes.textField} id="standard-basic" label="Imm CE Tierce" />
                
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Ville</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={ville}
                            onChange={handleChangeVille}
                            >
                            <MenuItem value={10}>Paris</MenuItem>
                            <MenuItem value={20}>Marseille</MenuItem>
                            <MenuItem value={20}>Toulouse </MenuItem>
                            
                        </Select>
                </FormControl>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                
                <TextField className={classes.textField2}  id="standard-basic" label="Adresse" />
                 
                <TextField className={classes.textField}  id="standard-basic" label="Code Postal" />
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Caisse</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={caisse}
                            onChange={handleChangeCaisse}
                            >
                            <MenuItem value={10}> 1</MenuItem>
                            <MenuItem value={20}> 2</MenuItem>
                            
                        </Select>
                </FormControl>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField className={classes.textField}  id="standard-basic" label="Mobile" />
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Caisse mère</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={caisseMere}
                            onChange={handleChangeCaisseMere}
                            >
                            <MenuItem value={10}> 1</MenuItem>
                            <MenuItem value={20}> 2</MenuItem>
                            
                        </Select>
                </FormControl>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField className={classes.textField2}  id="standard-basic" label="Tel" />

            </form>
            
        </div>
    )
}
