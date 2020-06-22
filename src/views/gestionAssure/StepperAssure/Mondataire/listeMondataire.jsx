import React , {useState} from 'react';
import Table from '../../../../components/table';

export default function ListeMondataire() {
    const [mondataire, setMondataire]=useState([]);

    const columns=[
        { title:"Nom", property:"nom"},
        { title: "Pénom", property:"prenom"},
        { title: "CIN", property: "CIN"},
        { title: "Rang", property:"rang"},
        { title: "Adresse", property:"adresse"},
        { title: "Ville", property: "ville"},
        { title:"Code postale", property:"status"},
        { title: "RIB", property: "RIB"},
        { title: "Date début", property:"dateDebut"},
        { title: "Date fin", property:"dateFin"},
    ]

    return (
        <div>
            <Table
                columns={columns}
                data={mondataire}
                pageSize="5"
                />       
        </div>
    )}
