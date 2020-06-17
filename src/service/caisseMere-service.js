import api from '../environement/api';

const CaisseMereService = {
    getAll: function(nom) {
        return api.get("CaisseMere/listCaisseMere", {"Authorization": sessionStorage.getItem("authToken")}).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.text();
            }
        });
        
    },

    add: function (CaisseMere) {
        return api.post("CaisseMere/save", CaisseMere, {"Authorization": sessionStorage.getItem("authToken")}).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.text();
            }
        });
    },

    delete: (id) => {
        return api.post("CaisseMere/delete", id, {"Authorization": sessionStorage.getItem("authToken")}).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.text();
            }
        });
    },

    edit: (CaisseMere) => {
        return api.post("CaisseMere/update", CaisseMere, {"Authorization": sessionStorage.getItem("authToken")}).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.text();
            }
        });
    }
}

export default CaisseMereService;