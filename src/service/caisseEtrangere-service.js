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

export default CaisseEtrangereService;