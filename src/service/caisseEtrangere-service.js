import api from '../environement/api';

const CaisseEtrangereService = {
    getAll: function(nom) {
        return api.get("CaisseEtrangere/listCaisseEtrangere", {"Authorization": sessionStorage.getItem("authToken")}).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.text();
            }
        });
        
    },

    add: function (CaisseEtrangere) {
        return api.post("CaisseEtrangere/save", CaisseEtrangere, {"Authorization": sessionStorage.getItem("authToken")}).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.text();
            }
        });
    },

    delete: (id) => {
        return api.post("CaisseEtrangere/delete", id, {"Authorization": sessionStorage.getItem("authToken")}).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.text();
            }
        });
    },

    edit: (CaisseEtrangere) => {
        return api.post("CaisseEtrangere/update", CaisseEtrangere, {"Authorization": sessionStorage.getItem("authToken")}).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.text();
            }
        });
    }
}

export default CaisseEtrangereService;