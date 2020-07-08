import React,{ useEffect,useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import paysService from '../../../../service/pays-service';
import villeService from '../../../../service/ville-service';
import CaisseEtrangereService from '../../../../service/caisseEtrangere-service';
import CaisseMereService from '../../../../service/caisseMere-service';
import TextInputselect from '../../../../components/text-input-select';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          width: 140,
        },
      },
    
    textField:{
        marginRight:50,
        marginBottom:30,
        
    }, 
    textField2:{
        width: 250,
        marginRight:50,
        marginBottom:30,
        
    },  
  }));


export default function FormCoordonnesEtranger(props) {
    const classes = useStyles();
    const [options,setOptions] = useState([]);
    const [optionsVille,setOptionsVille] = useState([]);
    const [caisseEtrangere,setCaisseEtrangere] = useState([]);
    const [caisses,setCaisses] = useState([]);
    const {coordonneeEtrangere, setCoordonneeEtrangere} =props;
      
    
/************************************************************************** */
    useEffect(() => {
     
        paysService.getAll().then(res => {
            if (typeof res === "string") {
                console.log(res);
            } else {
                setOptions(res);
                console.log(res);
                console.log('les options sont :',options);
            }
        })
    }, []);
    useEffect(() => {
    
        CaisseEtrangereService.getAllByVille(coordonneeEtrangere.idEtrangere).then(res => {
            if (typeof res === "string") {
                console.log(res);
            } else {
                setCaisseEtrangere(res)
                console.log(res);
                console.log('les options de caisse etrangere  sont :',options);
            }
        })
    }, [coordonneeEtrangere.idEtrangere,coordonneeEtrangere.idpaysEtrangere]);

/***********************************************************************************/
    useEffect(() => {
        console.log("le code est",coordonneeEtrangere.idpaysEtrangere);
        villeService.getAll(coordonneeEtrangere.idpaysEtrangere).then(res => {
            setOptionsVille(res);
            console.log('les villes:',res);
    }
    ); 
    console.log("le code est",coordonneeEtrangere.idpaysEtrangere);
    CaisseMereService.getAllBypays(coordonneeEtrangere.idpaysEtrangere).then(res => {
        setCaisses(res);
        console.log('les caisse meres:',res);
}
); 
    }, [coordonneeEtrangere.idpaysEtrangere]); 
    /*****************************************************************************************/
 
    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">
               
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Pays</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={coordonneeEtrangere.paysEtrangere}
                            onChange={(e) => {setCoordonneeEtrangere({
                                ...coordonneeEtrangere,
                                idpaysEtrangere: e.target.value})}}
                            >
                              {
                                    options.map(payss => {
                                        return <MenuItem value={payss.id} selected={payss.label === coordonneeEtrangere.paysEtrangere}>
                                            {payss.label}
                                        </MenuItem>
                                    })
                               }
                            
                        </Select>
                
                </FormControl> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                <TextField 
                className={classes.textField} 
                id="standard-basic"
                label="Imm CE"
                value={coordonneeEtrangere.ImmCE}
                onChange={(e) => {setCoordonneeEtrangere({
                    ...coordonneeEtrangere,
                    ImmCE: e.target.value})}}
                />

                <TextField 
                className={classes.textField}
                id="standard-basic"
                label="Imm CE Tierce" 
                value={coordonneeEtrangere.ImmCETierce}
                onChange={(e) => {setCoordonneeEtrangere({
                    ...coordonneeEtrangere,
                    ImmCETierce: e.target.value})}}
                />
            
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Ville</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={coordonneeEtrangere.villeEtrangere}
                            onChange={(e) => {setCoordonneeEtrangere({
                                ...coordonneeEtrangere,
                                idEtrangere: e.target.value})}}
                            >
                              {
                                    optionsVille.map(villes => {
                                        return <MenuItem value={villes.id} selected={villes.nom === coordonneeEtrangere.villeEtrangere}>
                                            {villes.nom}
                                        </MenuItem>
                                    })
                               }
                            
                        </Select>
                
                </FormControl> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                
                <TextField 
                className={classes.textField2}  
                id="standard-basic" 
                label="Adresse"
                value={coordonneeEtrangere.adresseEtrangere}
                onChange={(e) => {setCoordonneeEtrangere({
                    ...coordonneeEtrangere,
                    adresseEtrangere: e.target.value})}} 
                />
                 
                <TextField 
                className={classes.textField}  
                id="standard-basic" 
                label="Code Postal"
                value={coordonneeEtrangere.codPostalEtrangere}
                onChange={(e) => {setCoordonneeEtrangere({
                    ...coordonneeEtrangere,
                    codPostalEtrangere: e.target.value})}} 
                />

                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Caisse</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={coordonneeEtrangere.idCaisse}
                            onChange={(e) => {setCoordonneeEtrangere({
                                ...coordonneeEtrangere,
                                idCaisse: e.target.value})}}
                            >
                             {
                                    caisseEtrangere.map(caisses => {
                                        return <MenuItem value={caisses.code} selected={caisses.nom === coordonneeEtrangere.caisse}>
                                            {caisses.nom}
                                        </MenuItem>
                                    })
                            }
                        </Select>
                </FormControl>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                <TextField 
                className={classes.textField} 
                id="standard-basic" 
                label="Mobile" 
                value={coordonneeEtrangere.mobileEtrangere}
                onChange={(e) => {setCoordonneeEtrangere({
                    ...coordonneeEtrangere,
                    mobileEtrangere: e.target.value})}}
                />

                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Caisse mère</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={coordonneeEtrangere.idCaisseMere}
                            onChange={(e) => {setCoordonneeEtrangere({
                                ...coordonneeEtrangere,
                                idCaisseMere: e.target.value})}}
                            >
                              {
                                    caisses.map(caissesMere => {
                                        return <MenuItem value={caissesMere.code} selected={caissesMere.nom === coordonneeEtrangere.caisseMere}>
                                            {caissesMere.nom}
                                        </MenuItem>
                                    })
                               }
                        </Select>
                </FormControl>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                <TextField 
                className={classes.textField2}  
                id="standard-basic" 
                label="Tel" 
                value={coordonneeEtrangere.tel}
                onChange={(e) => {setCoordonneeEtrangere({
                    ...coordonneeEtrangere,
                    tel: e.target.value})}}
                />

            </form>
            
        </div>
    )
}

