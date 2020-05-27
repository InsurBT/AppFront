import api from '../environement/api';

const prestationService = {
    getAll: function(nom) {
        return api.get("prestation/getAll", {"Authorization": sessionStorage.getItem("authToken")}).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.text();
            }
        });
        
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