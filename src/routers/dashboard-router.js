import React, { useState, useContext } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Home from '../views/home';
import ListePrestations from '../views/liste-prestations';
import ListeUtilisateurs from '../views/list-utlisateurs';
import DossierSoins from '../views/dossiers-soins';

import SideNav from '../components/side-nav';
import PageHeader from '../components/page-header';
import Button from '../components/form-button';

import utilisateurService from '../service/utilisateur-service';

import PrestationsContext from '../context/PrestationsContext';
import ConnectedUserContext from '../context/connected-user.context';

export default function DashboardRouter(props) {    
    const { path, url } = useRouteMatch();

    const routes = [
        { name: "Accueil", path: "/home" },
        { name: "Listes des prestations", path: url + "/prestations"},
        { name: "Listes des utilisateurs", path: url + "/utilisateurs"},
        { name: "Listes des dossiers de soins", path: url + "/dossiers"}
    ];

    const [prestations, setPrestations] = useState([]);

    const value = {prestations, setPrestations};

    const {connectedUser, setConnectedUser} = useContext(ConnectedUserContext);

    function deconnexion() {
        utilisateurService.disconnect().then(res => {
            if (res.ok) {
                setConnectedUser(null);
                sessionStorage.removeItem("authToken");
                props.history.push("/login");
            }
        });
    }

    return (<div style={{width: "100vw"}}>
        <PageHeader title="Application CNSS"><Button onClick={deconnexion}>Deconnexion</Button></PageHeader>
        <div style={{display: "flex"}}>
            <SideNav routes={routes}>
                <Switch>
                    <PrestationsContext.Provider value={value}>
                        <Route exact path={path}>
                            <Home />
                        </Route>
                        <Route path={url + "/prestations"} >
                            <ListePrestations />
                        </Route>
                        <Route path={url + "/utilisateurs"} >
                            <ListeUtilisateurs />
                        </Route>
                        <Route path={url + "/dossiers"} >
                            <DossierSoins />
                        </Route>
                    </PrestationsContext.Provider>
                </Switch>
            </SideNav>
        </div>
    </div>)
}