import React, { useState, useContext } from 'react';

import Table from '../../../components/table';
import { makeStyles } from '@material-ui/core/styles';
import SmallHeader from '../../../components/small-header';
import FormPopup from '../../../components/form-popup';
import TextInput from '../../../components/text-input';
import Button from '@material-ui/core/Button';
import paysService from '../../../service/pays-service';
import FiltreCaisseM from './FiltreCaisseMere';
import TextField from '@material-ui/core/TextField';
import TextInputselect from '../../../components/text-input-select';
import CaisseMereService from '../../../service/caisseMere-service';
import { useEffect } from 'react';
import Add from '@material-ui/icons/Add';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';

export default function ListeCaisseMeres(props) {

    const useStyles = makeStyles((theme) => ({
        button : {
            backgroundColor : '#B3D9FF',
            '&:hover' : {
            backgroundColor : "#1A8CFF"
            }
        }
    }));
        
    const classes = useStyles();
    
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
                console.log(res)
            }
        })
    }, []);

    useEffect(() => {
        switch (formMode) {
            case "AJOUTER":
                setFormParams({
                    icon: <Add/>,
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
                    icon: <Edit/>,
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
                    icon: <Delete/>,
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
            <Button variant="contained" className={classes.button} onClick={() => {setFormMode("AJOUTER")}}>Ajouter </Button>
           
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
            <TextField
                type="text"
                label="Nom"
                value={input.nom}
                onChange={(e) => {setInput({...input, nom: e.target.value})}}
                icon="none"
            />
            <TextField
                type="text"
                label="Adresse"
                value={input.adresse}
                onChange={(e) => {setInput({...input, adresse: e.target.value})}}
                icon="none"
            />
       
           <TextInputselect
                type="select"
                options={options.map(option => ({value:option.id, label:option.label}))}
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