import React, {useContext, useEffect, useState} from 'react';

import ConnectedUserContext from '../context/connected-user.context';

import utilisateurService from '../service/utilisateur-service';

export default function Home(props) {
    const {connectedUser, setConnectedUser} = useContext(ConnectedUserContext);

    const [loading, setLoading] = useState(connectedUser === null);

    useEffect(() => {
        if (!connectedUser) {
            utilisateurService.getLoggedUser().then((res) => {
                if (typeof res === "string") {
                    props.history.push("/login");
                } else {
                    setConnectedUser(res);
                    setLoading(false);
                }
            }).catch((err) => {

            })
        }
    }, []);

    return (<div>
        {
            loading ?
                <div>chargement...</div> :
                <div>
                    <h1>{connectedUser.nomComplet}</h1>
                    <span>Nom d'utilisateur: {connectedUser.nom}</span>
                </div>
        }
    </div>)
}