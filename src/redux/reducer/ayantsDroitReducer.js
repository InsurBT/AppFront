import * as ACTIONS from '../action/actions-type'
import ayantDroit from '../../service/data/ayantsDroit'

const stateinit = ayantDroit

const reducer = (state = stateinit, action) => {
    switch (action.type) {
        case ACTIONS.AJOUTER_AYANTSDROIT:
            console.log('action.data' , action.data)
             state.push(action.data)
            return state

        default: return state
    }
}
export default reducer;