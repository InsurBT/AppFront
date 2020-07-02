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
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles(theme => ({
              
        all: {
            marginLeft:"5%",
            marginTop:"5%",
        
        }, 
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

        },
        Button: {
          '& > *': {
         
            margin: theme.spacing(8),
          },
        },  
        input:{
          width: 320,

      },
  }));

export default function FormPrestation() {

  const classes = useStyles();
  const [prestation, setPrestation] = React.useState('');
  const [cotation, setCotation] = React.useState('');

  const handleChangePrestation = (event) => {
    setPrestation(event.target.value);
    
  };
  const handleChangeCotation = (event) => {
    setCotation(event.target.value)
  };

    return (
        <div className={classes.all} >
          
            <Grid item xs={9} >
                <FormControl className={classes.root}>
                    <InputLabel id="demo-simple-select-label">Prestation</InputLabel>
                      <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={prestation}
                          onChange={handleChangePrestation}
                      >
                        <MenuItem value={10}>Prestation1</MenuItem>
                        <MenuItem value={20}>Prestation2</MenuItem>
                        <MenuItem value={30}>Prestation3</MenuItem>
                      </Select>
                </FormControl>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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

                       
                <TextField className={classes.root} id="standard-basic" label="Tarif" />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField className={classes.root} id="standard-basic" label="Taux remboursement" />

            </Grid>  
                        

            <Grid item xs={8} >
                <p className={classes.text} >Rounouvellement</p> 
                  <Paper className={classes.paper} >
                    <TextField id="standard-basic" label="Period" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <TextField id="standard-basic" label="frequece" />
                    <TextField id="standard-basic" label="Nombre limite" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <TextField id="standard-basic" label="Plafond" />
                  </Paper>
            </Grid> 
                        
                        <pre></pre>

            <Grid item xs={10}>
                <p className={classes.text}>Decison sur prestation</p>
                  <Paper className={classes.paper}>
                          <FormControlLabel
                                  value="start"
                                  control={<Switch color="primary" minWidth= "300" />}
                                  label="Non remboursable"
                                  labelPlacement="start"
                          />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <Input placeholder="Motif" inputProps={{ 'aria-label': 'description' }} className={classes.input} />

                  </Paper>     
            </Grid>

            <TextField id="standard-basic" label="Frais engagés" />&nbsp;&nbsp;&nbsp;&nbsp;
            <TextField id="standard-basic" label="Nbr actes" />&nbsp;&nbsp;&nbsp;&nbsp;
            <TextField id="standard-basic" label="Mt à rembourser" />

                        
            <Box className={classes.Button}>
                <Button variant="contained">Valider</Button> 
                <Button variant="contained">Quiter</Button>
            </Box>
               
        </div>
    )
}
