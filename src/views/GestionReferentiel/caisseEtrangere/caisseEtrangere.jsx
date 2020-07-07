import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '../../../components/table';
import SmallHeader from '../../../components/small-header';
import FormPopup from '../../../components/form-popup';
import TextInput from '../../../components/text-input';

import FiltreCaisseE from './FiltreCaisseEtrangere';
import {TextField , CircularProgress , Grid , Button} from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';


import CaisseEtrangereService from '../../../service/caisseEtrangere-service';
import paysService from '../../../service/pays-service';
import villeService from '../../../service/ville-service';
import { useEffect } from 'react';
import TextInputselect from '../../../components/text-input-select';

export default function ListeCaisseEtrangeres(props) {
    const useStyles = makeStyles((theme) => ({
        button : {
            backgroundColor : '#B3D9FF',
            '&:hover' : {
            backgroundColor : "#1A8CFF"
            }
        }
    }));
        
    const classes = useStyles();
    
    //chargement des données
    const [data, setData] = useState([]);

    //chargement des options des pays
    const [options,setOptions] = useState([]);
     
    //chargement des options des villes
    const [optionsVille,setOptionsVille] = useState([]);

    //chargement des options des villes
    const [optionsVilleFiltre,setOptionsVilleFiltre] = useState([]);


    // l'etat de chargement des donnees
    const [loading, setLoading] = useState(true);
    
    // l'etat des valeur de l'input formulaire
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
    
    //l'etat des valeurs de l'input filtre
    const [inputFiltre, setInputFiltre] = useState({
        code: "",
        nom: "",
        idpays: "",
        pays:"",
        ville:"",
        id:""
    });

    //L'etat de chargement du resultats de filtre
    const [dataFiltre,setDataFiltre] = useState([])

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
            setDataFiltre(res);
            setLoading(false);
            console.log('caisse',res);
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

    useEffect(() => {
        console.log("le code est filtre",inputFiltre.idpays);
        villeService.getAll(inputFiltre.idpays).then(res => {
            setOptionsVilleFiltre(res);
            console.log('les villes:',res);
    }
    ); 
    }, [inputFiltre.idpays]); 

    /****************************************************************************/

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
     /*******************Filtre Caisse Etrangere*********************************/
    function filtrer() {
        setLoading(true);
        CaisseEtrangereService.getFiltredCaisse(inputFiltre,dataFiltre).then(res => {
            setData(res);
            console.log("filtre",res);
            setLoading(false);
            clearInputFiltre();
        })
    };

    

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

    function clearInputFiltre() {
        setInputFiltre({
            code: NaN,
            nom: "",
            idpays: "",
            pays:"",
            ville:"",
            id:"",
        
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
            <Button className={classes.button}  onClick={() => {setFormMode("AJOUTER")}}>Ajouter </Button>
        </SmallHeader>

        {/*Filtre caisse etrangere */}


        <FiltreCaisseE 
        inputFiltre={inputFiltre} setInputFiltre={setInputFiltre}
        filtrer={filtrer}
        options={options} setOptions={setOptions}
        optionsVille={optionsVilleFiltre} setOptionsVille={setOptionsVilleFiltre}/>

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
            fullWidth
                type="text"
                label="Nom"
                value={input.nom}
                onChange={(e) => {setInput({...input, nom: e.target.value})}}
                icon="none"
            />
            <TextField
            fullWidth
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
                    idpays: e.target.value,
                    pays: options.find(options => options.id === parseInt(e.target.value)).nom})}
                
                }
                icon="none"
            />
            <TextInputselect
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
    
            <TextField
            fullWidth
                type="text"
                label="Téléphone"
                value={input.telephone}
                onChange={(e) => {setInput({...input, telephone: e.target.value})}}
                icon="none"
            />
          
            <TextField
            fullWidth
                type="text"
                label="Fax"
                value={input.fax}
                onChange={(e) => {setInput({...input, fax: e.target.value})}}
                icon="none"
            />
            <TextField
            fullWidth
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