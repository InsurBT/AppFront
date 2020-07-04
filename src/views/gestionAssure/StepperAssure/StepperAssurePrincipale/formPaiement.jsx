import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          width: 250,
        },
      },
    
    textField:{
        width: 300,
        marginRight:50,
        marginBottom:30,
        
    },  
    
  }));

export default function FormPaiement() {
    const classes = useStyles();
    const [modeRemboursement, setModeRemboursement] = useState('');
    const handleChangeModeRemboursement = (event) => {
        setModeRemboursement(event.target.value);
    };
    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">

                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Mode de remboursement</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={modeRemboursement}
                            onChange={handleChangeModeRemboursement}
                            >
                            <MenuItem value={10}>Virement</MenuItem>
                            <MenuItem value={20}>Par chèque</MenuItem>
                            
                        </Select>
                </FormControl> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField className={classes.textField} id="standard-basic" label="RIB" />
            </form>  
            
        </div>
    )
}
