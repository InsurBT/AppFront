import React, {useContext, useEffect, useState} from 'react';

import ConnectedUserContext from '../context/connected-user.context';

import utilisateurService from '../service/utilisateur-service';
import { Card, CardHeader, Avatar, CardContent } from '@material-ui/core';

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
                <Card>
                    <CardHeader
                        title={connectedUser.nomComplet}
                        avatar={<Avatar>
                            {connectedUser.nomComplet.charAt(0)}
                        </Avatar>}
                        subheader={connectedUser.nom}
                    />
                    <CardContent>
                        Je met du texte ici pour remplire cette element. <br/>
                        Nous verrons plus tard ce qu'on peut mettre ici <br/>

                    </CardContent>
                </Card>
        }
    </div>)
}