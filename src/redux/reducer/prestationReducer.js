import * as ACTIONS from '../action/actions-type'
import prestations from '../../service/data/prestation'

const stateinit = prestations

const reducer = (state = stateinit, action) => {
    switch (action.type) {
        case ACTIONS.AJOUTER_PRESTATION:
            console.log('action.data' , action.data)
             state.push(action.data)
            return state

        default: return state
    }
}
export default reducer;