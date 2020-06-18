import React from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import DirectionReg from '../../views/referentiel/listeDirectionReg';
import ListePrestation from '../../views/referentiel/liste-prestations';
import FormPrestation from '../../views/prestation/formPrestation'



export default function DossiersRouter(props) {
    const {path, url} = useRouteMatch();

    return (
        <Switch>
            {
                props.subRoutes.map(route => {
                    return <Route path={path + route.path} component={route.component} />
                })
            }
            <Redirect from={path} to={path + "/direction_regionale"} />
        </Switch>
    )
}