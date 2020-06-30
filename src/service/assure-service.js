
const assureSevice = {
    getAll: function () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    assure: [
                        {
                            imme: 13342,
                            lienParente: "5666-2020-02-100",
                            nom: " El Madani",
                            prenom: "Mohammed",
                            formulaireDroit: "NM121",
                            debutCouverture: " 05/02/2020",
                            finCouverture: " 05/06/2020",
                            agence: "Maarif",
                            ayantsDroit: "",
                        },
                    ],
                    actions: [
                        "nouveau",
                        "modifier",
                        "consulter"
                    ]
                });
            }, 1500);
        });
    },

    getFiteredAssures: (filtre) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([
                        {
                            imme: 13342,
                            lienParente: "5666-2020-02-100",
                            nom: " El Madani",
                            prenom: "Mohammed",
                            formulaireDroit: "NM121",
                            debutCouverture: " 05/02/2020",
                            finCouverture: " 05/06/2020",
                            agence: "Maarif",
                            ayantsDroit: "",
                        },
                    ]);
            }, 1500);
        });
    },

    getAssureById: (id) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    imme: 13342,
                    lienParente: "5666-2020-02-100",
                    nom: " El Madani",
                    prenom: "Mohammed",
                    formulaireDroit: "NM121",
                    debutCouverture: " 05/02/2020",
                    finCouverture: " 05/06/2020",
                    agence: "Maarif",
                    ayantsDroit: "",
                });
            }, 1500);
        });
    }
}

export default assureSevice;