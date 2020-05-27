import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { navElementStyle, hoveredNavElementStyle } from '../CSS/nav-element.css';

export default function NavElement(props) {

    const [style, setStyle] = useState(navElementStyle);

    return (<Link
                to={props.path}
                style={{display: "block", textDecoration: "none"}}
                onMouseOver={() => { setStyle(hoveredNavElementStyle)}}
                onMouseOut={() => { setStyle(navElementStyle)}}>
        <div style={style}>{props.children}</div>
    </Link>)
}