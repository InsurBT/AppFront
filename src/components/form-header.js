import React from 'react';

import formHeaderStyle from '../CSS/form-header.css';

export default function FormHeader(props) {

    return (<h4 style={{...formHeaderStyle, ...props.style}}>
            <i style={{marginRight: "2px"}} className={"ace-icon fa fa-" + (props.icon || "coffee")} />
            {props.title}
    </h4>)
}