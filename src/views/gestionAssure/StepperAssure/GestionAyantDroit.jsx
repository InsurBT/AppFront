import React, { useState, useEffect } from 'react';
import AyantDroitService from '../../../service/ayantDroit-service' ;
import Table from '../../../components/table';
import { CircularProgress, Grid } from '@material-ui/core';

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
                        searchBar
                    />
            }
        </div>)
}