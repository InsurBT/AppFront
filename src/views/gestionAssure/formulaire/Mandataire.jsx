import React, { useState, useEffect} from 'react';
import FormMandataire from "./formMandataire";
import { makeStyles } from '@material-ui/core/styles';
import Table from '../../../components/table';
import FormPopup from '../../../components/form-popup';
import paysService from '../../../service/pays-service';
import villeService from '../../../service/ville-service';

import { IconButton, Button, formatMs } from '@material-ui/core';
import { Edit } from '@material-ui/icons';

export default function AyantDroits(props) {
    const {mandataires, setMandataires, classes} = props;

    const [openForm, setOpenForm] = useState(false);
    const [optionsVille,setOptionsVille]=useState([]);
    const today = todaysDate();
    const [inputMandataire, setInputMandataire] = useState({
        nom: "",
        prenom: "",
        CIN:"",
        RIB:"",
        mode:"",
        codepostal:"",
        datedebut: today,
        datefin:today,
        rang:"",
        adresse:"",
        ville:"",
        idville:"",
        idAssure: props.idAssure
    });

    /***********************************************************************************/
    useEffect(() => {
        console.log("le code est");
        villeService.getAll(1).then(res => {
            setOptionsVille(res);
            console.log('les villes:',res);
    }
    ); 
    }, []); 

    
 

    /****************************************************************************/
    // etat des prestation apres traitement pour adabpter a l'affichage
    const [shownMandataire, setShownMandataire] = useState([]);

    const columns = [
        {
            title: <Button
                        variant="contained"
       
                        onClick={() => {setOpenForm(true)}}
                    >Ajouter</Button>,
            property: "buttons"
        },
        { title: "Nom", property: "nom" },
        { title: "Prénom", property: "prenom" },
        { title: "Code postal", property: "codepostal"},
        { title: "CIN", property: "CIN" },
        { title: "Date debut", property: "datedebut" },
        { title: "Date fin", property: "datefin" },
        { title: "Mode de rembourcement", property: "mode" },
        { title: "RIB", property: "RIB" },
        { title: "Rang", property: "rang" },
        { title: "Adresse", property: "adresse" },
        { title: "Ville", property: "ville" }
    ];

    useEffect(() => {
        setShownMandataire(mandataires.map((prest) => {
            return {
                ...prest,
        
                buttons: [
                    <IconButton>
                        <Edit />
                    </IconButton>
                ]
            }
        }))
    }, [mandataires]);

    function todaysDate() {
        const today = new Date();

        let day = ("0" + today.getDate()).slice(-2);
        let month = ("0" + (today.getMonth() + 1)).slice(-2);
        let year = today.getFullYear();

        return [year, month, day].join('-');
    }

    
    function valider (mandataire) {
       
            setMandataires([...mandataires, mandataire]);
            console.log(mandataires);
            setOpenForm(false);
        
    }

    function fermer() {
        setInputMandataire({
            nom: "",
            prenom: "",
            CIN:"",
            RIB:"",
            mode:"",
            codepostal:"",
            datedebut: today,
            datefin:today,
            rang:"",
            adresse:"",
            ville:"",
            idville:"",
            idAssure: props.idAssure
     
        });

        setOpenForm(false);
    }

    return (
        <div>
            <Table
                data={shownMandataire}
                columns={columns}
                pageSize={4}
            />
            <FormPopup
                open={openForm}
                title={"Ajouter mandataire"}
                onClose={fermer}
            >
                <FormMandataire
                    mandataire={inputMandataire}
                    setMandataire={setInputMandataire}
                    valider={valider}
                    fermer={fermer}
                    optionsVille={optionsVille}
                    setOptionsVille={setOptionsVille}
                />
            </FormPopup>
        </div>
    );
}
