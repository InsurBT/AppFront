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
  }));

export default function FormAyantsDroit() {
    const classes = useStyles();
    const [sitFamiliale, setSitFamiliale] = React.useState('');

    const handleChangeSitFamiliale = (event) => {
        setSitFamiliale(event.target.value);
    };

    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">

                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Sit Familiale</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sitFamiliale}
                            onChange={handleChangeSitFamiliale}
                            >
                            <MenuItem value={10}>1</MenuItem>
                            <MenuItem value={20}>2</MenuItem>
                            
                        </Select>
                </FormControl> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField className={classes.textField} id="standard-basic" label="Nbr Conjoint" />
                <TextField className={classes.textField}  id="standard-basic" label="Nbr Enfant" />
                <TextField className={classes.textField}  id="standard-basic" label="Nbr Ayant Droit" />
            </form>  
        </div>
    )
}
