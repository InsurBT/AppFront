import React, { useState, useEffect } from 'react';
import {
    Grid,
    CircularProgress,
    MenuItem, 
    FormControl, 
    InputLabel,
    Select,
    Button,
    TextField,
    makeStyles
} from '@material-ui/core';
import Table from '../components/table';
import SmallHeader from '../components/small-header';
import FormPopup from '../components/form-popup';

import {Add,Edit} from '@material-ui/icons'
import utilisateurService from '../service/utilisateur-service';
import agenceService from '../service/agence-service';
export default function ListeUtilisateurs(props) {

    const useStyles = makeStyles((theme) => ({
        button : {
            color : '#000',
            backgroundColor : '#B3D9FF',
            '&:hover' : {
              backgroundColor : "#1A8CFF"
            }
          }
      }));
    
    const classes = useStyles();
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [role, setRole] = useState('');
  
    const handleChangeRole = (event) => {
      setRole(event.target.value);
    };
  

    const [agences, setAgences] = useState([]);

    // l'etat de chargement des donnees
    const [loading, setLoading] = useState(true);
    
    // l'etat des valeur de l'input
    const [inputUtilisateur, setInputUtilisateur] = useState({
        cod: NaN,
        nomComplet: "",
        nom: "",
        agence: "",
        code_agence: NaN,
        password: "",
        confirmationPassword: ""
    });

    // l'etat du mode du formulaire
    const [formMode, setFormMode] = useState("FERMER");

    // parametre du formulair
    const [formParams, setFormParams] = useState({
        icon: "",
        title: "",
        button: "",
        onSubmit: () => {},
        open: false
    });

    // etat du message d'erreur en cas de formulaire invailde
    const [invalidMessage, setInvalidMessag] = useState("");

    // les colonnes a afficher dans le tableau
    const columns = [
        { title: "Nom Complet", property: "nomComplet" },
        { title: "Nom d'utilisateur", property: "nom" },
        { title: "Agence", property: "agence"}
    ];
    //********************************************************************** */

    useEffect(() => {
        utilisateurService.getAll().then(res => {
            if (typeof res === "string") {
                console.log(res);
            } else {
                setUtilisateurs(res);
                setLoading(false);
            }
        });

        agenceService.getAll().then(res => {
            if (typeof res === "string") {
                console.log(res);
            } else {
                setAgences(res);
            }
        })
    }, []);

    useEffect(() => {
        switch (formMode) {
            case "AJOUTER":
                setFormParams({
                    icon: <Add />,
                    title: "Ajouter un utilisateur",
                    button: "Ajouter",
                    onSubmit: (e) => {
                        e.preventDefault();
                        addUtilisateur();
                    },
                    open: true
                });
                break;
            case "MODIFIER":
                setFormParams({
                    icon: <Edit />,
                    title: "Modifier l'utlisateur",
                    button: "Modifier",
                    onSubmit: (e) => {
                        e.preventDefault();
                        editUtilisateur(inputUtilisateur.cod);
                    },
                    open: true
                });
                break;
            case "FEREMER":
                setFormParams({
                    icon: "",
                    title: "",
                    button: "",
                    onSubmit: () => {},
                    open: false
                });
        }
    }, [formMode, inputUtilisateur]);

    function addUtilisateur() {
        if (validForm()) {
            inputUtilisateur.code_agence = parseInt(inputUtilisateur.code_agence);
            utilisateurService.add(inputUtilisateur).then(res => {
                if (typeof res === "string") {
                    setInvalidMessag(res);
                } else {
                    setUtilisateurs(res);
                    closeForm();
                }
            }).catch(err => {
                setInvalidMessag("probleme de connexion au serveur");
            });
        } else
            setInvalidMessag("Donnees entrees invalide!");
    }

    function editUtilisateur(id) {
        if (validForm()) {
            inputUtilisateur.code_agence = parseInt(inputUtilisateur.code_agence);
            utilisateurService.edit(inputUtilisateur).then(res => {
                if (res === true) {
                    const index = utilisateurs.findIndex((utilisateur) => utilisateur.cod === id);
                    const newUtilisateurs = [...utilisateurs];
                    newUtilisateurs.splice(index, 1, inputUtilisateur);
                    setUtilisateurs(newUtilisateurs);
                    closeForm();
                } else {
                    setInvalidMessag(res);
                }
            }).catch(err => {setInvalidMessag("probleme de connexion au serveur")});
        } else
            setInvalidMessag("Donnees entrees invalide!");
    }

    function openEditForm(utilisateur) {
        setInputUtilisateur(utilisateur);
        setFormMode("MODIFIER");
    }

    function validForm() {
        return (
            inputUtilisateur.nomComplet !== "" &&
            inputUtilisateur.nom !== "" &&
            inputUtilisateur.password === inputUtilisateur.confirmationPassword
        ) 
    }

    function clearInput() {
        setInputUtilisateur({
            cod: NaN,
            nomComplet: "",
            nom: "",
            agence: "",
            code_agence: NaN,
            password: "",
            confirmationPassword: ""
        });
    }

    function closeForm() {
        clearInput();
        setInvalidMessag("");
        setFormMode("FEREMER");
    }

    
    return (<div>
        <SmallHeader>
            Liste des utilisateurs
            <Button className={classes.button} onClick={() => {setFormMode("AJOUTER")}} variant="contained" color="primary">Ajouter utilisateur</Button>
        </SmallHeader>

        {/* Tableau des donnees */}
        {
            loading ?
            <Grid item container justify="center" xs="12">
                <Grid item style={{margin: "10px"}}>
                    <CircularProgress />
                </Grid>
            </Grid> :
                <Table
                    columns={columns}
                    data={utilisateurs}
                    buttons
                    edit={openEditForm}
                    pageSize="5"
                    searchBar
                />
        }

        {/* Formulaire d'ajout ou de modification */}
        <FormPopup
            onClose={closeForm}
            {...formParams}
            direction="column"
        >
            <TextField
                type="text"
                label="Nom Complet"
                value={inputUtilisateur.nomComplet}
                onChange={(e) => {setInputUtilisateur({...inputUtilisateur, nomComplet: e.target.value})}}
                icon="none"
            />
            <TextField
                type="text"
                label="Nom d'utlisateur"
                value={inputUtilisateur.nom}
                onChange={(e) => {setInputUtilisateur({...inputUtilisateur, nom: e.target.value})}}
            />
            <FormControl>
                <InputLabel>Agence</InputLabel>
                <Select
                    onChange={(e) => {setInputUtilisateur({
                        ...inputUtilisateur,
                        code_agence: e.target.value,
                        agence: agences.find(agence => agence.code === parseInt(e.target.value)).label})}}
                >
                    {
                        agences.map(agence => {
                            return <MenuItem value={agence.code} selected={agence.label === inputUtilisateur.agence}>
                                {agence.label}
                            </MenuItem>
                        })
                    }
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    onChange={handleChangeRole}
                >
                    <MenuItem value={10}>Admin</MenuItem>
                    <MenuItem value={20}>Agent</MenuItem>
        
                </Select>
            </FormControl>
            {
                formMode === "AJOUTER" ?
                [<TextField
                    type="password"
                    label="Mot de passe"
                    value={inputUtilisateur.password}
                    onChange={(e) => {setInputUtilisateur({...inputUtilisateur, password: e.target.value})}}
                />,
                <TextField
                    type="password"
                    label="Confirmer le mot de passe"
                    value={inputUtilisateur.confirmationPassword}
                    onChange={(e) => {setInputUtilisateur({...inputUtilisateur, confirmationPassword: e.target.value})}}
                />] :
                ""
            }
            <span style={{color: "red"}}>{invalidMessage}</span>
        </FormPopup>
    </div>)
}