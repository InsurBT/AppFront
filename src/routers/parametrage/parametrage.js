import React from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';

export default function DossiersRouter(props) {
    const {path, url} = useRouteMatch();

    return (
        <Switch>
            {
                props.subRoutes.map(route => {
                    return (<Route path={path + route.path} component={route.component} />)
                })
            }
            <Redirect from={path} to="/home/parametrage/utilisateurs" />
        </Switch>
    )
}