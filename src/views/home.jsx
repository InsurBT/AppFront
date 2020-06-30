import React, {useContext, useEffect, useState} from 'react';
import {  CardHeader, Avatar } from '@material-ui/core';
import ConnectedUserContext from '../context/connected-user.context';
import utilisateurService from '../service/utilisateur-service';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: "70%",
    height:"50vh",
    color:"#1565c0",
    marginLeft:"10%"
   
  },
  media: {
    height: "30vh",
  },
});

  
export default function Home(props) {
    const classes = useStyles();

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


  return (
    (<div  >
      {
          loading ?
              <div >chargement...</div> :

    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/health.jpg"
          title="CNSS"
        />
        <CardContent>
              <Typography gutterBottom variant="h5" component="h2" >
            Bienvenue
            {/* <Card >
                 
                        {connectedUser.nomComplet}
                  
                        
                        {connectedUser.nom}
                    
            </Card> */}
                   
           
             


          </Typography>
    
        </CardContent>
      </CardActionArea>
      
    </Card>
            }
            </div>)
        
  );
}