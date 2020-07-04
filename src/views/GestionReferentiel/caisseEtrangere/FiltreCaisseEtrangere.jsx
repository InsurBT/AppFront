import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { CardContent,Grid,CardActions,TextField} from '@material-ui/core';
import TextInputselect from '../../../components/text-input-select';
import Button from '@material-ui/core/Button';



export default function FiltreCaisse(props) {

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
    const {optionsVille,setOptionsVille} = props;

    /****************************************************************/

    /************************************************************************************/

    return(
    <CardContent >
        <Grid container  spacing={10}>         
            <Grid item xs={5} >
                <TextField
                    fullWidth
                    margin="dense"
                    type="number"
                    label="Code"
                    value={inputFiltre.code}
                    onChange={(e) => {setInputFiltre({...inputFiltre, code: e.target.value})}}
                    icon="none"
                />
                <TextField
                    fullWidth
                    margin="dense"
                    type="text"
                    label="Nom"
                    value={inputFiltre.nom}
                    onChange={(e) => {setInputFiltre({...inputFiltre, nom: e.target.value})}}
                    icon="none"
                />
            </Grid>
            <Grid item xs={5} >
                <TextInputselect
                    type="select"
                    options={options.map(option => ({value:option.id, label:option.label}))}
                    label="Pays"
                    currentValue={inputFiltre.pays}
                    onChange={(e) => {setInputFiltre({
                        ...inputFiltre,
                        idpays: e.target.value,
                        pays: options.find(options => options.id === parseInt(e.target.value)).nom})}
                    
                    }
                        
                    icon="none"
                />
                <TextInputselect
                    type="select"
                    options={optionsVille.map(option => ({value:option.id, label:option.nom}))}
                    label="Ville"
                    currentValue={inputFiltre.ville}
                    onChange={(e) => {setInputFiltre({
                        ...inputFiltre,
                        id: e.target.value,
                        ville: optionsVille.find(options => options.id === parseInt(e.target.value)).nom})}
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
