import React , { useState, useContext, useEffect  } from 'react'
import Table from '../../components/table';
import SmallHeader from '../../components/small-header';
import FormPopup from '../../components/form-popup';
import TextInput from '../../components/text-input';
import FormButton from '../../components/form-button';
import DirectionRegService from '../../service/directionReg-service';
import DirectionRegContext from '../../context/directionRegContext';

export default function DirectionReg (props) {

     const {directionReg, setDirectionReg } = useContext(DirectionRegContext);

     // l'etat de chargement des donnees
     const [loading, setLoading] = useState(true);

     // l'etat des valeur de l'input
     const [inputDirectionReg, setInputDirectionReg] = useState({
        id: NaN,
        code: "",
        designation: "",
        ville: "",
        adresse: ""
     });

     // l'etat du mode du formulaire
     const [formMode, setFormMode] = useState("FERMER");

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
            setDirectionReg(res);
            setLoading(false);
        });
    }, []);


    useEffect(() => {

        switch (formMode) {

            case "AJOUTER":
                setFormParams({
                    icon: "plus",
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
                    icon: "edit",
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
                    icon: "trash",
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
        if (window.confirm("Voulez supprimer cette prestataire?")) {
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
            inputDirectionReg.ville !== "" &&
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
            <FormButton onClick={() => {setFormMode("AJOUTER")}}>Ajouter</FormButton>
        </SmallHeader>

        {/* Tableau des donnees */}
        {
            loading ?
                <div>Chargement...</div> :
                <Table
                    columns={columns}
                    data={directionReg}
                    buttons
                    delete={openDeleteForm}
                    edit={openEditForm} />
        }

        {/* Formulaire d'ajout ou de modification */}
        <FormPopup
            {...formParams}
            onClose={closeForm}
        >
            <TextInput
                type="number"
                label="Code"
                value={inputDirectionReg.code}
                onChange={(e) => {setInputDirectionReg({...inputDirectionReg, code: e.target.value})}}
                icon="none"
            />
            <TextInput
                type="text"
                label="Designation"
                value={inputDirectionReg.designation}
                onChange={(e) => {setInputDirectionReg({...inputDirectionReg, designation: e.target.value})}}
                icon="none"
            />
            <TextInput
                type="text"
                label="Ville"
                value={inputDirectionReg.ville}
                onChange={(e) => {setInputDirectionReg({...inputDirectionReg, ville: e.target.value})}}
                icon="none"
            />
            <TextInput
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
