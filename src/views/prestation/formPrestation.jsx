import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        width: 250,  
      },
    },
    paper: {
        padding: theme.spacing(2), 
        color: theme.palette.text.secondary,
       
      }, 
    text:{
        color:'#42a5f5',
        fontSize: 15,

    }  
      
   
  }));

export default function FormPrestation() {

  const classes = useStyles();
 

  const [prestation, setPrestation] = React.useState('');
  const [cotation, setCotation] = React.useState('');

  const handleChange = (event) => {
    setPrestation(event.target.value);
    
  };
  const handleChangeCotation = (event) => {
    setCotation(event.target.value)
  };
    return (
        <div >
            
                        <FormControl className={classes.root}>
                            <InputLabel id="demo-simple-select-label">Prestation</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={prestation}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Prestation1</MenuItem>
                                        <MenuItem value={20}>Prestation2</MenuItem>
                                        <MenuItem value={30}>Prestation3</MenuItem>
                                    </Select>
                        </FormControl>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <FormControl className={classes.root}>
                            <InputLabel id="demo-simple-select-label">Cotation</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={cotation}
                                    onChange={handleChangeCotation}
                                    >
                                    <MenuItem value={10}>10%</MenuItem>
                                    <MenuItem value={20}>20%</MenuItem>
                                    <MenuItem value={30}>30%</MenuItem>
                                </Select>
                        </FormControl>

                        <pre> &nbsp;&nbsp;</pre>
                       
                            <TextField  id="standard-basic" label="Tarif" />
                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <TextField  id="standard-basic" label="Taux remboursement" />
                        
                        <pre> &nbsp;&nbsp;</pre>

                        <Grid item xs={6} >
                           <p className={classes.text} >Rounouvellement</p> 
                        <Paper className={classes.paper} xs={3}>
                                <TextField id="standard-basic" label="Period" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <TextField id="standard-basic" label="frequece" /><pre> </pre>
                                <TextField id="standard-basic" label="Nombre limite" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <TextField id="standard-basic" label="Plafond" />
                        </Paper>
                        </Grid> 
                        
                        <pre></pre>

                        <Grid item xs={6}>
                           <p className={classes.text}>Decison sur prestation</p>
                        <Paper className={classes.paper}>

                                <FormControlLabel
                                        value="start"
                                        control={<Switch color="primary" minWidth= "300" />}
                                        label="Nom remboursable"
                                        labelPlacement="start"
                                />
                                 &nbsp;&nbsp;&nbsp;&nbsp;
                                <TextField id="standard-basic" label="Motif" />

                        </Paper>     
                        </Grid>
                        <pre> </pre>
                        <TextField id="standard-basic" label="Frais engagés" />&nbsp;&nbsp;&nbsp;&nbsp;
                        <TextField id="standard-basic" label="Nbr actes" />&nbsp;&nbsp;&nbsp;&nbsp;
                        <TextField id="standard-basic" label="Mt à rembourser" />

               
        </div>
    )
}
