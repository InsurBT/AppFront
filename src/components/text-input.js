import React, { useState } from 'react';
import {textInputStyle, focusedTextInputStyle} from '../CSS/text-input.css'

export default function TextInput(props) {
    const [inputStyle, setInputStyle] = useState({
        decoration: "none",
        border: "none",
        background: "none",
        outline: "none",
        width: "100%"
    });
    const [focus, setFocus] = useState(true);
    const [containerStyle, setContainerStyle] = useState(textInputStyle);

    function toggleFocus() {
        setInputStyle(inputStyle);
        setFocus(!focus);
        setContainerStyle(focus ? focusedTextInputStyle : textInputStyle);
    }

    return (
        <div style={{...containerStyle, ...props.style}}  onFocus={toggleFocus} onBlur={toggleFocus} > 
            {props.type === "select" ? 
                [
                    <select onChange={props.onChange} style={inputStyle} {...props}>
                        
                         <option  selected disabled hidden>{props.currentValue||props.label}</option>
                        {props.options.map(option => {
                            return <option key={option.value} value={option.value}>{option.label}</option>
                        })}
                    </select>
                ]
                :
                <input
                    {...props}
                    style={{...inputStyle, textAlign: props.align}}
                    placeholder={props.label}
                />
            }
            <i className={"ace-icon fa fa-" + (props.icon || "user")} style={{padding: "2px"}}></i>
        </div>
    )
}