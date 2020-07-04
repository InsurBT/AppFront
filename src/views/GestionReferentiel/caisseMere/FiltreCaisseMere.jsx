import React, { useState} from 'react';
import { CardContent, CardActions,Button,TextField,Grid} from '@material-ui/core';
import FormButton from '@material-ui/core/Button';
import TextInputselect from '../../../components/text-input-select';
import { makeStyles } from '@material-ui/core/styles';





export default function FiltreCaisseM(props) {
    const useStyles = makeStyles((theme) => ({
        button : {
            backgroundColor : '#B3D9FF',
            '&:hover' : {
            backgroundColor : "#1A8CFF"
            }
        }
    }));
        
    const classes = useStyles();
    
    const {inputFiltre, setInputFiltre}=props;
    const {options,setOptions} = props;
   
 
return(
    <CardContent >
    <Grid container  spacing={10}>         
    <Grid item xs={5} >
    <TextField
            fullWidth
            margin="dense"
            type="text"
            label="Nom"
            value={inputFiltre.nom}
            onChange={(e) => {setInputFiltre({...inputFiltre, nom: e.target.value})}}
            icon="none"
            />
    
        <TextField
            fullWidth
            margin="dense"
            type="text"
            label="Adresse"
            value={inputFiltre.adresse}
            onChange={(e) => {setInputFiltre({...inputFiltre, adresse: e.target.value})}}
            icon="none"
            />
        </Grid>
        <Grid item xs={5} >
        <TextInputselect
            type="select"
            options={options.map(option => ({value:option.id, label:option.label}))}
            label="Pays"
            onChange={(e) => {setInputFiltre({
                ...inputFiltre,
                id: e.target.value,
                pays: options.find(options => options.id === parseInt(e.target.value)).nom})}
            
            }
                
            icon="none"
    />
    
</Grid>
        <CardActions>
                    <Grid item xs={5}  justify="center" >
                        <Grid item xs={5}  justify="center" >
                        <Button onClick={props.filtrer} variant="outlined"  >Filtrer</Button>  
                        </Grid>
                    </Grid>
        </CardActions>

</Grid>
</CardContent>
)
}
