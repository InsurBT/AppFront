import React, { useState, useEffect } from 'react';
import assureService from '../../service/assure-service' ;
import Button from '@material-ui/core/Button';
import Table from '../../components/table';
import FormPopup from '../../components/form-popup';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/Add'
import FiltreAssure from './filtreAssure';
import { Link } from 'react-router-dom';
import { ButtonGroup, Icon } from '@material-ui/core';
import Person from '@material-ui/icons/Person';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

export default function ListeAssure(props) {

    // L'etat des colonne a afficher dans le tableau
    const [columns, setColumns] = useState([]);

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
            let newColumns = [];
            for (var attribute in res.assures[0]) {
                newColumns.push({
                    title: attribute,
                    property: attribute
                });
            }

            let assures = res.assures.map(assure => ({
                ...assure,
                ayantsDroit: <Link to="#" >
                    {assure.ayantsDroit}
                    
                    <Icon>
                       &nbsp; 
                        <SupervisorAccountIcon />
                    </Icon>
                </Link>
            }))
            setData(assures);
            setColumns(newColumns);
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
                onClose={() => {setFormOpen(false)}}
                button='Filtrer'
            >
                <FiltreAssure/>
            </FormPopup>
        </div>)
}