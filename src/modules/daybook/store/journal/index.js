
import state from './state'
import * as actions from './actions'
import * as getters from './getters'
import * as mutation from './mutations'


const journalModule = {
    namespaced: true,
    actions,
    getters,
    mutation,
    state
}

export default journalModule   