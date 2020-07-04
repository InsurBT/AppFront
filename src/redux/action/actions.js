import * as ACTIONS from './actions-type'

export const ajouterDossier = data => {
    return {
        type: ACTIONS.AJOUTER_DOSSIER,
        data
    }
}

export const ajouterPrestation = data => {
    return {
        type: ACTIONS.AJOUTER_PRESTATION,
        data
    }
}

export const ajouterAssures = data => {
    return {
        type: ACTIONS.AJOUTER_ASSURES,
        data
    }
}

export const ajouterAyantsDroit = data => {
    return {
        type: ACTIONS.AJOUTER_AYANTSDROIT,
        data
    }
}