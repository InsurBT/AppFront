import React, { useEffect, useState } from 'react';

import {formContainerStyle, smallFormContainerStyle} from '../CSS/form-container.css';

import FormHeader from './form-header';
import FormButton from './form-button';
import { Card, CardContent, CardHeader, Avatar, Button, Grid } from '@material-ui/core';

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

    return (<Card style={{...style, ...props.style}}>
        <CardHeader
            title={props.title}
            avatar={<Avatar>
                {props.icon}
            </Avatar>}
        />
        <CardContent>
            <form onSubmit={props.onSubmit}>
                <Grid container direction="column">
                    {props.children}
                </Grid>
                <div style={{textAlign: "right"}}>
                    <Button type="submit">{props.button}</Button>
                </div>
            </form>
        </CardContent>
    </Card>
    )
}