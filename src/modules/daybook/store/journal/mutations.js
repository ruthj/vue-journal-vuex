
//they create the update of the state. the state is reactive
//when the state changes they will update componets or places where  the state is listening
// export const myMutation =  (state) => {


// }


export const  setEntries  =  (state, entries) => {

    state.entries = [...state.entries, ...entries]
    state.isLoading = false

}

export const updateEntry =  (state, entryUpdate, ) => { //entrada actualizada

    const indexToUpdate = state.entries.findIndex(entry => entry.id === entryUpdate.id)
    state.entries[indexToUpdate] = entryUpdate
  

}

export const addEntry =  (state, entryCreate) => {

    state.entries = [entryCreate, ...state.entries]

}

export const deleteEntry =  (state, id) => {

    state.entries = state.entries.filter(entry => entry.id !== id)

}