import React, { useState, useEffect } from 'react';
import mondataireService from '../../../../service/modataire-service' ;
import Button from '@material-ui/core/Button';
import Table from '../../../../components/table';

import { useParams } from 'react-router-dom';
import { ButtonGroup } from '@material-ui/core';

export default function ListeMondataire(props) {
    // categorie d'assuré chosie selon l'url
    const { category } = useParams();

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


    // chargement des assurés selons la categorie choisie
    useEffect(() => {
        console.log(category);
        setLoading(true);
        mondataireService.getMondataireEnInstance(category).then(res => {
            let newColumns = [];
            for (var attribute in res.mondataire[0]) {
                newColumns.push({
                    title: attribute,
                    property: attribute
                });
            }
            setData(res.mondataire);
            setColumns(newColumns);
            setActoins(res.actions);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
        });
    }, [category]);

    function handleActions(action, mondataire) {
        setAction(action);
        switch (action) {
            case "nouveau":
                console.log("Action nouveau " + mondataire);
                break;
            case "modifier":
                console.log("Action nouveau " + mondataire);
                break;
            default:
                console.log("Action indisponible");
        }
        setAction("");
    }

    return (<div>
            
            {
                loading ?
                    <div>Chargement...</div> :
                    <Table
                        data={data}
                        pageSize={3}
                        buttons
                        edit={() => {}}
                        delete={() => {}}
                        columns={columns}
                        actions={actions} 
                        action={action}
                        handleAction={handleActions}
                    />
            }
            
        </div>)
}