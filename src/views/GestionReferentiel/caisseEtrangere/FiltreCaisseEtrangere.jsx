import React, { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { CardContent,Grid,CardActions,TextField} from '@material-ui/core';
import TextInputselect from '../../../components/text-input-select';
import FormButton from '../../../components/form-button';
import paysService from '../../../service/pays-service';

import villeService from '../../../service/ville-service';
import { useEffect } from 'react';
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
        
    const [input, setInput] = useState({
        code: "",
        nom: "",
        idpays: "",
        pays:"",
        ville:"",
        id:""
    });
    const [options,setOptions] = useState([]);
    const classes = useStyles();

    const [optionsVille,setOptionsVille] = useState([]);
    useEffect(() => {
        paysService.getAll().then(res => {
            if (typeof res === "string") {
                console.log(res);
            } else {
                setOptions(res);
                console.log(res);
                console.log('les options sont :',options);
            }
        })
    }, []);

    /***********************************************************************************/
    useEffect(() => {
        console.log("le code est",input.idpays);
        villeService.getAll(input.idpays).then(res => {
            setOptionsVille(res);
            console.log('les villes:',res);
    }
    ); 
    }, [input.idpays]); 
    
    return(
    <CardContent >
        <Grid container  spacing={10}>         
            <Grid item xs={5} >
                <TextField
                    fullWidth
                    margin="dense"
                    type="number"
                    label="Code"
                    value={input.code}
                    onChange={(e) => {setInput({...input, code: e.target.value})}}
                    icon="none"
                />
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
            <Grid item xs={5} >
                <TextInputselect
                    type="select"
                    options={options.map(option => ({value:option.id, label:option.label}))}
                    label="Pays"
                    onChange={(e) => {setInput({
                        ...input,
                        idpays: e.target.value,
                        pays: options.find(options => options.id === parseInt(e.target.value)).nom})}
                    
                    }
                        
                    icon="none"
                />
                <TextInputselect
                    type="select"
                    options={optionsVille.map(option => ({value:option.id, label:option.nom}))}
                    label="Ville"
                    onChange={(e) => {setInput({
                        ...input,
                        id: e.target.value,
                        ville: optionsVille.find(options => options.id === parseInt(e.target.value)).nom})}
                    }
                        
                    icon="none"
                />
            </Grid>
            <CardActions>
                <Grid item xs={5}  justify="center" >
                    <Grid item xs={5}  justify="center" >
                    
                    <Button className={classes.button} >Filtrer </Button>

                    </Grid>
                </Grid>
            </CardActions>
        </Grid>
    </CardContent>
    )
}
