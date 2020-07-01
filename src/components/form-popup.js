import React from 'react';
import Popup from 'reactjs-popup';

import FormContainer from './form-container';

export default function FormPopup(props) {
    

    return (<Popup
                open={props.open}
                closeOnDocumentClick
                onClose={props.onClose}
            
            >
        <FormContainer {...props} style={{margin: "0", width: "100%"}} >
            
        </FormContainer>
    </Popup>)
}