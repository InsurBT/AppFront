import React, { useState, useEffect} from 'react';
import FormPrestation from './formPrestation'
import { makeStyles } from '@material-ui/core/styles';
import Table from '../../../components/table';
import FormPopup from '../../../components/form-popup';

import { IconButton, Button } from '@material-ui/core';
import { Edit } from '@material-ui/icons';

export default function Prestations(props) {
    const {prestations, setPrestations, classes} = props;

    const [openForm, setOpenForm] = useState(false);

    const [inputPrestation, setInputPrestation] = useState({
        prestation: {
            type: "",
            tarif: 0,
            tauxRemboursement: 0
        },
        numDossier: props.numDossier,
        nbrActes: 0,
        montantEngage: 0,
        remboursable: true,
        motif: "",
        montantRembourse: 0
    });

    // etat des prestation apres traitement pour adabpter a l'affichage
    const [shownPrestation, setShownPresation] = useState([]);

    const columns = [
        {
            title: <Button
                        variant="contained"
                        className={classes.button}
                        onClick={() => {setOpenForm(true)}}
                    >Ajouter</Button>,
            property: "buttons"
        },
        { title: "Prestation", property: "prestation" },
        { title: "Nbr Actes", property: "nbrActes" },
        { title: "Montant Engagé", property: "montantEngage" },
        { title: "Montant remboursé", property: "montantRembourse"},
        { title: "Remboursable", property: "remboursable" },
        { title: "Motif", property: "motif" }
    ];

    useEffect(() => {
        setShownPresation(prestations.map((prest) => {
            return {
                ...prest,
                prestation: prest.prestation.type,
                remboursable: prest.remboursable ? "Oui" : "Non",
                buttons: [
                    <IconButton>
                        <Edit />
                    </IconButton>
                ]
            }
        }))
    }, [prestations]);

    function isValid(prestation) {
        return (
            prestation.prestation.type !== "" &&
            prestation.nbrActes > 0 &&
            prestation.montantEngage > 0
        )
    }

    function valider (prestation) {
        if (isValid(prestation)) {
            setPrestations([...prestations, prestation]);
            setOpenForm(false);
        }
    }

    function fermer() {
        setInputPrestation({
            prestation: {
                type: "",
                tarif: 0,
                tauxRemboursement: 0
            },
            nbrActes: 0,
            montantEngage: 0,
            remboursable: true,
            motif: "",
            montantRembourse: 0
        });

        setOpenForm(false);
    }

    return (
        <div>
            <Table
                data={shownPrestation}
                columns={columns}
                pageSize={4}
            />
            <FormPopup
                open={openForm}
                title={"Ajouter Prestation"}
                onClose={fermer}
            >
                <FormPrestation
                    prestation={inputPrestation}
                    setPrestation={setInputPrestation}
                    valider={valider}
                    fermer={fermer}
                />
            </FormPopup>
        </div>
);
}
