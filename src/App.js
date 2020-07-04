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
    props.ajouterDossier('mouaadouk')
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
      }
  }
}

const mapStateToProps = state => {
  return {
      state: state,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
