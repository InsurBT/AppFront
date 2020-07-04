import api from '../environement/api';
import { useState } from 'react';

const CaisseMereService = {
    getAll: function() {
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
    },
    getAllBypays: (id) => {
        return api.post("CaisseMere/getAll", id, {"Authorization": sessionStorage.getItem("authToken")}).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.text();
            }
        });
    },
    getFiltredCaisse: (filtre,data) => {
  
        return new Promise((resolve, reject) => {
         
            let filteredCaisse =data.filter((caisse) => {
                let match = true;
                for (let attribute in caisse) {
                    if (filtre[attribute])
                        match = match && (filtre[attribute] === caisse[attribute]);
                }
                return match;
            })
            setTimeout(() => {
                resolve(filteredCaisse );
            }, 1500);
        });
    },

}

export default CaisseMereService;