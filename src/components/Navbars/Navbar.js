import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import AdminNavbarLinks from "./AdminNavbarLinks.js";
import RTLNavbarLinks from "./RTLNavbarLinks.js";
import Button from "../CustomButtons/Button.js";
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import styles from "../../assets/jss/material-dashboard-react/components/headerStyle.js";

const useStyles = makeStyles(styles);

const useStyle = makeStyles( (theme) => ({
 button: {
          float: 'right',
          marginTop: '13px'
        }
      })
      );

export default function Header(props) {
  const classes = useStyles();
  const classeButton = useStyle ();
  const {click} =props
  function makeBrand() {
    var name;
    props.routes.map(route => {
      if (window.location.href.indexOf(route.layout + route.path) !== -1) {
        name = props.rtlActive ? route.rtlName : route.name;
      }
      return null;
    });
    return name;
  }
  const { color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color
  });
  return ( 
    <AppBar className={classes.appBar + appBarClasses} >

      <FormatAlignJustifyIcon className={classeButton.button} onClick = {click}> </FormatAlignJustifyIcon>


      <Toolbar className={classes.container}>
      
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button color="transparent" href="#" className={classes.title}>
            {makeBrand()}
          </Button>
          
        </div>
        <Hidden smDown implementation="css">
          {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks logout={props.logout} />}
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object)
};
