import React, {useState} from 'react';
import FormPrestation from './formPrestation'
import { makeStyles } from '@material-ui/core/styles';
import Table from '../../../components/table';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Popup from 'reactjs-popup';

export default function Prestations(props) {
    const {prestations, setPrestations, classes} = props;

    const columns = [
        {
            title: <Button variant="contained" className={classes.button}>Ajouter</Button>
        },
        { title: "Prestation", property: "prestation" },
        { title: "Nbr Actes", property: "nbrActes" },
        { title: "Montant Engage", property: "montantEngage" },
        { title: "Montant payee", property: "montantPaye" }
    ]

    return (
        <Table
            data={prestations}
            columns={columns}
            pageSize={4}
        />
);
}
