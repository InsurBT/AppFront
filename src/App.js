import React, { useState , useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import ConnectedUserContext from './context/connected-user.context';

import Login from './views/login.jsx';
import DashboardRouter from './routers/dashboard-router';

function App(props) {


  const [connectedUser, setConnectedUser] = useState(null);

  const value = {connectedUser, setConnectedUser};

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


export default App;
