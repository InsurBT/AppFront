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

export default function FormPaiement(props) {
    const classes = useStyles();
    const [choix,setChoix]=useState(true);
    const {paiement,setPaiement}=props;

    const handleChangeModeRemboursement = (event) => {
       
        setPaiement({
            ...paiement,
            modeRemboursement: event.target.value});

        console.log("mode de remboursement",paiement.modeRemboursement)

        if(paiement.modeRemboursement=="Virement")
        {
            console.log("mode de remboursement2",paiement.modeRemboursement)
            setChoix(true);
            console.log(choix)
        }else{
             setChoix(false);
        }
    };
    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">

                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Mode de remboursement</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={paiement.modeRemboursement}
                            onChange={handleChangeModeRemboursement}
                            >
                            <MenuItem value="Virement">Virement</MenuItem>
                            <MenuItem value="cheque">Par chèque</MenuItem>
                            
                        </Select>
                </FormControl> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField 
                className={classes.textField} 
                id="standard-basic" 
                label="RIB"
                 disabled={choix} 
                value={paiement.RIB}  
                onChange={(e) => {setPaiement({
                    ...paiement,
                    RIB: e.target.value})}}
                />

            </form>  
            
        </div>
    )
}
