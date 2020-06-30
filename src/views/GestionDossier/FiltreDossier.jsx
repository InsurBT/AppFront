import React, { useState} from 'react';
import { CardContent,Grid,TextField} from '@material-ui/core';
import { useEffect } from 'react';
import agenceService from '../../service/agence-service';
import DirectionRegService from '../../service/directionReg-service';
import TextInputselect from '../../components/text-input-select';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    Grid : {
        color: '#33CCCC',
        fontSize: '18px',
        fontFamily : 'auto'
    },
    label : {
        color : '#008AE6'
    }
})

 function FiltreUtilisateur(props) {
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

    const {classes} = props

    return(
        <CardContent >
            <Grid container  spacing={1}>   
                <Grid item xs={6} className={classes.Grid}>N° immatriculation</Grid>

                <Grid item xs={6} className={classes.Grid}>Assuré principal</Grid> 
            
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

                <Grid item xs={6} className={classes.Grid} >Agence </Grid>

                <Grid item xs={6} className={classes.Grid}>Ayants droit</Grid>

                <Grid item xs={3}  >
                    <TextInputselect
                        variant="outlined"
                        type="select"
                        options={optionsDr.map(option => ({value:option.id, label:option.nom}))}
                        label="Régionale"
                        onChange={(e) => {setInput({
                            ...input,
                            idDr: e.target.value,
                            dr: optionsDr.find(options => options.id === parseInt(e.target.value)).nom})}
                        }
                            
                        icon="none"
                    />
                </Grid>

                <Grid item xs={3} >
                    <TextInputselect
                        variant="outlined"
                        type="select"
                        options={agences.map(option => ({value:option.code, label:option.label}))}
                        label="Agence"
                        onChange={(e) => {setInput({
                            ...input,
                            idAgence: e.target.value,
                            agence: agences.find(options => options.code === parseInt(e.target.value)).label})}
                        }      
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

                <Grid item xs ={6}>
                    <input
                        type='checkbox'
                        checked={checkedReception}
                        onChange={(event) => {setCheckedReception(event.target.checked);}}
                    />
                    Date Réception
                </Grid>
                    
                <Grid item xs ={6} className={classes.Grid}> Convention-Formulaire </Grid>
            
                <Grid item xs={3}>
                    <label className={classes.label}>Date Du </label>
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
                    <label className={classes.label}>Date Au </label>
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

                <Grid item xs={3}>
                    <label className={classes.label}>Convention </label>
                    <TextField
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        type="text"
                        label = 'Convention'
                        value={input.convention}
                        onChange={(e) => {setInput({...input, convention: e.target.value})}}
                        icon="none"
                    />
                </Grid>

                <Grid item xs={3}>
                    <label className={classes.label}> Formulaire </label>
                    <TextField
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        type="text"
                        label = 'Formulaire'
                        value={input.formulaire}
                        onChange={(e) => {setInput({...input, formulaire: e.target.value})}}
                        icon="none"
                    />
                </Grid>

                <Grid item sm={12}>
                <input type='checkbox'  checked={checkedSoins}
                    onChange={(event) => {setCheckedSoins(event.target.checked);}}/>  
                <label className={classes.label}> Date Soin </label>
                </Grid>

                <Grid item xs={3}>
                    <label className={classes.label}>Date Du </label>
                    <TextField
                        fullWidth
                        margin="dense"
                        type="date"
                        variant="outlined"
                        value={input.dateSoinsDu}
                        onChange={(e) => {setInput({...input, dateSoinsDu: e.target.value})}}
                        icon="none"
                        disabled={!checkedSoins}
                    />
                </Grid>
                
                <Grid item xs={3}>
                    <label className={classes.label}>Date Au </label>
                    <TextField
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        type="date"
                        value={input.dateSoinsAu}
                        onChange={(e) => {setInput({...input, dateSoinsAu: e.target.value})}}
                        icon="none"
                        disabled={!checkedSoins}
                    />
                </Grid>
            </Grid>
        </CardContent>
    )
}

export default withStyles(styles)(FiltreUtilisateur)