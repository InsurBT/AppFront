import React, { useState, useEffect } from 'react';
import assureService from '../../service/assure-service' ;
import Table from '../../components/table';
import FormPopup from '../../components/form-popup';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/Add'
import FiltreAssure from './filtreAssure';
import { Link } from 'react-router-dom';
import { ButtonGroup,Button, Icon , Grid , CircularProgress} from '@material-ui/core';
import Person from '@material-ui/icons/Person';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

export default function ListeAssure(props) {

    // L'etat des colonne a afficher dans le tableau
    const columns = [
        { title: "ImmCNSS", property: "ImmCNSS" },
        { title: "Nom", property: "nom" },
        { title: "Prénom", property: "prenom" },
        { title: "CIN", property: "CIN" },
        { title: "ImmCE", property: "ImmCE" },
        { title: "Adresse", property: "adresse" },
        { title: "RIB", property: "RIB" },
        { title: "Date réception", property: "dateReception" },
        { title: "Debut couverture", property: "debutCouverture" },
        { title: "Fin couverture", property: "finCouverture" },
        { title: "Ayants droits", property: "nbrayantDroit" }
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

    // chargement des assurés
    useEffect(() => {
        
        setLoading(true);
        assureService.getAll().then(res => {

            let assures = res.assures.map(assure => ({
                ...assure,
                nbrayantDroit: <Link to="/home/gestionAssure/gererAyantDroit" >
                    {assure.nbrayantDroit}                   
                       <Icon>
                     &nbsp; 
                        <SupervisorAccountIcon />
                    </Icon>
                </Link>
            }))
            setData(assures);
            setActoins(res.actions);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    function handleActions(action, assure) {
        setAction(action);
        switch (action) {
            case "nouveau":
                console.log("Action nouveau " + assure.imme);
                break;
            case "consulter":
                console.log("Action consulter " + assure.imme);
                break;
            default:
                console.log("Action indisponible");
        }
        setAction("");
    }

    return (<div>
            <ButtonGroup color="primary">
                <Button onClick={() =>  {props.history.push("/home/gestionAssure/ajouterAssure")}}>
                    <AddIcon />
                </Button>
                <Button onClick={() => {setFormOpen(true)}}>
                    <FilterListIcon />
                </Button>
            </ButtonGroup>
            {
                loading ?
                <Grid item container justify="center" xs="12">
                    <Grid item style={{margin: "10px"}}>
                        <CircularProgress />
                    </Grid>
                </Grid> :
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
                onClose={() => {setFormOpen(false)}}
                button='Filtrer'
                icon = {<FilterListIcon/>}
            >
                <FiltreAssure/>
            </FormPopup>
        </div>)
}