import React, {useState} from 'react';
import FormPrestation from './formPrestation'
import { makeStyles } from '@material-ui/core/styles';
import Table from '../../../components/table';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Popup from 'reactjs-popup';
import FormPopup from '../../../components/form-popup';

export default function Prestations(props) {
    const {prestations, setPrestations, classes} = props;

    const [openForm, setOpenForm] = useState(false);

    const [inputPrestation, setInputPrestation] = useState({
        prestation: "",
        nbrActes: "",
        montantEngage: "",
    });

    const columns = [
        {
            title: <Button
                        variant="contained"
                        className={classes.button}
                        onClick={() => {setOpenForm(true)}}
                    >Ajouter</Button>
        },
        { title: "Prestation", property: "prestation" },
        { title: "Nbr Actes", property: "nbrActes" },
        { title: "Montant Engage", property: "montantEngage" },
        { title: "Montant payee", property: "montantPaye" }
    ]

    return (
        <div>
            <Table
                data={prestations}
                columns={columns}
                pageSize={4}
            />
            <FormPopup
                open={openForm}
                title={"Ajouter Prestation"}
                onClose={() => {setOpenForm(false)}}
            >
                <FormPrestation prestation={inputPrestation} setPrestation={setInputPrestation} />
            </FormPopup>
        </div>
);
}
