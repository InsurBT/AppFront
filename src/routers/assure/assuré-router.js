import React from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import ListeAssure from '../../views/gestionAssure/listeAssure'
import stepperAssure from  '../../views/gestionAssure/StepperAssure/StepperAssure'
import gestionAyantDroit from '../../views/gestionAssure/StepperAssure/GestionAyantDroit'


export default function AssureRouter(props) {
    const {path, url} = useRouteMatch();

    return (
        <Switch>
          
            <Route path={path + "/ajouterAssure"} component={stepperAssure} />
            <Route path={path + "/gererAyantDroit"} component={gestionAyantDroit} />
            <Route path={path + "/"} exact component={ListeAssure} />
            
        </Switch>
    )
}