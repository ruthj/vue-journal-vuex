import journalApi from "../../../../api/journalApi"

//asyncrone actions that can call mutations
// export const myAction = async ({commit}) => {




export const loadEntries = async ({commit}) => {

    const {data} = await journalApi.get('/entries.json')

    if(!data) {
        commit('setEntries', [entries])
        return 
    }
    const entries = []
    
    for(let id of Object.keys(data)){
        entries.push({
            id,
            ...data[id]
        })
    }

   // console.log(entries)
    commit('setEntries', entries)
}

export const updateEntries =  async( {commit}, entry) => {//entry debe ser parametro

    const {date, picture,text} = entry
    const dataToSave = {date, picture,text}
    const response = await journalApi.put(`/entries/${entry.id}.json`, dataToSave)
    console.log(response)

    dataToSave.id = entry.id
    commit('updateEntry', {...dataToSave})

}

export const createEntry = async ({commit}, entry) => {


    const {date, picture,text} = entry
    const dataToSave = {date, picture,text}

    const {data} = await journalApi.post(`/entries.json`,dataToSave )
    
    dataToSave.id = data.name


    commit('addEntry', dataToSave)
    return  data.name
    
}


export const deleteEntry = async ({commit}, id) => {
    //console.log('action id', id)

    await journalApi.delete(`/entries/${id}.json`)
   
    commit('deleteEntry', id)
    
}