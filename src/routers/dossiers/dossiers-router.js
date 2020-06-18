import React from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import DossierSoins from '../../views/GestionDossier/dossiers-soins';
import AjouterDossier from '../../views/GestionDossier/steppreFiltre';
import ListeAssure from '../../views/GestionAssure/listeAssure';
import FiltreAssure from '../../views/GestionAssure/filtreAssure'
import StepperAssure from '../../views/GestionAssure/StepperAssure/StepperAssure'




export default function DossiersRouter(props) {
    const {path, url} = useRouteMatch();

    return (
        <Switch>
            <Route path={path + "/ajouter"} component={AjouterDossier} />
            <Route path={path + "/listeAssure"} component={ListeAssure} />
            <Route path={path + "/filtreAssure"} component={FiltreAssure} />
            <Route path={path + "/stepperAssure"} component={StepperAssure} />
            <Route path={path + "/:category"} component={DossierSoins} />
            
        </Switch>
    )
}