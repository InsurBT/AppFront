import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import img1 from '../assets/img/cnss-logo.jpg'
import React, { useState, useContext } from 'react';
import utilisateurService from '../service/utilisateur-service';
import ConnectedUserContext from '../context/connected-user.context';
import CircularProgress  from '@material-ui/core/CircularProgress';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.cnss.ma/">
        CNSS
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${img1})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[0] : theme.palette.grey[900],
    backgroundSize: '700px',
    backgroundPosition: 'center',
  },
  paper: {
    margin: '160px 32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#3F51B5'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



export default function Login(props) {
    // etat des donnees entree dans les champs du formulaire
    const [credentials, setCredentials] = useState({username: '', password: ''});

    // etat du message d'erreur
    const [invalidMessage, setInvalidMessage] = useState("");

    // etat du chargement de la reponse a partir du serveur
    const [loading, setLoading] = useState(false);

    const {setConnectedUser} = useContext(ConnectedUserContext);

    function submit(e) {
        e.preventDefault();

        setLoading(true);

        if (valid()) {
            utilisateurService.connect(credentials).then(res => {
                console.log(res);
                if (typeof res === "string") {
                    setInvalidMessage("login ou mot de passe invalide");
                } else {
                    setConnectedUser(res);
                    props.history.push("/home");
                }
            }).catch(err => {
                setInvalidMessage("impossible de se connecter au serveur");
                console.log(err);
            }).finally(() => {setLoading(false)});
        } else
            setInvalidMessage("Vous devez remplire des 2 champs pour vous connecter");
    }

    function valid() {
        return credentials.username !== "" && credentials.password !== "";
    }

  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon /> 
          </Avatar>
          <Typography component="h1" variant="h5">
            Connexion
          </Typography>
          <form className={classes.form} noValidate onSubmit={submit}>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Nom utilisateur"
              name="email"
              autoComplete="email"
              autoFocus
              value={credentials.username}
              onChange={(e) => {setCredentials({...credentials, username: e.target.value})}}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={(e) => {setCredentials({...credentials, password: e.target.value})}}
            />
            {loading? <Grid item container justify="center" xs="12">
                <Grid item style={{margin: "10px"}}>
                    <CircularProgress />
                </Grid>
            </Grid> : ""}
            <span style={{color: 'red'}}>{invalidMessage}</span>
        
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Connexion
            </Button>
           
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}






