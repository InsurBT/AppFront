import React, { useEffect, useState } from 'react';

import {formContainerStyle, smallFormContainerStyle} from '../CSS/form-container.css';

import FormHeader from './form-header';
import FormButton from './form-button';

export default function FormContainer(props) {

    const [style, setStyle] = useState(window.innerWidth >= 475 ? formContainerStyle : smallFormContainerStyle);

    useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.innerWidth < 475) {
                setStyle(smallFormContainerStyle);
            } else {
                setStyle(formContainerStyle);
            }
        })
    })

    return (<div style={{...style, ...props.style}}>
        <FormHeader title={props.title} icon={props.icon} />
        <form onSubmit={props.onSubmit}>
            {props.children}
            <div style={{textAlign: "right"}}>
                <FormButton>{props.button}</FormButton>
            </div>
        </form>
    </div>
    )
}