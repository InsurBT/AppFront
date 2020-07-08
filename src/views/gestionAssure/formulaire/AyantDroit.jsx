import React, { useState, useEffect} from 'react';
import FormAyantDroit from "./formAyantDroit";
import { makeStyles } from '@material-ui/core/styles';
import Table from '../../../components/table';
import FormPopup from '../../../components/form-popup';
import paysService from '../../../service/pays-service';
import villeService from '../../../service/ville-service';

import { IconButton, Button } from '@material-ui/core';
import { Edit } from '@material-ui/icons';

export default function AyantDroits(props) {
    const {ayantDroits, setAyantDroits, classes} = props;

    const [openForm, setOpenForm] = useState(false);
    const [options,setOptions]=useState([]);
    const [optionsVille,setOptionsVille]=useState([]);
    const today = todaysDate();
    const [inputAyantDroit, setInputAyantDroit] = useState({
        nom: "",
        prenom: "",
        nomJeuneFille: "",
        lienDeparente:"",
        CIN:"",
        age:"",
        sexe:"",
        status:"",
        DateNaissance: today,
        DateInscription:today,
        ImmCNSS:"",
        rang:"",
        pays:"",
        idpays:"",
        ville:"",
        idville:"",
        idAssure: props.idAssure
    });
    useEffect(() => {
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
        console.log("le code est",inputAyantDroit.idpays);
        villeService.getAll(inputAyantDroit.idpays).then(res => {
            setOptionsVille(res);
            console.log('les villes:',res);
    }
    ); 
    }, [inputAyantDroit.idpays]); 

    
 

    /****************************************************************************/
    // etat des prestation apres traitement pour adabpter a l'affichage
    const [shownAyantDroit, setShownAyantDroit] = useState([]);

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
        { title: "Nom jeune fille", property: "nomJeuneFille" },
        { title: "Lien de parenté", property: "lienDeparente"},
        { title: "CIN", property: "CIN" },
        { title: "Age", property: "age" },
        { title: "Sexe", property: "sexe" },
        { title: "Date de naissance", property: "DateNaissance" },
        { title: "Date inscription", property: "DateInscription" },
        { title: "Imm CNSS", property: "ImmCNSS" },
        { title: "Rang", property: "rang" },
        { title: "Pays", property: "pays" },
        { title: "Ville", property: "ville" }
    ];

    useEffect(() => {
        setShownAyantDroit(ayantDroits.map((prest) => {
            return {
                ...prest,
        
                buttons: [
                    <IconButton>
                        <Edit />
                    </IconButton>
                ]
            }
        }))
    }, [ayantDroits]);

    function todaysDate() {
        const today = new Date();

        let day = ("0" + today.getDate()).slice(-2);
        let month = ("0" + (today.getMonth() + 1)).slice(-2);
        let year = today.getFullYear();

        return [year, month, day].join('-');
    }

    
    function valider (ayantDroit) {
       
            setAyantDroits([...ayantDroits, ayantDroit]);
            console.log(ayantDroits);
            setOpenForm(false);
        
    }

    function fermer() {
        setInputAyantDroit({
            ayantDroit: {
                nom: "",
                prenom: "",
                nomJeuneFille: "",
                lienDeparente:"",
                CIN:"",
                age:"",
                sexe:"",
                DateNaissance:today,
                DateInscription:today,
                ImmCNSS:"",
                rang:"",
                pays:"",
                idpays:"",
                ville:"",
                idville:""
            },
            idAssure: props.idAssure
     
        });

        setOpenForm(false);
    }

    return (
        <div>
            <Table
                data={shownAyantDroit}
                columns={columns}
                pageSize={4}
            />
            <FormPopup
                open={openForm}
                title={"Ajouter mandataire"}
                onClose={fermer}
            >
                <FormAyantDroit
                    ayantDroit={inputAyantDroit}
                    setAyantDroit={setInputAyantDroit}
                    valider={valider}
                    fermer={fermer}
                    options={options}
                    setOptions={setOptions}
                    optionsVille={optionsVille}
                    setOptionsVille={setOptionsVille}
                />
            </FormPopup>
        </div>
    );
}
