import api from '../../environement/api';

import prestations from '../data/referentielPrestation';

const prestationService = {
    getAll: function() {
        // return api.get("prestation/getAll", {"Authorization": sessionStorage.getItem("authToken")}).then(res => {
        //     if (res.ok) {
        //         return res.json();
        //     } else {
        //         return res.text();
        //     }
        // });
        
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(prestations);
            }, 300);
        })
    },

    add: function (prestation) {
        return api.post("prestation/add", prestation, {"Authorization": sessionStorage.getItem("authToken")}).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.text();
            }
        });
    },

    delete: (id) => {
        return api.post("prestation/delete", id, {"Authorization": sessionStorage.getItem("authToken")}).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.text();
            }
        });
    },

    edit: (prestation) => {
        return api.post("prestation/edit", prestation, {"Authorization": sessionStorage.getItem("authToken")}).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.text();
            }
        });
    }
}

export default prestationService;