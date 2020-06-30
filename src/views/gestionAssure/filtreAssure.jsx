import React, { useState} from 'react';
import { CardContent,Grid,TextField,InputLabel} from '@material-ui/core';
import { useEffect } from 'react';
import agenceService from '../../service/agence-service';
import DirectionRegService from '../../service/directionReg-service';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default function FiltreAssure(props) {
    const [checkedReception, setCheckedReception] = useState(false);

    const [checkedSoins,setCheckedSoins]=useState(false);

    const [input, setInput] = useState({
        code: "",
        nomAssure: "",
        nomAyantDroit:"",
        prenomAssure:"",
        prenomAyantDroit:"",
        agence:"",
        dr:"",
        idAgence:"",
        idDr:"",
        convention:"",
        formulaire:"",
        dateReceptionDu:"",
        dateReceptionAu:"",
        dateSoinsDu:"",
        dateSoinsAu:""
    });
    const [agence, setAgence] = useState('');
    const handleChangeAgence = (event) => {
        setAgence(event.target.value);
    };
    const [DRegional, setDRegional] = useState('');
    const handleChangeDRegional = (event) => {
        setDRegional(event.target.value);
    };
    const [convention, setConvention] = useState('');
    const handleChangeConvention = (event) => {
        setConvention(event.target.value);
    };
    const [modepaiment, setModePaiment] = useState('');
    const handleChangeModePaiment = (event) => {
        setModePaiment(event.target.value);
    };
    const [formulaire, setFormulaire] = useState('');
    const handleChangeFormulaire = (event) => {
        setFormulaire(event.target.value);
    };
    const [state, setState] = useState({
        checkedB: true,

      });

    const [agences, setAgences] = useState([]);
    const [optionsDr,setOptionsDr] = useState([]);

    useEffect(() => {
        agenceService.getAll().then(res => {
            if (typeof res === "string") {
                console.log(res);
            } else {
                setAgences(res);
            }
        });

        DirectionRegService.getAll().then(res => {
            if (typeof res === "string") {
                console.log(res);
            } else {
                setOptionsDr(res);
            }
        })
    }, []);

    /***********************************************************************************/

    return(
        <CardContent >
            <Grid container  spacing={1}>   
                <Grid item xs={6}>N° immatriculation</Grid>

                <Grid item xs={6}>Assuré principal</Grid> 
            
                <Grid item xs={6} >
                    <TextField
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        type="number"
                        label="N° immatriculation"
                        value={input.code}
                        onChange={(e) => {setInput({...input, code: e.target.value})}}
                        icon="none"
                    />
                </Grid>      
                
                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        type="text"
                        label="Nom"
                        value={input.nomAssure}
                        onChange={(e) => {setInput({...input, nomAssure: e.target.value})}}
                        icon="none"
                    />
                </Grid>

                <Grid item xs={3}>
                        <TextField
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            type="text"
                            label="Prénom"
                            value={input.prenomAssure}
                            onChange={(e) => {setInput({...input, prenomAssure: e.target.value})}}
                            icon="none"
                        />
                </Grid>

                <Grid item xs={6} >Date inscription </Grid>

                <Grid item xs={6}>Ayants droit</Grid>

                <Grid item xs={6}>
                   
                    <TextField
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        type="date"
                        value={input.dateSoinsAu}
                        onChange={(e) => {setInput({...input, dateSoinsAu: e.target.value})}}
                        icon="none"
                      
                    />
                </Grid>
            
                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        type="text"
                        label="Nom"
                        value={input.nomAyantDroit}
                        onChange={(e) => {setInput({...input, nomAyantDroit: e.target.value})}}
                        icon="none"
                    />
                </Grid>

                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        type="text"
                        label="Prénom"
                        value={input.prenomAyantDroit}
                        onChange={(e) => {setInput({...input, prenomAyantDroit: e.target.value})}}
                        icon="none"
                    />
                </Grid>
                <Grid item xs={6}>Agence</Grid>
                <Grid item xs ={6}>
                    <input
                        type='checkbox'
                        checked={checkedReception}
                        onChange={(event) => {setCheckedReception(event.target.checked);}}
                    />Couverture
                </Grid>
             
                <Grid item xs={3}  >
                    <label>DR Régionale</label>

                    <Select fullWidth 
                                margin="dense"   variant="outlined"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            placeholder="Dr régionale"
                            label="Dr régionale"
                            value={DRegional}
                            onChange={handleChangeDRegional}
                            >
                            <MenuItem value={10}>DRegional1</MenuItem>
                            <MenuItem value={20}>DRegional1</MenuItem>
                            <MenuItem value={30}>DRegional1</MenuItem>
                        </Select>

                </Grid>

                <Grid item xs={3} >
                    <label>Agence</label>

                    <Select fullWidth  
                                margin="dense"   variant="outlined"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            placeholder="Agence"
                            value={agence}
                            onChange={handleChangeAgence}

                            >
                            <MenuItem value={10}>agence1</MenuItem>
                            <MenuItem value={20}>agence2</MenuItem>
                            <MenuItem value={30}>agence3</MenuItem>
                        </Select>

                </Grid>
                <Grid item xs={3}>
                    <label>Date Debut </label>
                    <TextField
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        type="date"
                        value={input.dateReceptionDu}
                        onChange={(e) => {setInput({...input, dateReceptionDu: e.target.value})}}
                        icon="none"
                        disabled={!checkedReception}
                    />
                </Grid>

                <Grid item xs={3}>
                    <label>Date fin </label>
                    <TextField
                        fullWidth
                        margin="dense"
                        type="date"
                        variant="outlined"
                        value={input.dateReceptionAu}
                        onChange={(e) => {setInput({...input, dateReceptionAu: e.target.value})}}
                        icon="none"
                        disabled={!checkedReception}
                    />
                </Grid>
              

            
                    
                <Grid item xs ={12}> Convention-Formulaire </Grid>
            

                <Grid item xs={3}>
                <label>Convention</label>
                    <Select 
                    fullWidth
                                  margin="dense"   variant="outlined"
                                labelId="demo-simple-select-label3"
                                id="demo-simple-select"
                                value={convention}
                                placeholder="Convention"
                                onChange={handleChangeConvention}
                                >
                                <MenuItem value={10}>convention1</MenuItem>
                                <MenuItem value={20}>convention2</MenuItem>
                                <MenuItem value={30}>convention3</MenuItem>
                            </Select>

                </Grid>

                <Grid item xs={3}>
                <label>Mode de paiement</label>
                    <Select fullWidth
                                  margin="dense"   variant="outlined"
                                labelId="demo-simple-select-label2"
                                id="demo-simple-select1"
                                value={modepaiment}
                                onChange={handleChangeModePaiment}
                                placeholder="Mode de paiement"
                                >
                                <MenuItem value={10}>Mode1</MenuItem>
                                <MenuItem value={20}>Mode2</MenuItem>
                                <MenuItem value={30}>Mode3</MenuItem>
                            </Select>

                </Grid>

         
                
                <Grid item xs={3}>
                <label>Formulaire</label>
                <Select  fullWidth
                                  margin="dense"   variant="outlined"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formulaire}
                                onChange={handleChangeFormulaire}
                                placeholder="Formulaire"
                                >
                                <MenuItem value={10}>Formulaire</MenuItem>
                                <MenuItem value={20}>Formulaire3</MenuItem>
                                <MenuItem value={30}>Formulaire4</MenuItem>
                            </Select>

                </Grid>
            </Grid>
        </CardContent>
    )
}

