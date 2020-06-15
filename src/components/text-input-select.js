import React from 'react';

import {TextField} from '@material-ui/core';



export default function TextInputselect(props) {

    return (
            

                
                <TextField
                fullWidth
                label={props.label}
                margin="dense"
                name="state"
                onChange={props.onChange}
                select
                variant={props.variant}

                // eslint-disable-next-line react/jsx-sort-props
                value={props.value}
              >
                    {props.options.map(option => {
                     
                     return <option key={option.value} value={option.value}>{option.label}</option>
                    })}
              </TextField>

                
                
            
    )
}