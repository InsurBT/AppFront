import React, { useState , useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
// REDUUX
import { connect } from 'react-redux'
import * as ACTIONS from './redux/action/actions'
import ConnectedUserContext from './context/connected-user.context';

import Login from './views/login.jsx';
import DashboardRouter from './routers/dashboard-router';

function App(props) {


  const [connectedUser, setConnectedUser] = useState(null);

  const value = {connectedUser, setConnectedUser};

  useEffect(()=>{
    props.ajouterDossier('ajouter dossier')
    props.ajouterPrestation('ajouter prestation')
    props.ajouterAssures('ajouter assures')
    props.ajouterAyantsDroit('ajouter ayant droit')
  },[])

  console.log('reduuuux stooore' , props.state)

  return (
    <ConnectedUserContext.Provider value={value}>
      <Switch>
        <Route exact path="/">
          <Redirect to={{pathname: "/home"}}   />
        </Route>
        <Route path="/login">
          {
            sessionStorage.getItem("authToken") === null ?
              <Login history={props.history} /> :
              <Redirect to="/home" />
          }
        </Route>
        <Route path="/home">
          {
            sessionStorage.getItem("authToken") === null ?
              <Redirect to="/login" /> :
              <DashboardRouter history={props.history} />
          }
        </Route>
      </Switch>
    </ConnectedUserContext.Provider>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    ajouterDossier: (data) => {
          var action = ACTIONS.ajouterDossier(data)
          dispatch(action)
      },
    ajouterPrestation : (data) => {
        var action = ACTIONS.ajouterPrestation(data)
        dispatch(action)
    },
    ajouterAssures : (data) => {
      var action = ACTIONS.ajouterAssures(data)
      dispatch(action)
    },
    ajouterAyantsDroit : (data) => {
      var action = ACTIONS.ajouterAyantsDroit(data)
      dispatch(action)
    },
  
  }
}

const mapStateToProps = state => {
  return {
      state: state,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
