import React, { useState, useContext } from 'react';
import FormContainer from '../components/form-container';
import utilisateurService from '../service/utilisateur-service';
import ConnectedUserContext from '../context/connected-user.context';
import { TextField } from '@material-ui/core';


export default function Login(props) {

    const [credentials, setCredentials] = useState({username: '', password: ''});
    const [invalidMessage, setInvalidMessage] = useState("");

    const {setConnectedUser} = useContext(ConnectedUserContext);

    function submit(e) {
        e.preventDefault();
        if (valid()) {
            utilisateurService.connect(credentials).then(res => {
                console.log(res);
                if (typeof res === "string") {
                    setInvalidMessage(res);
                } else {
                    setConnectedUser(res);
                    props.history.push("/home");
                }
            }).catch(err => {
                setInvalidMessage("impossible de se connecter au serveur");
                console.log(err);
            });
        } else
            setInvalidMessage("Vous devez remplire des 2 champs pour vous connecter");
    }

    function valid() {
        return credentials.username !== "" && credentials.password !== "";
    }

    return (<div>
        <FormContainer title="Login" onSubmit={submit} button="Login">
            <TextField label="Login" value={credentials.username} onChange={(e) => {setCredentials({...credentials, username: e.target.value})}} />
            <TextField
                label="Mot de passe"
                type="password"
                icon="lock"
                value={credentials.password}
                onChange={(e) => {setCredentials({...credentials, password: e.target.value})}}
            />
            <span style={{color: 'red'}}>{invalidMessage}</span>
        </FormContainer>
    </div>);
}