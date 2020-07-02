const ayantDroitSevice = {
    getAyantDroitEnInstance: function (categorie) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    ayantDroit: [
                        {
                            Nom: "maazi",
                            Penom: "Youssef",
                            NomJeuneFille: " El Madani",
                            lienParente: "fils",
                            status: "Célebataire",
                            rang: " 2",
                            sexe: " masculin",
                            dateNaissance: "13/05/1997",
                            dateAdhésion:"15/12/2012",
                            CIN:"BH55232",
                            RIP:"3233333546548798987",
                        },
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
}

export default ayantDroitSevice;