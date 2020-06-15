import React, { useState} from 'react';
import { CardContent, CardActions,Button,TextField,Grid} from '@material-ui/core';
import FormButton from '../../components/form-button';
import TextInputselect from '../../components/text-input-select';



export default function FiltreCaisseM(props) {
    
    const [input, setInput] = useState({
        code: NaN,
        nom: "",
        adresse: "",
        id: "",
        pays:""
    });

return(
    <CardContent >
             <Grid container  spacing={1}>         
             <Grid item xs={3} >
             <TextField
                        fullWidth
                        margin="dense"
                        type="text"
                        label="Nom"
                        value={input.nom}
                        onChange={(e) => {setInput({...input, nom: e.target.value})}}
                        icon="none"
                        />
                </Grid>
                <Grid item xs={3} >       
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
                  <Grid item xs={3} >
                    <TextInputselect
                        type="select"
                        options={props.options.map(option => ({value:option.id, label:option.nom}))}
                        label="Pays"
                        onChange={(e) => {setInput({
                            ...input,
                            id: e.target.value,
                            pays: props.options.find(options => options.id === parseInt(e.target.value)).nom})}}
                        icon="none"
                    />
                </Grid>
                <Grid item xs={6}  justify="center" >
                <FormButton style={{padding : "6px" ,margin: "5"}}>Filtrer</FormButton>
                </Grid>

       </Grid>
        </CardContent>
   
)
}
