import React, { useState, useContext } from 'react';

import Table from '../../components/table';
import SmallHeader from '../../components/small-header';
import FormPopup from '../../components/form-popup';
import TextInput from '../../components/text-input';
import FormButton from '../../components/form-button';
import paysService from '../../service/pays-service';
import FiltreCaisseM from './FiltreCaisseMere';

import CaisseMereService from '../../service/caisseMere-service';
import { useEffect } from 'react';

export default function ListeCaisseMeres(props) {
    
    const [data, setData] = useState([]);

    const [options,setOptions] = useState([]);

    // l'etat de chargement des donnees
    const [loading, setLoading] = useState(true);
    
    // l'etat des valeur de l'input
    const [input, setInput] = useState({
        code: NaN,
        nom: "",
        adresse: "",
        id: "",
        pays:""
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
        { title: "Pays", property: "pays" },
    ];
    //********************************************************************** */

    useEffect(() => {
        CaisseMereService.getAll().then(res => {
            setData(res);
            setLoading(false);
        });
        paysService.getAll().then(res => {
            if (typeof res === "string") {
                console.log(res);
            } else {
                setOptions(res);
            }
        })
    }, []);

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
            CaisseMereService.add(input).then(res => {
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
            CaisseMereService.delete(CE.code).then(res => {
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
            CaisseMereService.edit(input).then(res => {
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

    function openEditForm(CM) {
        setInput(CM);
        setFormMode("MODIFIER");
    }

    function openDeleteForm(CM) {
        setInput(CM);
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
            id: "",
            pays:""
        })
    }

    function closeForm() {
        clearInput();
        setInvalidMessag("");
        setFormMode("FEREMER");
    }

    
    return (<div>
        <SmallHeader>
            Liste des caisses mère
            <FormButton onClick={() => {setFormMode("AJOUTER")}}>Ajouter </FormButton>
           
        </SmallHeader>
        <FiltreCaisseM options={options}/>

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
                    id: e.target.value,
                    pays: options.find(options => options.id === parseInt(e.target.value)).nom})}}
                icon="none"
            />
            <span style={{color: "red"}}>{invalidMessage}</span>
        </FormPopup>
    </div>)
}