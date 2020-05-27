import React from 'react';

import NavElement from './nav-element';
import sideNavStyle from '../CSS/side-nav.css';

export default function SideNav(props) {
    // Ce composant permet de fournir une vue avec une bar de navigation sur le conte
    return (
        <div style={{display: "flex"}}>
            <nav style={{...sideNavStyle, ...props.style}}>
                { props.routes.map((route, index) => {
                    return <NavElement key={index} path={route.path}>{route.name}</NavElement>
                })}
            </nav>
            {props.children}
        </div>
    )
}