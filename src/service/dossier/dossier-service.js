import dossiers from "../data/dossiers";
import prestations from "../data/prestation";
import { store } from '../../index'
import * as ACTIONS from '../../redux/action/actions'


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
    ajouterDossier: function (dossier, prests) {
        console.log("ajouter dossier")
        let action = ACTIONS.ajouterPrestation(dossier)
        store.dispatch(action);
        prestations.push(prests)
        
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