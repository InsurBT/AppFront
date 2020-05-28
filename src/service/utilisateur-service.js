import api from "../environement/api";

const utilisateurService = {
    connect: function(credentials) {
        const authHeader = "Basic " + btoa(credentials.username + ":" + credentials.password);
        return api.post("utilisateur/login", null, {"Authorization": authHeader}).then(res => {
            if (res.ok) {
                sessionStorage.setItem("authToken", authHeader);
                return res.json();
            } else {
                return res.text();
            }
        });
    },

    disconnect: function() {
        return api.post("logout", null, {"Authorization": sessionStorage.getItem("authToken")});
    },

    getAll: function() {
        return api.get("utilisateur/getAll", {"Authorization": sessionStorage.getItem("authToken")}).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.text();
            }
        });
        
    },

    getLoggedUser: function() {
        return api.post("utilisateur/login", null, {"Authorization": sessionStorage.getItem("authToken")}).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.text();
            }
        });
    },

    add: function (utilisateur) {
        return api.post("utilisateur/inscription", utilisateur, {"Authorization": sessionStorage.getItem("authToken")}).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.text();
            }
        });
    },

    edit: (utilisateur) => {

        return api.post("utilisateur/edit", utilisateur, {"Authorization": sessionStorage.getItem("authToken")}).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.text();
            }
        });
    }
}   

export default utilisateurService;