import {createStore} from 'vuex'

import Swal from 'sweetalert2'
import { shallowMount } from '@vue/test-utils'
import EntryView from '../../../../../src/modules/daybook/views/EntryView.vue'
import journal from '../../../../../src/modules/daybook/store/journal'
import {journalState} from '../../../mock-data/test-journal-state'

const createVuexStore = (initialState) => 
    createStore({
        modules: {
            journal: {
                ...journal,
                state: {...initialState}
            }
        }
})

jest.mock('sweetalert2', () => ({

    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()


}))

       

describe('Test EntryView component', () => {
    const store = createVuexStore(journalState)

    store.dispatch = jest.fn()

    const mockRouter = {
        push: jest.fn()
    }

    let  wrapper 
    

    beforeEach (() =>{

        jest.clearAllMocks()
        wrapper = shallowMount(EntryView, {
            props: {
                id: '-Mpj6cxHWJApzo-X90J6'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store]
            }
        })
    })
    
    test('Should redirect the user because the id is not valid', () => {

        const wrapper = shallowMount(EntryView, {
            props: {
                id: 'No valid'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store]
            }
        })

        expect(mockRouter.push).toHaveBeenCalledWith({name: 'no-entry'})

    })

    test('Should show the correct entry', () => {

        expect(mockRouter.push).not.toHaveBeenCalled()
        
    })

    test('Should delete entry ', (done) => {

        Swal.fire.mockReturnValueOnce(Promise.resolve({isConfirmed: true}))

        wrapper.find('.btn-danger').trigger('click')

       expect(Swal.fire).toHaveBeenCalledWith({
        title:'Are you sure you want to delete?',
        text: '!!!!',
        showDenyButton: true,
        confirmButtonText:'Yes, Sure'
       })
        
       setTimeout(() => {

        expect(store.dispatch).toHaveBeenCalledWith("journal/deleteEntry", "-Mpj6cxHWJApzo-X90J6")
        expect(mockRouter.push).toHaveBeenCalled()
        done()

       },1)


       

      })

})