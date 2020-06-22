import React , {useState} from 'react';
import Table from '../../../../components/table';

export default function ListeAyantsDroit() {

    const [ayantDroit, setAyantDroit]=useState([]);
 


    const columns=[
        { title:"Nom", property:"nom"},
        { title: "Pénom", property:"prenom"},
        { title:"Nom jeune fille", property: "nomJeuneFille"},
        { title: "Lien Parenté", property:"lienParente"},
        { title:"Status", property:"status"},
        { title: "Rang", property:"rang"},
        { title: "Sexe", property:"sexe"},
        { title: "Date naissance", property:"dateNaissance"},
        { title: "Date adhésion", property: "dateAdhésion"},
        { title: "CIN", property: "CIN"},
        { title: "RIB", property: "RIB"},
    ]

    return (
        <div>
            <Table
                columns={columns}
                data={ayantDroit}
                pageSize="5"
                />       
        </div>
    )
}
