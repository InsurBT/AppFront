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
    
    const [input, setInput] = useState({
        code: NaN,
        nom: "",
        adresse: "",
        id: "",
        pays:""
    });

return(
    <CardContent >
    <Grid container  spacing={10}>         
    <Grid item xs={5} >
    <TextField
               fullWidth
               margin="dense"
               type="text"
               label="Nom"
               value={input.nom}
               onChange={(e) => {setInput({...input, nom: e.target.value})}}
               icon="none"
               />
    
           <TextField
               fullWidth
               margin="dense"
               type="text"
               label="Adresse"
               value={input.adresse}
               onChange={(e) => {setInput({...input, adresse: e.target.value})}}
               icon="none"
               />
         </Grid>
         <Grid item xs={5} >
       <TextInputselect
           type="select"
           options={props.options.map(option => ({value:option.id, label:option.label}))}
           label="Pays"
           onChange={(e) => {setInput({
               ...input,
               idpays: e.target.value,
               pays: props.options.find(options => options.id === parseInt(e.target.value)).nom})}
           
           }
               
           icon="none"
       />
      
   </Grid>
   <CardActions>
       <Grid item xs={5}  justify="center" >
           <Grid item xs={5}  justify="center" >
           <Button  variant="contained" className={classes.button} >Filtrer</Button>  
           </Grid>
       </Grid>
   </CardActions>

</Grid>
</CardContent>
)
}
