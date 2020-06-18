import React, { useState, useContext } from 'react';

import Table from '../../../components/table';
import SmallHeader from '../../../components/small-header';
import FormPopup from '../../../components/form-popup';
import TextInput from '../../../components/text-input';
import FormButton from '../../../components/form-button';

import FiltreCaisseE from './FiltreCaisseEtrangere';


import CaisseEtrangereService from '../../../service/caisseEtrangere-service';
import paysService from '../../../service/pays-service';
import villeService from '../../../service/ville-service';
import { useEffect } from 'react';

export default function ListeCaisseEtrangeres(props) {
    
    const [data, setData] = useState([]);

    const [options,setOptions] = useState([]);

    const [optionsVille,setOptionsVille] = useState([]);

    // l'etat de chargement des donnees
    const [loading, setLoading] = useState(true);
    
    // l'etat des valeur de l'input
    const [input, setInput] = useState({
        code: NaN,
        nom: "",
        adresse: "",
        idpays: "",
        pays:"",
        ville:"",
        id:"",
        telephone:"",
        fax:"",
        email:""
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
        { title: "Code", property: "code" },
        { title: "Nom", property: "nom" },
        { title: "Adresse", property: "adresse" },
        { title: "Ville", property: "ville" },
        { title: "Pays", property: "pays" },
    ];
    //********************************************************************** */

    useEffect(() => {
        CaisseEtrangereService.getAll().then(res => {
            setData(res);
            setLoading(false);
        });
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

    /****************************************************************************/

    useEffect(() => {
        switch (formMode) {
            case "AJOUTER":
                setFormParams({
                    icon: "plus",
                    title: "Ajouter",
                    button: "Ajouter",
                    onSubmit: (e) => {
                        e.preventDefault();
                        addCaisse();
                    },
                    open: true
                });
                break;
            case "MODIFIER":
                setFormParams({
                    icon: "edit",
                    title: "Modifier",
                    button: "Modifier",
                    onSubmit: (e) => {
                        e.preventDefault();
                        editCaisse(input.code);
                    },
                    open: true
                });
                break;
            case "SUPPRIMER":
                setFormParams({
                    icon: "trash",
                    title: "Supprimer",
                    button: "Supprimer",
                    onSubmit: (e) => {
                        e.preventDefault();
                        deleteCaisse(input);
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
    }, [formMode, input]);
    

    function addCaisse() {
        if (validForm()) {
            CaisseEtrangereService.add(input).then(res => {
                if (typeof res === "string") {
                    setInvalidMessag(res);
                } else {
                    console.log(res);
                    setData(res);
                    closeForm();
                }
            }).catch(err => {
                setInvalidMessag("probleme de connexion au serveur");
            });
        } else
            setInvalidMessag("Donnees entrees invalide!");
    }



    function deleteCaisse(CE) {
        if (window.confirm("Voulez supprimer cette ligne?")) {
            let newData = [];
            CaisseEtrangereService.delete(CE.code).then(res => {
                if (res === true) {
                    newData = data.filter((row) => row !== CE);
                    setData(newData);
                    closeForm();
                } else {
                    setInvalidMessag("l'element n'a pas ete supprimer");
                }
            });
        }
    }

    function editCaisse(code) {
        if (validForm()) {
            CaisseEtrangereService.edit(input).then(res => {
                if (res === true) {
                    const index = data.findIndex((row) => row.code === code);
                    const newData = [...data];
                    newData.splice(index, 1, input);
                    setData(newData);
                    closeForm();
                } else {
                    setInvalidMessag("l'element n'a pas ete modifier");
                }
            })
        } else
            setInvalidMessag("Donnees entrees invalide!");
    }

    function openEditForm(CE) {
        setInput(CE);
        setFormMode("MODIFIER");
    }

    function openDeleteForm(CE) {
        setInput(CE);
        setFormMode("SUPPRIMER");
    }

    function validForm() {
        return (
            input.nom !== "" &&
            input.adresse !== "" &&
            !isNaN(parseInt(input.id))
        ) 
    }

    function clearInput() {
        setInput({
            code: NaN,
            nom: "",
            adresse: "",
            idpays: "",
            pays:"",
            ville:"",
            id:"",
            telephone:"",
            fax:"",
            email:""
        })
    }

    function closeForm() {
        clearInput();
        setInvalidMessag("");
        setFormMode("FEREMER");
    }

    
    return (<div>
        <SmallHeader>
            Liste des caisses étrangere
            <FormButton onClick={() => {setFormMode("AJOUTER")}}>Ajouter </FormButton>
        </SmallHeader>
        <FiltreCaisseE />

        {/* Tableau des donnees */}
        {
            loading ?
                <div>Chargement...</div> :
                <Table
                    columns={columns}
                    data={data}
                    buttons
                    delete={openDeleteForm}
                    edit={openEditForm} />
        }

        {/* Formulaire d'ajout ou de modification */}
        <FormPopup
            {...formParams}
            onClose={closeForm}
        >
            <TextInput
                type="text"
                label="Nom"
                value={input.nom}
                onChange={(e) => {setInput({...input, nom: e.target.value})}}
                icon="none"
            />
            <TextInput
                type="text"
                label="Adresse"
                value={input.adresse}
                onChange={(e) => {setInput({...input, adresse: e.target.value})}}
                icon="none"
            />
       
           <TextInput
                type="select"
                options={options.map(option => ({value:option.id, label:option.nom}))}
                label="Pays"
                currentValue={input.pays}
                onChange={(e) => {setInput({
                    ...input,
                    idpays: e.target.value,
                    pays: options.find(options => options.id === parseInt(e.target.value)).nom})}
                
                }
                icon="none"
            />
            <TextInput
                type="select"
                options={optionsVille.map(option => ({value:option.id, label:option.nom}))}
                label="Ville"
                currentValue={input.ville}
                onChange={(e) => {setInput({
                    ...input,
                    id: e.target.value,
                    ville: optionsVille.find(options => options.id === parseInt(e.target.value)).nom})}
                
                }
                    
                icon="none"
            />
    
            <TextInput
                type="text"
                label="Téléphone"
                value={input.telephone}
                onChange={(e) => {setInput({...input, telephone: e.target.value})}}
                icon="none"
            />
          
            <TextInput
                type="text"
                label="Fax"
                value={input.fax}
                onChange={(e) => {setInput({...input, fax: e.target.value})}}
                icon="none"
            />
            <TextInput
                type="text"
                label="E-mail"
                value={input.email}
                onChange={(e) => {setInput({...input, email: e.target.value})}}
                icon="none"
            />
            <span style={{color: "red"}}>{invalidMessage}</span>
        </FormPopup>
    </div>)
}