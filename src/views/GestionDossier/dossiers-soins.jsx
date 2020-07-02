import React, { useState, useEffect } from 'react';

import dossierService from '../../service/dossier-service';
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button';
import Table from '../../components/table';
import FormPopup from '../../components/form-popup';
import FiltreDossier from './FiltreDossier';
import FiltreAssure from './FiltreAssure';

import FilterListIcon from '@material-ui/icons/FilterList';
import { useParams } from 'react-router-dom';
import Popup from 'reactjs-popup';

export default function DossierSoins(props) {
    // categorie de dossier chosie selon l'url
    const { category } = useParams();

    // etat des infos du dossier entrees dans le formulaire pour le filtre
    const [inputDossier, setInputDossier] = useState({
        imme: "",
        categorie: "",
        numDossier: "",
        debutSoin: "",
        formulair: "",
        convention: "",
        Agence: "",
        Direction: ""
    });

    // etat des infos de l'assure entrees dans le formulaire pour choisir l'assure
    const [inputAssure, setInputAssure] = useState({});

    // L'etat des colonne a afficher dans le tableau
    const columns = [
        { title: "Numero", property: "NumDossier" },
        { title: "Id assuré", property: "imme" },
        { title: "Debut de soin", property: "debutSoin" },
        { title: "Fin de soin", property: "finSoin" },
        { title: "Formulaire", property: "formulair" },
        { title: "Convention", property: "convention" },
        { title: "Date de reception", property: "dateReception" }
    ]

    // Etat des donnees affichees dans le taleau
    const [data, setData] = useState([]);

    // Etat des actions du tableau selon l'element du menu choisi
    const [actions, setActoins] = useState([]);

    // Etat de l'action designee
    const [action, setAction] = useState("");

    // Etat de chargement des donnees
    const [loading, setLoading] = useState(true);

    // l'etat des booleans d'affichage des formulaire pop-up
    const [formOpen, setFormOpen] = useState(false);

    const [openFiltreAssure, setOpenFiltreAssure] = useState(false);

    // chargement des dossiers selons la categorie choisie
    useEffect(() => {
        setLoading(true);
        dossierService.getDossiersEnInstance(category).then(res => {
            setData(res.dossiers);
            setActoins(res.actions);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
        });
    }, [category]); 

    function handleActions(action, dossier) {
        setAction(action);
        switch (action) {
            case "nouveau":
                console.log("Action nouveau " + dossier.imme);
                break;
            case "modifier":
                console.log("Action modifier " + dossier.imme);
                break;
            case "consulter":
                console.log("Action consulter " + dossier.imme);
                break;
            default:
                console.log("Action indisponible");
        }
        setAction("");
    }

    function closeForm() {
        setInputAssure({});
        setInputDossier({});
        setFormOpen(false);
    }

    return (<div>
          
                <Button variant="outlined" color="primary" onClick={() => { setOpenFiltreAssure(true) } }><AddIcon/></Button>
                <Button variant="outlined" color="primary" onClick={() => {setFormOpen(true)}}><FilterListIcon/></Button>
           
            {
                loading ?
                    <div>Chargement...</div> :
                    <Table
                        data={data}
                        pageSize={5}
                        buttons
                        edit={() => {}}
                        delete={() => {}}
                        columns={columns}
                        actions={actions} 
                        action={action}
                        handleAction={handleActions}
                        searchBar
                    />
            }
            <FormPopup
                open={formOpen}
                onClose={closeForm}
                button='Filtrer'
                icon={<FilterListIcon/>}
            >
                <FiltreDossier />
            </FormPopup>
            <FormPopup
                open={openFiltreAssure}
                title="Filtre Utilisateur"
                icon={<FilterListIcon/>}
                onClose={() => {setOpenFiltreAssure(false)}}
            >
                <div style={{margin: "10px"}}>
                    <FiltreAssure handleAjouter={ ({imme}) => { props.history.push("/home/dossiers/ajouter/" + imme) } } />
                </div>
            </FormPopup>
        </div>)
}