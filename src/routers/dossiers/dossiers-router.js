import React from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import DossierSoins from '../../views/GestionDossier/dossiers-soins';
import AjouterAssure from '../../views/GestionAssure/StepperAssure/StepperAssure';
import gestionAyantDroit from '../../views/GestionAssure/StepperAssure/GestionAyantDroit'
import AjouterDossier from '../../views/GestionDossier/AjouterDossier';

export default function DossiersRouter(props) {
    const {path, url} = useRouteMatch();

    return (
        <Switch>
            <Route path={path + "/ajouter/:idAssure"} component={AjouterDossier} />
            <Route path={path + "/:category"} component={DossierSoins} />
            
            <Redirect from={path} to={path + "/en_instance"} />
        </Switch>
    )
}