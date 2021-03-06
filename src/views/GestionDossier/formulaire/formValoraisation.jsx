import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    buttonStyle: {
        '& > *': {
          margin: theme.spacing(8),

        },
      },
  }));

export default function FormValoraisation(props) {

  const { dossier } = props;
    
  const classes = useStyles();
  
  return (
      <div>
        <form  noValidate autoComplete="off">
          <div className={classes.root}>
              <TextField id="standard-basic" value={dossier.montantEngage} label="Montant engagé" />
              <TextField id="standard-basic" value={dossier.montantRembourse} label="Montant à rembourser" />
          </div>
        </form>   
      </div>
  )
}
