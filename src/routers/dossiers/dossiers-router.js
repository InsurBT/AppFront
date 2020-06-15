import React from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import DossierSoins from '../../views/dossier/dossiers-soins';
import AjouterDossier from '../../views/dossier/steppreFiltre';



export default function DossiersRouter(props) {
    const {path, url} = useRouteMatch();

    return (
        <Switch>
            <Route path={path + "/ajouter"} component={AjouterDossier} />
            <Route path={path + "/:category"} component={DossierSoins} />
            
        </Switch>
    )
}