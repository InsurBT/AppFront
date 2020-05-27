import React from 'react';

export default function IconButton(props) {
    return (<button style={{backgroundColor: "white", border: 0, ...props.style}} onClick={props.onClick}>
                    <i className={"fa fa-" + props.icon} style={{padding: "2px"}} />
                </button>);
}