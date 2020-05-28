const dossierSevice = {
    getDossiersEnInstance: function (categorie) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    dossiers: [
                        {
                            imme: 13342,
                            beneficiaire: "Mohammed El Madani",
                            NumDossier: "5666-2020-02-100",
                            debutSoin: "05/02/2020",
                            formulair: "NM121",
                            convention: "France",
                            Agence: "Maarif",
                            Direction: "Direction Regionale Casa Anfa"
                        },
                        {
                            imme: 12342,
                            beneficiaire: "Jhon Doe",
                            NumDossier: "5666-2020-02-100",
                            debutSoin: "05/02/2020",
                            formulair: "NM121",
                            convention: "France",
                            Agence: "Maarif",
                            Direction: "Direction Regionale Casa Anfa"
                        },
                        {
                            imme: 13323,
                            beneficiaire: "Alami Ali",
                            NumDossier: "5666-2020-02-100",
                            debutSoin: "05/02/2020",
                            formulair: "NM121",
                            convention: "France",
                            Agence: "Maarif",
                            Direction: "Direction Regionale Casa Anfa"
                        }
                    ],
                    actions: [
                        "nouveau",
                        "modifier",
                        "consulter"
                    ]
                });
            }, 1500);
        })
    },

    getMenu: function () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([
                    "En instance",
                    "Retourne",
                    "Blocage TP"
                ]);
            }, 1500);
        })
    }
}

export default dossierSevice;