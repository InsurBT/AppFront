import * as ACTIONS from '../action/actions-type'
import assures from '../../service/data/assures'

const stateinit = assures

const reducer = (state = stateinit, action) => {
    switch (action.type) {
        case ACTIONS.AJOUTER_ASSURES:
            console.log('action.data' , action.data)
             state.push(action.data)
            return state

        default: return state
    }
}
export default reducer;