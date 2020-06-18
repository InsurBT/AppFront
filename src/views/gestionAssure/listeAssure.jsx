
import React , { useState, useEffect  } from 'react'
import Table from '../../components/table';


export default function ListeAssure() {
    const [assure, setAssure] = useState([]);
    
    const columns = [
        { title: "button", property: "button" },
        { title: "ImmCE", property: "immce" },
        { title: "Lien Parenté", property: "lienParente" },
        { title: "Nom", property: "nom" },
        { title: "Prénom", property: "prenom" },
        { title: "Formulaire droit", property: "formulaireDroit" },
        { title: "Debut couverture", property: "debutCouverture" },
        { title: "Fin couverture", property: "finCouverture" },
        { title: "Agence", property: "agence" },
        { title: "Ayants droits", property: "ayantsDroiot" },
    ];

     return (
         <div>
             <Table
                    columns={columns}
                    data={assure}
                    pageSize="5"
                    />
         </div>
     )


}
