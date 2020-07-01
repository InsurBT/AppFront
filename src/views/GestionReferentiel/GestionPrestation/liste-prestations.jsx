import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '../../../components/table';
import SmallHeader from '../../../components/small-header';
import FormPopup from '../../../components/form-popup';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';

import prestationService from '../../../service/prestation-service';

import styles from '../../../assets/jss/material-dashboard-react/components/buttonStyle';

const useStyle = makeStyles(styles);

export default function ListePrestations(props) {
    const classes = useStyle();
    
    const [prestations, setPrestations] = useState([]);

    // l'etat de chargement des donnees
    const [loading, setLoading] = useState(true);
    
    // l'etat des valeur de l'input
    const [inputPrestation, setInputPrestation] = useState({
        id: NaN,
        type: "",
        nbrActes: "",
        montantEngage: "",
        montantPaye: ""
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
        { title: "Prestations", property: "type" },
        { title: "Nbr Actes", property: "nbrActes" },
        { title: "Montant Engage", property: "montantEngage" },
        { title: "Montant payee", property: "montantPaye" }
    ];
    //********************************************************************** */

    useEffect(() => {
        prestationService.getAll().then(res => {
            setPrestations(res);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        switch (formMode) {
            case "AJOUTER":
                setFormParams({
                    icon: <Add />,
                    title: "Ajouter une prestation",
                    button: "Ajouter",
                    onSubmit: (e) => {
                        e.preventDefault();
                        addPrestation();
                    },
                    open: true
                });
                break;
            case "MODIFIER":
                setFormParams({
                    icon: <Edit />,
                    title: "Modifier la prestation",
                    button: "Modifier",
                    onSubmit: (e) => {
                        e.preventDefault();
                        editPrestation(inputPrestation.id);
                    },
                    open: true
                });
                break;
            case "SUPPRIMER":
                setFormParams({
                    icon: <Delete />,
                    title: "Supprimer cette prestation?",
                    button: "Supprimer",
                    onSubmit: (e) => {
                        e.preventDefault();
                        deletePrestation(inputPrestation);
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
    }, [formMode, inputPrestation]);

    function addPrestation() {
        if (validForm()) {
            prestationService.add(inputPrestation).then(res => {
                if (typeof res === "string") {
                    setInvalidMessag(res);
                } else {
                    setPrestations(res);
                    closeForm();
                }
            }).catch(err => {
                setInvalidMessag("probleme de connexion au serveur");
            });
        } else
            setInvalidMessag("Donnees entrees invalide!");
    }

    function deletePrestation(prestation) {
        if (window.confirm("Voulez supprimer cette prestation?")) {
            let newPrestations = [];
            prestationService.delete(prestation.id).then(res => {
                if (res === true) {
                    newPrestations = prestations.filter((prest) => prest !== prestation);
                    setPrestations(newPrestations);
                } else {
                    setInvalidMessag("l'element n'a pas ete supprimer");
                }
            });
        }
    }

    function editPrestation(id) {
        if (validForm()) {
            prestationService.edit(inputPrestation).then(res => {
                if (res === true) {
                    const index = prestations.findIndex((prestation) => prestation.id === id);
                    const newPrestations = [...prestations];
                    newPrestations.splice(index, 1, inputPrestation);
                    setPrestations(newPrestations);
                    closeForm();
                } else {
                    setInvalidMessag("l'element n'a pas ete modifier");
                }
            })
        } else
            setInvalidMessag("Donnees entrees invalide!");
    }

    function openEditForm(prestation) {
        setInputPrestation(prestation);
        setFormMode("MODIFIER");
    }

    function openDeleteForm(prestation) {
        setInputPrestation(prestation);
        setFormMode("SUPPRIMER");
    }

    function validForm() {
        return (
            inputPrestation.type !== "" &&
            !isNaN(parseInt(inputPrestation.nbrActes)) &&
            !isNaN(parseInt(inputPrestation.montantEngage)) &&
            !isNaN(parseInt(inputPrestation.montantPaye))
        ) 
    }

    function clearInput() {
        setInputPrestation({
            id: NaN,
            type: "",
            nbrActes: "",
            montantEngage: "",
            montantPaye: ""
        })
    }

    function closeForm() {
        clearInput();
        setInvalidMessag("");
        setFormMode("FEREMER");
    }

    
    return (<div>
        <SmallHeader>
            Liste des prestations
            <Button variant="contained" className={classes.basicButton} onClick={() => {setFormMode("AJOUTER")}}>Ajouter prestation</Button>
        </SmallHeader>

        {/* Tableau des donnees */}
        {
            loading ?
                <div>Chargement...</div> :
                <Table
                    columns={columns}
                    data={prestations}
                    buttons
                    delete={openDeleteForm}
                    edit={openEditForm} />
        }

        {/* Formulaire d'ajout ou de modification */}
        <FormPopup
            {...formParams}
            onClose={closeForm}
        >
            <TextField
                type="text"
                label="Type de prestation"
                value={inputPrestation.type}
                onChange={(e) => {setInputPrestation({...inputPrestation, type: e.target.value})}}
                icon="none"
            />
            <TextField
                type="number"
                label="Nombre d'actes"
                value={inputPrestation.nbrActes}
                onChange={(e) => {setInputPrestation({...inputPrestation, nbrActes: e.target.value})}}
            />
            <TextField
                type="number"
                label="Montant engage"
                value={inputPrestation.montantEngage}
                onChange={(e) => {setInputPrestation({...inputPrestation, montantEngage: e.target.value})}}
            />
            <TextField
                type="number"
                label="Montant paye"
                value={inputPrestation.montantPaye}
                onChange={(e) => {setInputPrestation({...inputPrestation, montantPaye: e.target.value})}}
            />
            <span style={{color: "red"}}>{invalidMessage}</span>
        </FormPopup>
    </div>)
}