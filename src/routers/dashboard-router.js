import React, { useContext, useEffect, useState } from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';


import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { blue } from '@material-ui/core/colors';

// core components
import Navbar from "../components/Navbars/Navbar.js";
import Footer from "../components/Footer/Footer.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
import routes from "../routes.js";

import styles from "../assets/jss/material-dashboard-react/layouts/adminStyle.js";

import img from "../assets/img/faces/assurance.png";

import logo from "../assets/img/faces/soinsante.png";

import utilisateurService from '../service/utilisateur-service';
import dossierService from '../service/dossier/dossier-service';

import ConnectedUserContext from '../context/connected-user.context';
import { whiteColor } from '../assets/jss/material-dashboard-react.js';

let ps;

const useStyles = makeStyles(styles);

export default function DashboardRouter(props) { 
  const { path, url } = useRouteMatch();
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();

  // etat de chargement des sous menu
  // cet etat garde la valeur 'true' tant que les sous menu ne sont pas encore charge
  const [ loading, setLoading ] = useState(true);

  const [ userRoutes, setUserRoutes ] = useState([]);
  
  const [ switchViews, setSwitchViews ] = useState([]);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { connectedUser, setConnectedUser } = useContext(ConnectedUserContext);

  const  [hide , setHide]=useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  function hideSideBar (props) {
    setHide (!hide);
  }
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  useEffect(() => {
    dossierService.getMenu().then((res) => {
      routes.find(route => route.name === "Gestion des dossiers").subRoutes = res;
      setLoading(false);
    })
  }, [])

  // initialize and destroy the PerfectScrollbar plugin
  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "auto";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);

  useEffect(() => {
    utilisateurService.getLoggedUser().then( res => {
      setConnectedUser(res);

      setUserRoutes(routes.filter(route => route.roles.includes(res.role)));
    }).catch( err => {
      setConnectedUser(null);
      sessionStorage.removeItem("authToken");
      props.history.push("/login");
    })
  }, []);

  useEffect(() => {
    setSwitchViews(
      <Switch>
        <Redirect from="/home" exact to="/home/accueil" />
        {
            userRoutes.map((route, key) => {
              return (
                  <Route
                      path={route.layout + route.path}
                      key={key}
                  >
                    <route.component subRoutes={route.subRoutes} history={props.history} />
                  </Route>
              )
            })
        }
        
        
      </Switch>
    )

  }, [userRoutes]);

  function deconnexion() {
      utilisateurService.disconnect().then(res => {
          if (res) {
              setConnectedUser(null);
              sessionStorage.removeItem("authToken");
              props.history.push("/login");
          }
      });
  }

  const getRoute = () => {
      return window.location.pathname !== "/admin/maps";
  };

  return (<div>


   { hide ? <Sidebar
      routes={userRoutes}
      logoText={"Soin de santé"}
      logo={logo}
      image={img}
      handleDrawerToggle={handleDrawerToggle}
      open={mobileOpen}
      color={whiteColor}
    /> : null 
    }

    <div className={classes.mainPanel} ref={mainPanel}>
      <Navbar
        click={hideSideBar}
        routes={userRoutes}
        handleDrawerToggle={handleDrawerToggle}
        logout={deconnexion}
      />
      {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
      {getRoute() ? (
        <div className={classes.content}>
          <div className={classes.container}>{switchViews}</div>
        </div>
      ) : (
        <div className={classes.map}>{switchViews}</div>
      )}
      {getRoute() ? <Footer /> : null}
      
    </div>
  </div>)
}