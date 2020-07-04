import * as ACTIONS from '../action/actions-type'
import dossiers from '../../service/data/dossiers'

const stateinit = dossiers

const reducer = (state = stateinit, action) => {
    switch (action.type) {
        case ACTIONS.AJOUTER_DOSSIER:
            console.log('action.data' , action.data)
             state.push(action.data)
            return state

        default: return state
    }
}
export default reducer;