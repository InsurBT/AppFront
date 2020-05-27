import React, { useState, useContext, useEffect } from 'react';

import Table from '../components/table';
import SmallHeader from '../components/small-header';
import FormPopup from '../components/form-popup';
import TextInput from '../components/text-input';
import FormButton from '../components/form-button';

import utilisateurService from '../service/utilisateur-service';
import agenceService from '../service/agence-service';

export default function ListeUtilisateurs(props) {
    
    const [utilisateurs, setUtilisateurs] = useState([]);

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
                    icon: "plus",
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
                    icon: "edit",
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
            <FormButton onClick={() => {setFormMode("AJOUTER")}}>Ajouter utilisateur</FormButton>
        </SmallHeader>

        {/* Tableau des donnees */}
        {
            loading ?
                <div>Chargement...</div> :
                <Table
                    columns={columns}
                    data={utilisateurs}
                    buttons
                    edit={openEditForm}
                    pageSize="2"
                />
        }

        {/* Formulaire d'ajout ou de modification */}
        <FormPopup
            onClose={closeForm}
            {...formParams}
        >
            <TextInput
                type="text"
                label="Nom Complet"
                value={inputUtilisateur.nomComplet}
                onChange={(e) => {setInputUtilisateur({...inputUtilisateur, nomComplet: e.target.value})}}
                icon="none"
            />
            <TextInput
                type="text"
                label="Nom d'utlisateur"
                value={inputUtilisateur.nom}
                onChange={(e) => {setInputUtilisateur({...inputUtilisateur, nom: e.target.value})}}
                icon="none"
            />
            <TextInput
                type="select"
                options={agences.map(agence => ({value:agence.code, label:agence.label}))}
                label="Agence"
                onChange={(e) => {setInputUtilisateur({
                    ...inputUtilisateur,
                    code_agence: e.target.value,
                    agence: agences.find(agence => agence.code === parseInt(e.target.value)).label})}}
                icon="none"
            />
            {
                formMode === "AJOUTER" ?
                [<TextInput
                    type="password"
                    label="Mot de passe"
                    value={inputUtilisateur.password}
                    onChange={(e) => {setInputUtilisateur({...inputUtilisateur, password: e.target.value})}}
                    icon="lock"
                />,
                <TextInput
                    type="password"
                    label="Confirmer le mot de passe"
                    value={inputUtilisateur.confirmationPassword}
                    onChange={(e) => {setInputUtilisateur({...inputUtilisateur, confirmationPassword: e.target.value})}}
                    icon="lock"
                />] :
                ""
            }
            <span style={{color: "red"}}>{invalidMessage}</span>
        </FormPopup>
    </div>)
}