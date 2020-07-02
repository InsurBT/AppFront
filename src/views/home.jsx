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
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import AccessibilityNewRoundedIcon from '@material-ui/icons/AccessibilityNewRounded';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {  CardHeader, Avatar } from '@material-ui/core';
import ConnectedUserContext from '../context/connected-user.context';
import utilisateurService from '../service/utilisateur-service';
import { Card,  CardContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
//react-spring animation for SideBar
import { useSpring, animated as a } from 'react-spring'


import '../home.css';

const styles = theme => ({
    paper: {
        padding: '6px 16px',
      },
    secondaryTail: {
        backgroundColor:"#33cccc",
      },
    card : {
        width:"20%",
    // maxWidth:"200px",
    display: "flex",
    
    },
    Typography1 : {
        fontSize : '22px',
        color : "#1A8CFF",
        fontFamily: 'inherit'
    },
    Typography2 : {
        color : '#204782',
        fontamily: 'cursive'
    }
})


 function Home(props) {
    const animation = useSpring({ from : {opacity: 0 , marginLeft : -800},to: {opacity: 1, marginLeft : 0} , config: { duration: 800,mass: 1, tension: 280, friction: 20 }})

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

    return (
        <a.div style={animation}>
    {loading ? <div> chargement...... </div> : 
        <div >
        <head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css"/>
        </head>
           <div class="cardgeneral">
           <div class="card profile-sidebar">
            <img src="/CNSS.png" alt="" class="profile-image"/>
            </div>
            <div class="card2" >
            <Timeline align="alternate">
            <TimelineItem>
                <TimelineSeparator>
                <TimelineDot color="primary">
                    <AccountCircleRoundedIcon />
                </TimelineDot>
                <TimelineConnector className={classes.secondaryTail}/>
                </TimelineSeparator>
                <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                    <Typography className={classes.Typography1} variant="h6" component="h1">
                    Nom et Prenom
                    </Typography>
                    <Typography className={classes.Typography2}>{connectedUser.nomComplet}</Typography>
                </Paper>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                <TimelineDot color="primary">
                    <LocationOnRoundedIcon />
                </TimelineDot>
                <TimelineConnector className={classes.secondaryTail}/>
                </TimelineSeparator>
                <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                    <Typography className={classes.Typography1} variant="h6" component="h1">
                    Agence
                    </Typography>
                    <Typography className={classes.Typography2}> {connectedUser.agence} </Typography>
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
                    <Typography className={classes.Typography1} variant="h6" component="h1">{connectedUser.role} </Typography>
                </Paper>
                </TimelineContent>
            </TimelineItem>
            </Timeline>
        </div>
        </div>
    </div>
    }
    </a.div>)
        
}

export default withStyles(styles)(Home)
 