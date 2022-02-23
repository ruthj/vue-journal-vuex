import { createStore } from 'vuex'
import journal from '../../../../../../src/modules/daybook/store/journal'
import {journalState} from '../../../../mock-data/test-journal-state'


const createVuexStore = (initialState) => 
createStore({
    modules: {
        journal: {
            ...journal,
            state: {...initialState}
        }
    }
})

describe('VUEX- Test Journal Module', () => {

    test('inicial state', () => {
        
        const store = createVuexStore(journalState)
        //console.log(store.state)

        const {isLoading, entries} = store.state.journal

        expect(isLoading).toBeFalsy()
        expect(entries).toEqual(journalState.entries)

    })

    //Mutations

    test('mutation: setEntries', () => {
        const store = createVuexStore({isLoading: true, entries:[] })
        
        store.commit('journal/setEntries', journalState.entries)

        expect(store.state.journal.entries.length).toBe(2)
        expect(store.state.journal.isLoading).toBeFalsy()
    })

    test('mutation: updateEntry', () => {
        const store = createVuexStore(journalState)

        const updatedEntry = {
             
            id: '-Mpj6cxHWJApzo-X90J6',
            date: 1638286608449,
            picture: "https://res.cloudinary.com/dkmyf5au0/image/upload/v1638287108/bh5xhrmjl3zopseugahc.jpg",
            text: "MOCK DATA from test case"
            
        }

        store.commit('journal/updateEntry', updatedEntry )

        const storeEntries = store.state.journal.entries

        expect(storeEntries.length).toBe(2)
        expect(
            storeEntries.find(e => e.id === updatedEntry.id)
            
        ).toEqual(updatedEntry)
        
      
    })

    test('mutation: addEntry deleteEntry', () => {

        const store = createVuexStore(journalState)

        store.commit('journal/addEntry', {id:'ABC-123', text:'Hello World'} )

        const storeEntries = store.state.journal.entries

        expect(storeEntries.length).toBe(3)
        //console.log(storeEntries)
        //expect(storeEntries[0].id).toBe('ABC-123')
        expect(storeEntries.find(e => e.id === 'ABC-123').id).toBe('ABC-123')
        expect(storeEntries.find(e => e.id === 'ABC-123')).toBeTruthy()

        store.commit('journal/deleteEntry', 'ABC-123')
        expect(store.state.journal.entries.length).toBe(2)
        expect(store.state.journal.entries.find(e => e.id === 'ABC-123')).toBeFalsy()
    })

    //Getters ==================
    test('Getters: getEntriesByTerm getEntriesById', () => {
        const store = createVuexStore(journalState)

        const [entry1, entry2] = journalState.entries

        expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2)
        expect(store.getters['journal/getEntriesByTerm']('second').length).toBe(1)

        expect(store.getters['journal/getEntriesByTerm']('second')).toEqual([entry2])

        expect(store.getters['journal/getEntriesById']('-Mpj6cxHWJApzo-X90J6')).toEqual(entry1)

    })

      //Actions ==================
      test('Actions: loadEntries ', async() => {
        const store = createVuexStore({isLoading: true, entries:[] })

        await store.dispatch('journal/loadEntries')

        //expect(store.state.journal.entries.length).toBe(4)
        


    })

    test('Actions:  updateEntries', async() => {
        const store = createVuexStore(journalState)
        
        const updatedEntry = 
            {   
                id: '-Mpj6cxHWJApzo-X90J6',
                date: 1638286608449,
                text: "MOCK DATA",
                otroCampo: true,
                oneMore:{a:14}
            }
        

        await store.dispatch('journal/updateEntries', updatedEntry)

        expect(store.state.journal.entries.length).toBe(2)

       //console.log(store.state.journal.entries)
        expect(
            store.state.journal.entries.find(e => e.id === updatedEntry.id)
        ).toEqual({
            id: '-Mpj6cxHWJApzo-X90J6',
            date: 1638286608449,
            text: "MOCK DATA",
        })

        
    })



    test('Actions: createEntry deleteEntry', async() => {
        const store = createVuexStore(journalState)


        const newEntry = 
            {   
                date: 1638983376398,
                text: "New Entry testCase",

            }
        
            //The action returns an ID 
        const id = await store.dispatch('journal/createEntry', newEntry)

       //console.log( store.state.journal.entries)
        //expect(typeof url).toBe('string')

        console.log(id)

        expect(typeof id).toBe('string')

        expect (store.state.journal.entries.find(e => e.id === id)).toBeTruthy()

        await store.dispatch('journal/deleteEntry', id)

        expect (store.state.journal.entries.find(e => e.id === id)).toBeFalsy()
    })
})