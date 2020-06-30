import React, { useState } from 'react';
import { Grid, TextField, FormLabel, FormControl, Select, MenuItem, InputLabel, Button, CircularProgress } from '@material-ui/core';

import Table from '../../components/table';

import assureService from '../../service/assure-service';

export default function FiltreinputAssure(props) {

    const [inputAssure, setInputAssure] = useState({
        imme: "",
        nom: "",
        prenom: "",
        code_agence: "",
        code_dr: "",
    });

    const [assures, setAssures] = useState([]);

    const [selectedAssure, setSelectedAssure] = useState({})

    // etat de chargement des assure filtré
    const [loading, setLoading] = useState(false);

    // les colonnes du tableau 
    const columns = [
        { title: "Imme",   property: "imme"   },
        { title: "Nom",    property: "nom"    },
        { title: "Prenom", property: "prenom" },
        { title: "Agence", property: "agence" }
    ]

    function filtrer() {
        setLoading(true);
        assureService.getFiteredAssures(inputAssure).then(res => {
            setAssures(res);
            setLoading(false);
        })
    };

    return (<Grid container >
        <Grid item container xs="6">
            <Grid item xs="12">
                <InputLabel>N# immatriculation</InputLabel>
                <TextField
                    type="text"
                    value={inputAssure.imme}
                    onChange={ (e) => { setInputAssure({ ...inputAssure, imme: e.target.value }); } }
                />
            </Grid>
            <Grid item xs="6">
                <FormControl style={{width: "100%", padding: "2px"}}>
                    <InputLabel>DR Régionale</InputLabel>
                    <Select
                        value={inputAssure.code_dr}
                        onChange={ (e) => { setInputAssure({...inputAssure, code_dr: e.target.value}); } }
                    >
                        <MenuItem value=""></MenuItem>
                        <MenuItem value="1">Direction regionale 1</MenuItem>
                        <MenuItem value="2">Direction regionale 2</MenuItem>
                        <MenuItem value="3">Direction regionale 3</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs="6">
                <FormControl style={{width: "100%", padding: "2px"}}>
                    <InputLabel>Agence</InputLabel>
                    <Select
                        value={inputAssure.code_agence}
                        onChange={(e) => {setInputAssure({...inputAssure, code_agence: e.target.value})}}
                    >
                        <MenuItem value=""></MenuItem>
                        <MenuItem value="1">Agence 1</MenuItem>
                        <MenuItem value="2">Agence 2</MenuItem>
                        <MenuItem value="3">Agence 3</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
        <Grid item container xs="6">
            <Grid item xs="12" direction="column">
                <Grid item container justify="space-between">
                    <InputLabel style={{marginTop: "10px"}}>Nom</InputLabel>
                    <TextField
                        value={inputAssure.nom}
                        onChange={ (e) => { setInputAssure({ ...inputAssure, nom: e.target.value }) } }
                    />
                </Grid>
                <Grid item container justify="space-between">
                    <InputLabel style={{marginTop: "10px"}}>Prenom</InputLabel>
                    <TextField
                        value={inputAssure.prenom}
                        onChange={ (e) => { setInputAssure({ ...inputAssure, prenom: e.target.value }) } }
                    />
                </Grid>
            </Grid>
        </Grid>

        <Grid item container justify="center" xs="12">
            <Grid item style={{margin: "10px"}}>
                <Button onClick={filtrer} variant="outlined" disabled={loading}>Filtrer</Button>
            </Grid>
        </Grid>

        {
            loading ? 
            <Grid item container justify="center" xs="12">
                <Grid item style={{margin: "10px"}}>
                    <CircularProgress />
                </Grid>
            </Grid>
            :
            null
        }

        <Grid item xs="12">
            <Table
                columns={columns}
                data={assures}
                onElementClick={ (assure) => { setSelectedAssure(assure) } }
                pageSize={3}
            />
        </Grid>
        <Grid item container xs="12" direction="row-reverse">
            <Grid item style={{margin: "10px"}}>
                <Button variant="outlined" onClick={ () => { props.handleAjouter(selectedAssure) } }>Ajouter Dossier</Button>
            </Grid>
        </Grid>
    </Grid>)
}