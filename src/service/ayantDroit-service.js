const ayantDroitSevice = {
    getAyantDroitEnInstance: function () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    ayantDroit: [
                        {
                            immatriculation: 13342,
                            rang:1,
                            lien:"conjoint",
                            nom: "El Madani",
                            prenom: "Malika",
                            dateNaissance: "1996/08/13",
                            sexe:"féminin",
                            CIN:"B123587",
                            formulaireDroit: "NM121",
                            debutCouverture: "2020-02-25",
                            finCouverture: "2020-06-05",
                            agence: "Maarif",
                        },
                        {
                            immatriculation: 13342,
                            rang:"2",
                            lien:"conjoint",
                            nom: "El Madani",
                            prenom: "Meyem",
                            dateNaissance: "1999/03/13",
                            sexe:"féminin",
                            CIN:"B128833",
                            formulaireDroit: "NM121",
                            debutCouverture: "2020-02-25",
                            finCouverture: "2020-06-05",
                            agence: "Maarif"
                        },
                       
                    ],
                    actions: [
                       
                    ]
                });
            }, 1500);
        })
    },

    getMenu: function () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([
                    {
                        name: "En instance",
                        path: "/en_instance"
                    },
                    {
                        name: "Retourne",
                        path: "/retourne"
                    },
                ]);
            }, 1500);
        })
    }
}

export default ayantDroitSevice;