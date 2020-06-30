import React,{ useEffect,useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import paysService from '../../../../service/pays-service';
import villeService from '../../../../service/ville-service';
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


export default function FormCoordonnesEtranger() {
    const classes = useStyles();
    const [ville, setVille] = React.useState('');

    const [input, setInput] = useState({
      
        idpays: "",
        pays:"",
        ville:"",
        id:"",
      
    });


    const handleChangeVille = (event) => {
        setVille(event.target.value);
    };

    const [pays, setPays] = React.useState('');

    const [options,setOptions] = useState([]);

    const [optionsVille,setOptionsVille] = useState([]);

    const handleChangePays = (event) => {
        setPays(event.target.value);
    };
    const [caisse, setCaisse] = React.useState('');

    const handleChangeCaisse = (event) => {
        setCaisse(event.target.value);
    };
    const [caisseMere, setCaisseMere] = React.useState('');

    const handleChangeCaisseMere = (event) => {
        setCaisseMere(event.target.value);
    };
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

    /***********************************************************************************/
    useEffect(() => {
        console.log("le code est",input.idpays);
        villeService.getAll(input.idpays).then(res => {
            setOptionsVille(res);
            console.log('les villes:',res);
    }
    ); 
    }, [input.idpays]); 
    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off">
               
                <FormControl className={classes.formControl}>
                    
                <TextInputselect
                        type="select"
                        options={options.map(option => ({value:option.id, label:option.label}))}
                        label="Pays"
                        currentValue={input.pays}
                        onChange={(e) => {setInput({
                            ...input,
                            idpays: e.target.value,
                            pays: options.find(options => options.id === parseInt(e.target.value)).nom})}
                        
                        }
                        icon="none"
                    />
                </FormControl> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField className={classes.textField} id="standard-basic" label="Imm CE" />
                <TextField className={classes.textField} id="standard-basic" label="Imm CE Tierce" />
                
                <FormControl className={classes.formControl}>
                        <TextInputselect
                        type="select"
                        options={optionsVille.map(option => ({value:option.id, label:option.nom}))}
                        label="Ville"
                        currentValue={input.ville}
                        onChange={(e) => {setInput({
                            ...input,
                            id: e.target.value,
                            ville: optionsVille.find(options => options.id === parseInt(e.target.value)).nom})}
                        
                        }
                            
                        icon="none"
                    />
                </FormControl>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                
                <TextField className={classes.textField2}  id="standard-basic" label="Adresse" />
                 
                <TextField className={classes.textField}  id="standard-basic" label="Code Postal" />
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Caisse</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={caisse}
                            onChange={handleChangeCaisse}
                            >
                            <MenuItem value={10}> 1</MenuItem>
                            <MenuItem value={20}> 2</MenuItem>
                            
                        </Select>
                </FormControl>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField className={classes.textField}  id="standard-basic" label="Mobile" />
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Caisse mère</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={caisseMere}
                            onChange={handleChangeCaisseMere}
                            >
                            <MenuItem value={10}> 1</MenuItem>
                            <MenuItem value={20}> 2</MenuItem>
                            
                        </Select>
                </FormControl>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <TextField className={classes.textField2}  id="standard-basic" label="Tel" />

            </form>
            
        </div>
    )
}
