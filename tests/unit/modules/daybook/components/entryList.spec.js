import {createStore} from 'vuex'
import { shallowMount } from '@vue/test-utils'
import EntryList from '../../../../../src/modules/daybook/components/EntryList.vue'
import journal from '../../../../../src/modules/daybook/store/journal'
import {journalState} from '../../../mock-data/test-journal-state'



describe('Test EntryList component', () => {

    const createVuexStore = (initialState) => 
        createStore({
            modules: {
                journal: {
                    ...journal,
                    state: {...initialState}
                }
            }
        })

        const store = createVuexStore(journalState)
        
        const mockRouter = {
            push: jest.fn()
        }

        let  wrapper 
        

        beforeEach (() =>{

            jest.clearAllMocks()
            wrapper = shallowMount(EntryList, {
                global: {
                    mocks: {
                        $router: mockRouter
                    },
                    plugins: [store]
                }
            })
        })

    test('should find entry', () => {
      
      expect(wrapper.findAll('entry-stub').length).toBe(2)
      
    })

    test('should call getEntryByTerm', async() => {
      
        const input = wrapper.find('input')

        await input.setValue('second')

        expect(wrapper.findAll('entry-stub').length).toBe(1)
        
      })

      test('New botton should redirect ', async() => {
      
        wrapper.find('button').trigger('click')

        expect(mockRouter.push)
            .toHaveBeenCalledWith({name:'entry', params:{id:'new'}})
        
      })

})