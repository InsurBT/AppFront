import React, { useEffect, useState } from 'react';
import {formContainerStyle, smallFormContainerStyle} from '../CSS/form-container.css';
import { Card, CardContent, CardHeader, Avatar, Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    avatar : {
        backgroundColor : "#b3d9ff",
        color : 'white'
    },
    button : {
        backgroundColor : '#b3d9ff',
            '&:hover' : {
        backgroundColor : "#33cccc"
      }
    }
})

 function FormContainer(props) {
    
    const {classes} = props

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
            avatar={<Avatar className={classes.avatar}>
                {props.icon}
            </Avatar>}
        />
        <CardContent>
            <form onSubmit={props.onSubmit}>
                <Grid container direction={props.direction}>
                    {props.children}
                </Grid>
                <div style={{textAlign: "right"}}>
                    <Button type="submit" className={classes.button}>{props.button}</Button>
                </div>
            </form>
        </CardContent>
    </Card>
    )
}

export default withStyles(styles)(FormContainer)