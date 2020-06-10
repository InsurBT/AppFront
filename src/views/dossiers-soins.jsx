import React, { useState, useEffect } from 'react';

import dossierService from '../service/dossier-service';

import Button from '@material-ui/core/Button';
import NavigationButton from '../components/navigation-button';
import Table from '../components/table';
import SmallHeader from '../components/small-header';

import Grid from '@material-ui/core/Grid';

export default function DossierSoins(props) {
    // L'etat des colonne a afficher dans le tableau
    const [columns, setColumns] = useState([]);

    // Etat des donnees affichees dans le taleau
    const [data, setData] = useState([]);

    // Etat de l'element du menu choisi
    const [selected, setSelected] = useState(0);

    // Etat des actions du tableau selon l'element du menu choisi
    const [actions, setActoins] = useState([]);

    // Etat de l'action designee
    const [action, setAction] = useState("");

    // Etat du menu
    const [menu, setMenu] = useState([]);

    // Etat de chargement des donnees
    const [loading, setLoading] = useState(true);

    // chargement des dossiers selons la categorie choisie
    useEffect(() => {
        setLoading(true);
        dossierService.getDossiersEnInstance(menu[selected]).then(res => {
            let newColumns = [];
            for (var attribute in res.dossiers[0]) {
                newColumns.push({
                    title: attribute,
                    property: attribute
                });
            }
            setData(res.dossiers);
            setColumns(newColumns);
            setActoins(res.actions);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
        });
    }, [selected]);

    // chargement du menu des categories disponible 
    useEffect(() => {
        dossierService.getMenu().then(res => {
            setMenu(res);
        })
    }, []);

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

    return (<Grid container wrap="nowrap">
        <Grid item>
            <nav style={{display: "flex", flexDirection:"column"}}>
                <SmallHeader>Dossiers de soins</SmallHeader>
                <Button variant="contained" style={{margin: "5px"}} color="primary">Nouveau</Button>
                {
                    menu.map((element, index) => {
                        return (<NavigationButton selected={index === selected} onClick={() => {setSelected(index);}}>
                            {element}
                        </NavigationButton>)
                    })
                }
            </nav>
        </Grid>
        <Grid item zeroMinWidth>
            {
                loading ?
                    <span>Chargement...</span> :
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
                    />
            }
        </Grid>
    </Grid>)
}