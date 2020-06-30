import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
const assureSevice = {
    getAssureEnInstance: function (categorie) {
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
                        "consulter"
                    ]
                });
            }, 1500);
        })
    },
}

export default assureSevice;