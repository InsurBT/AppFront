import React, {useContext, useEffect, useState} from 'react';
import {  CardHeader, Avatar } from '@material-ui/core';
import ConnectedUserContext from '../context/connected-user.context';
import utilisateurService from '../service/utilisateur-service';
import { Card,  CardContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import img1 from '../assets/img/cnss.png'


const styles = theme => ({
    image: {
       backgroundImage : `url(${img1})`,
       backgroundPosition: 'center',
       backgroundSize: 'cover',
       width : '100%',
       height : '600px'
      },
    avatar : {
        backgroundColor : '#b3d9ff',
        color : '#000',
        fontSize : '30px'
    },
    color : {
        color : "#1E4584",
        fontSize : '20px'
    },
})

//
 function Home(props) {
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

    const {classes} = props

    return (<div>
        {
            loading ?
                <div>chargement...</div> :
                <Card  className={classes.image}>
                    <CardHeader
                        className={classes.color}
                        title={connectedUser.nomComplet}
                        avatar={<Avatar className={classes.avatar}>
                            {connectedUser.nomComplet.charAt(0)}
                        </Avatar>}
                        subheader={connectedUser.nom}
                    />
                    <CardContent className={classes.color}>
                    BIENVENUE SUR LE PORTAIL ASSURÉ DE LA CNSS <br/>

                    </CardContent>
                </Card>
        }
    </div>)
}

export default withStyles(styles)(Home)
