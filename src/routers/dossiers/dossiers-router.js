import React from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import DossierSoins from '../../views/GestionDossier/dossiers-soins';
import AjouterDossier from '../../views/GestionDossier/steppreFiltre';
import StepperAssure from '../../views/GestionAssure/StepperAssure/stepperAssure';
import StepperAssurePrincipale from '../../views/GestionAssure/StepperAssure/StepperAssurePrincipale/stepperAssurePrincipale'

export default function DossiersRouter(props) {
    const {path, url} = useRouteMatch();

    return (
        <Switch>
            <Route path={path + "/ajouter"} component={AjouterDossier} />
            <Route path={path + "/stepperAssure"} component={StepperAssure} />
            <Route path={path + "/stepperAssurePrincipale"} component={StepperAssurePrincipale} />
            <Route path={path + "/:category"} component={DossierSoins} />
            
            <Redirect from={path} to={path + "/en_instance"} />
        </Switch>
    )
}