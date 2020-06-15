import React, { useContext } from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';


import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "../components/Navbars/Navbar.js";
import Footer from "../components/Footer/Footer.js";
import Sidebar from "../components/Sidebar/Sidebar.js";

import routes from "../routes.js";

import styles from "../assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "../assets/img/sidebar-2.jpg";
import logo from "../assets/img/cnss_logo.jpg";

import utilisateurService from '../service/utilisateur-service';

import ConnectedUserContext from '../context/connected-user.context';
import { blue } from '@material-ui/core/colors';

let ps;

const useStyles = makeStyles(styles);

export default function DashboardRouter({ props, ...rest }) { 
  const { path, url } = useRouteMatch();
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  
  const switchViews = (
      <Switch>
        {
            routes.map((route, key) => {
              return (
                  <Route
                      path={route.layout + route.path}
                      component={route.component}
                      key={key}
                  />
              )
            })
        }
        <Redirect from="/home" to="/home/accueil" />
      </Switch>
  )

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const {setConnectedUser} = useContext(ConnectedUserContext);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
      
      const resizeFunction = () => {
        if (window.innerWidth >= 960) {
          setMobileOpen(false);
        }
      };
      // initialize and destroy the PerfectScrollbar plugin
      React.useEffect(() => {
        if (navigator.platform.indexOf("Win") > -1) {
          ps = new PerfectScrollbar(mainPanel.current, {
            suppressScrollX: true,
            suppressScrollY: false
          });
          document.body.style.overflow = "hidden";
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

    function deconnexion() {
        utilisateurService.disconnect().then(res => {
            if (res.ok) {
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
      <Sidebar
        routes={routes}
        logoText={"Soin de santé"}
        logo={logo}
        image={bgImage}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={blue}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
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