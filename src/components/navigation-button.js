import React from 'react';

import * as Styles from '../CSS/navigation-button.css';

export default function NavigationButton(props) {
    return (<button style={Styles.navButtonStyle} onClick={props.onClick}>
        <i className={"fa fa-" + props.icon}></i>
        <span style={props.selected? Styles.selectedNavButtonStyle : Styles.navButtonStyle}>{props.children}</span>
    </button>)
}