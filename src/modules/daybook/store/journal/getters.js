
//getters are functions that bring information from  the state
// export const myGetters = (state) => {
    //return state;
// }



export const getEntriesByTerm = (state) => (term = '') => {

    if(term.length === 0)return state.entries;

    return state.entries.filter(entry => entry.text.toLowerCase().includes(term.toLocaleLowerCase()));
}

export const getEntriesById = (state) => (id='') => {
    const entryFindId = state.entries.find(entry => entry.id === id);
    if(!entryFindId) return 
    return {...entryFindId}

}