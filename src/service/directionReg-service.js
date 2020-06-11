import api from '../environement/api';

const DirectionRegService = {
    getAll: function(code) {
        return api.get("directionreg/getAll", {"Authorization": sessionStorage.getItem("authToken")}).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.text();
            }
        });
        
    },

    add: function (directionreg) {
        return api.post("directionreg/add", directionreg, {"Authorization": sessionStorage.getItem("authToken")}).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.text();
            }
        });
    },

    delete: (id) => {
        return api.post("directionreg/delete", id, {"Authorization": sessionStorage.getItem("authToken")}).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.text();
            }
        });
    },

    edit: (directionreg) => {
        return api.post("directionreg/edit", directionreg, {"Authorization": sessionStorage.getItem("authToken")}).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.text();
            }
        });
    }
}

export default DirectionRegService;