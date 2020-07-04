import React , { useState, useEffect  } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '../../components/table';
import SmallHeader from '../../components/small-header';
import FormPopup from '../../components/form-popup';
import TextInput from '../../components/text-input';
import DirectionRegService from '../../service/directionReg-service';
import {Button , CircularProgress ,Grid , TextField} from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import swal from 'sweetalert';
import villeService from '../../service/ville-service';
import TextInputselect from '../../components/text-input-select';



export default function DirectionReg (props) {

    const useStyles = makeStyles((theme) => ({
        button : {
            backgroundColor : '#B3D9FF',
            '&:hover' : {
            backgroundColor : "#1A8CFF"
            }
        }
    }));
        
    const classes = useStyles();

        const [directionReg, setDirectionReg] = useState([]);

        // l'etat de chargement des donnees
        const [loading, setLoading] = useState(true);

        // l'etat des valeur de l'input
        const [inputDirectionReg, setInputDirectionReg] = useState({
        id: NaN,
        code: "",
        designation: "",
        ville: "",
        idVille: "",
        adresse: ""
        });

        // l'etat du mode du formulaire
        const [formMode, setFormMode] = useState("FERMER");
        const [options,setOptions]= useState([]);

        // parametre du formulair
    const [formParams, setFormParams] = useState({
        icon: "",
        title: "",
        button: "",
        onSubmit: () => {},
        open: false
    });

        // etat du message d'erreur en cas de formulaire invailde
    const [invalidMessage, setInvalidMessag] = useState("");

    const columns = [
        { title: "Code", property: "code" },
        { title: "Designation", property: "designation" },
        { title: "Ville", property: "ville" },
        { title: "Adresse", property: "adresse" }
    ];

    useEffect(() => {
        DirectionRegService.getAll().then(res => {
            console.log(res);
            setDirectionReg(res);
            setLoading(false);
        });
       
            villeService.getAll(1).then(res => {
                if (typeof res === "string") {
                    console.log(res);
                } else {
                    setOptions(res);
                    console.log(res);
                    setLoading(false);
                }
            })
    }, []);


    useEffect(() => {

        switch (formMode) {

            case "AJOUTER":
                setFormParams({
                    icon: <Add />,
                    title: "Ajouter Direction regionale ",
                    button: "Ajouter",
                    onSubmit: (e) => {
                        e.preventDefault();
                        addDirectionReg();
                    },
                    open: true
                });
                break;

            case "MODIFIER":
                setFormParams({
                    icon: <Edit />,
                    title: "Modifier Direction regionale",
                    button: "Modifier",
                    onSubmit: (e) => {
                        e.preventDefault();
                        editDirectionReg(inputDirectionReg.id);
                    },
                    open: true
                });
                break;

            case "SUPPRIMER":
                setFormParams({
                    icon: <Delete/>,
                    title: "Supprimer cette Direction regionale?",
                    button: "Supprimer",
                    onSubmit: (e) => {
                        e.preventDefault();
                        deleteDirectionReg(inputDirectionReg);
                    },
                    open: true
                });
                break;

            case "FEREMER":
                setFormParams({
                    icon: "",
                    title: "",
                    button: "",
                    onSubmit: () => {},
                    open: false
                });
        }
    }, [formMode, inputDirectionReg]);


    
    function addDirectionReg() {
        if (validForm()) {
            DirectionRegService.add(inputDirectionReg).then(res => {
                if (typeof res === "string") {
                    setInvalidMessag(res);
                } else {
                    setDirectionReg(res);
                    closeForm();
                }
            }).catch(err => {
                setInvalidMessag("probleme de connexion au serveur");
            });
        } else
            setInvalidMessag("Donnees entrees invalide!");
    }


    function deleteDirectionReg(prestataire) {
        swal({
            title : "Voulez supprimer cette dr regionale?",
            text : "",
            icon : "warning",
           
           

        }).then((WillDelete)=>{
        if (WillDelete) {
            let newDirectionReg = [];
            DirectionRegService.delete(directionReg.id).then(res => {
                if (res === true) {
                    newDirectionReg = directionReg.filter((direc) => direc !== directionReg);
                    setDirectionReg(newDirectionReg);
                } else {
                    setInvalidMessag("l'element n'a pas ete supprimer");
                }
            });
        }
    }
    )
    }
    

    function editDirectionReg(id) {
        if (validForm()) {
            DirectionRegService.edit(inputDirectionReg).then(res => {
                if (res === true) {
                    const index = directionReg.findIndex((direc) => direc.id === id);
                    const newDirectionReg = [...directionReg];
                    newDirectionReg.splice(index, 1, inputDirectionReg);
                    setDirectionReg(newDirectionReg);
                    closeForm();
                } else {
                    setInvalidMessag("l'element n'a pas ete modifier");
                }
            })
        } else
            setInvalidMessag("Donnees entrees invalide!");
    }


    function openEditForm(directionReg) {
        setInputDirectionReg(directionReg);
        setFormMode("MODIFIER");
    }


    function openDeleteForm(directionReg) {
        setInputDirectionReg(directionReg);
        setFormMode("SUPPRIMER");
    }

    function validForm() {
        return (
            !isNaN(parseInt(inputDirectionReg.code)) &&
            inputDirectionReg.designation !== "" &&
            !isNaN(parseInt(inputDirectionReg.ville)) &&
            inputDirectionReg.adresse !== ""
            
        ) 
    }

    function clearInput() {
        setInputDirectionReg({
            id: NaN,
            code: "",
            designation: "",
            ville: "",
            adresse: ""
        })
    }

    function closeForm() {
        clearInput();
        setInvalidMessag("");
        setFormMode("FEREMER");
    }

     
    return (<div>
        <SmallHeader>
            Liste des directions regionales
            <Button variant="contained" className={classes.button} onClick={() => {setFormMode("AJOUTER")}} >Ajouter</Button>
        </SmallHeader>

        {/* Tableau des donnees */}
        {
            loading ?
            <Grid item container justify="center" xs="12">
                <Grid item style={{margin: "10px"}}>
                    <CircularProgress />
                </Grid>
            </Grid> :
                <Table
                    columns={columns}
                    data={directionReg}
                    buttons
                    delete={openDeleteForm}
                    edit={openEditForm} 
                    pageSize="5"
                    searchBar
                    />
        }

        {/* Formulaire d'ajout ou de modification */}
        <FormPopup
            {...formParams}
            direction="column"
            onClose={closeForm}
        >
            <TextField
                fullWidth
                type="number"
                label="Code"
                value={inputDirectionReg.code}
                onChange={(e) => {setInputDirectionReg({...inputDirectionReg, code: e.target.value})}}
                icon="none"
            />
            <TextField
            fullWidth
                type="text"
                label="Designation"
                value={inputDirectionReg.designation}
                onChange={(e) => {setInputDirectionReg({...inputDirectionReg, designation: e.target.value})}}
                icon="none"
            />
           {/*<TextField
                type="text"
                label="Ville"
                value={inputDirectionReg.ville}
                onChange={(e) => {setInputDirectionReg({...inputDirectionReg, ville: e.target.value})}}
                icon="none"
            /> */} 
            <TextInputselect
                type="select"
                options={options.map(option => ({value:option.id, label:option.nom}))}
                label="Ville"
                value={inputDirectionReg.ville}
                onChange={(e) => {setInputDirectionReg({
                    ...inputDirectionReg,
                    idVille: e.target.value,
                    ville: options.find(options => options.id === parseInt(e.target.value)).nom})}}
                icon="none"
            />
            <TextField
            fullWidth
                type="text"
                label="Adresse"
                value={inputDirectionReg.adresse}
                onChange={(e) => {setInputDirectionReg({...inputDirectionReg, adresse: e.target.value})}}
                icon="none"
            />
            <span style={{color: "red"}}>{invalidMessage}</span>
        </FormPopup>
    </div>)


}
