
const mondataireSevice = {
    getMondataireEnInstance: function (categorie) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    mondataire: [
                        {
                            Nom:"Rahal",
                            Pénom:"Meryem",
                            CIN:"123",
                            Rang:"1",
                            Adresse:"Azhar 2 N°85 ",
                            Ville:"Rabat",
                            CodePostale:"2563",
                            RIB:"213656",	
                            DateDebut:"19/08/2005",
                            DateFin:"16/05/2019"
                        },
                        

                    ],
                    actions: [
                        "nouveau",
                        "modifier"
                       
                    ]
                });
            }, 1500);
        })
    },
}

export default mondataireSevice;