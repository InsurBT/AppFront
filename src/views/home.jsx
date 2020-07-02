import React, {useContext, useEffect, useState} from 'react';
import {Timeline , 
        TimelineItem,
        TimelineSeparator,
        TimelineConnector,
        TimelineContent,
        TimelineOppositeContent,
        TimelineDot
    } from '@material-ui/lab';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import AccessibilityNewRoundedIcon from '@material-ui/icons/AccessibilityNewRounded';import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {  CardHeader, Avatar } from '@material-ui/core';
import ConnectedUserContext from '../context/connected-user.context';
import utilisateurService from '../service/utilisateur-service';
import { Card,  CardContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import img1 from '../assets/img/cnss.png'


const styles = theme => ({
    image: {
       backgroundImage : `url(${img1})`,
       backgroundRepeat: 'no-repeat',
       backgroundPosition: 'center',
       backgroundSize: '700px',
       width : '100%',
       height : '600px'
      },
    avatar : {
        backgroundColor : '#1E4584',
        color : '#fff',
        fontSize : '30px'
    },
    color : {
        color : "#1E4584",
        fontSize : '20px'
    },
    paper: {
        padding: '6px 16px',
      },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
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

    console.log("mmouaad ana login" , connectedUser)

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
                        <Timeline align="alternate">
                            <TimelineItem>
                                <TimelineSeparator>
                                <TimelineDot>
                                    <AccountCircleRoundedIcon />
                                </TimelineDot>
                                <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography variant="h6" component="h1">
                                    Nom et Prenom
                                    </Typography>
                                    <Typography>{connectedUser.nomComplet}</Typography>
                                </Paper>
                                </TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                
                                <TimelineSeparator>
                                <TimelineDot color="primary">
                                    <LocationOnRoundedIcon />
                                </TimelineDot>
                                <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography variant="h6" component="h1">
                                    Agence
                                    </Typography>
                                    <Typography> {connectedUser.agence} </Typography>
                                </Paper>
                                </TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                <TimelineDot color="primary" variant="outlined">
                                    <AccessibilityNewRoundedIcon />
                                </TimelineDot>
                                <TimelineConnector className={classes.secondaryTail} />
                                </TimelineSeparator>
                                <TimelineContent>
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography variant="h6" component="h1">
                                    Le Rôle
                                    </Typography>
                                    <Typography>{connectedUser.role} </Typography>
                                </Paper>
                                </TimelineContent>
                            </TimelineItem>
                        </Timeline>
                    </CardContent>
                </Card>
        }
    </div>)
}

export default withStyles(styles)(Home)
