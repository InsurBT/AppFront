import React, { useState, useEffect } from 'react';
import AyantDroitService from '../../../service/ayantDroit-service' ;
import Button from '@material-ui/core/Button';
import Table from '../../../components/table';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/Add'
import { ButtonGroup, Icon } from '@material-ui/core';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

export default function ListeAyantDroit(props) {

    // L'etat des colonne a afficher dans le tableau
    const [columns, setColumns] = useState([]);

    // Etat des donnees affichees dans le taleau
    const [data, setData] = useState([]);
   

  

    // Etat de chargement des donnees
    const [loading, setLoading] = useState(true);

    // chargement des assurés
    useEffect(() => {
        
        setLoading(true);
        AyantDroitService.getAyantDroitEnInstance().then(res => {
            let newColumns = [];
            for (var attribute in res.ayantDroit[0]) {
                newColumns.push({
                    title: attribute,
                    property: attribute
                });
            }

            let ayantDroit = res.ayantDroit.map(ayantDroit => ({
                ...ayantDroit
                
                 
                    
            }))
            setData(ayantDroit);
            setColumns(newColumns);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

   
    return (<div>
           
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
                        searchBar
                    />
            }
        </div>)
}