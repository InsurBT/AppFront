import React, {useContext} from 'react';

import ConnectedUserContext from '../context/connected-user.context';

export default function Home(props) {
    const {connectedUser} = useContext(ConnectedUserContext);

    return (<div>
        <h1>{connectedUser.nomComplet}</h1>
        <span>Nom d'utilisateur: {connectedUser.nom}</span>
    </div>)
}