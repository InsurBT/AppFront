import * as ACTIONS from './actions-type'

export const ajouterDossier = data => {
    return {
        type: ACTIONS.AJOUTER_DOSSIER,
        data
    }
}