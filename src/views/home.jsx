import React, {useContext, useEffect, useState} from 'react';
import {Timeline , 
        TimelineItem,
        TimelineSeparator,
        TimelineConnector,
        TimelineContent,
        TimelineDot
    } from '@material-ui/lab';
import {
        Grid,
        CircularProgress,
        Paper,
        Typography,
        withStyles
    } from '@material-ui/core';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import AccessibilityNewRoundedIcon from '@material-ui/icons/AccessibilityNewRounded';
import ConnectedUserContext from '../context/connected-user.context';
import utilisateurService from '../service/utilisateur-service';
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
        
        if (connectedUser === null) {
            utilisateurService.getLoggedUser().then((res) => {
                if (typeof res === "string") {
                    props.history.push("/login");
                } else {
                    setConnectedUser(res);
                    setLoading(false);
                }
            }).catch((err) => {
                sessionStorage.removeItem("authToken")
                props.history.push("/login");
            })
        }
    }, []);

    const {classes} = props

    return (
        <a.div style={animation}>
    {loading ? <Grid item container justify="center" xs="12">
                <Grid item style={{margin: "10px"}}>
                    <CircularProgress />
                </Grid>
            </Grid> : 
        <div >
            <div class="cardgeneral">
                <div class="card profile-sidebar">
                    <img src="/CNSS.png" alt="" class="profile-image"/>
                </div>
                <div class="card2" >
                    {
                        connectedUser ?
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
                    </Timeline> :
                    null
                    }
                </div>
        </div>
    </div>
    }
    </a.div>)
        
}

export default withStyles(styles)(Home)
 