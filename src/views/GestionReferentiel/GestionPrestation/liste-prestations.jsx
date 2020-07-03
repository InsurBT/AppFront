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
        tauxRemboursement: "",
        tarif: "",
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
        { title: "Tarif", property: "tarif" },
        { title: "Taux de remboursement", property: "tauxRemboursement" },
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
            !isNaN(parseInt(inputPrestation.tauxRemboursement)) &&
            !isNaN(parseInt(inputPrestation.tarif))
        );
    }

    function clearInput() {
        setInputPrestation({
            id: NaN,
            type: "",
            tauxRemboursement: "",
            tarif: "",
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
                    edit={openEditForm}
                    searchBar />
                    
        }

        {/* Formulaire d'ajout ou de modification */}
        <FormPopup
            {...formParams}
            onClose={closeForm}
        >
            <TextField
            fullWidth
                type="text"
                label="Type de prestation"
                value={inputPrestation.type}
                onChange={(e) => {setInputPrestation({...inputPrestation, type: e.target.value})}}
                icon="none"
            />
            <TextField
            fullWidth
                type="number"
                label="Nombre d'actes"
                value={inputPrestation.tauxRemboursement}
                onChange={(e) => {setInputPrestation({...inputPrestation, tauxRemboursement: e.target.value})}}
            />
            <TextField
            fullWidth
                type="number"
                label="Montant engage"
                value={inputPrestation.tarif}
                onChange={(e) => {setInputPrestation({...inputPrestation, tarif: e.target.value})}}
            />
            <span style={{color: "red"}}>{invalidMessage}</span>
        </FormPopup>
    </div>)
}