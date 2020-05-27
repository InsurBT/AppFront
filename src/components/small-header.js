import React from 'react';

import smallHeaderStyle from '../CSS/small-header.css'

export default function SmallHeader(props) {
    return (<h3 style={{...smallHeaderStyle, ...props.style}}>{props.children}</h3>)
}