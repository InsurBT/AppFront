import React from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import DossierSoins from '../../views/GestionDossier/dossiers-soins';
import gestionAyantDroit from '../../views/GestionAssure/StepperAssure/GestionAyantDroit'
import AjouterDossier from '../../views/GestionDossier/AjouterDossier';
import StepperAssurePrincipale from '../../views/GestionAssure/StepperAssure/StepperAssurePrincipale/StepperAssurePrincipale';

export default function AssureRouter(props) {
    const {path, url} = useRouteMatch();

    return (
        <Switch>
            <Route path={path + "/ajouter"} component={StepperAssurePrincipale} />
            <Route path={path + "/gererAyantDroit"} component={gestionAyantDroit} />
            <Route path={path + "/:category"} component={DossierSoins} />
            
            <Redirect from={path} to={path + "/en_instance"} />
        </Switch>
    )
}