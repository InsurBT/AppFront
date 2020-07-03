import dossiers from "./data/dossiers";

const dossierSevice = {
    getDossiersEnInstance: function (categorie) {
        let actions = [];

        switch (categorie) {
            case "en_instance":
                actions = ["valider", "retourner"];
                break;
            case "valide":
                actions = ["remettre en instance", "retourner"];
                break;
            case "retourne":
                actions = ["remettre en instance", "valider"];
                break;
            default:
                actions = ["aucune action pour cette categorie"]
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    dossiers: dossiers.filter(dossier => dossier.categorie === categorie),
                    actions
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
                        name: "Retourné",
                        path: "/retourne"
                    },
                    {
                        name: "Validé",
                        path: "/valide"
                    }
                ]);
            }, 1500);
        })
    }
}

export default dossierSevice;