import React from 'react';

import pageHeaderStyle from '../CSS/page-header.css';

export default function PageHeader(props) {

    return (<header style={pageHeaderStyle}>
        <h2 style={{margin: "0"}}>
            <i style={{padding: "5px"}} className={"ace-icon fa fa-" + (props.icon || "leaf")}></i>
            {props.title}
        </h2>
        {props.children}
    </header>)
}