import { shallowMount } from '@vue/test-utils'
import Entry from '../../../../../src/modules/daybook/components/Entry.vue'
import {journalState} from '../../../mock-data/test-journal-state'

describe('Entry component', () => {

    const mockRouter ={
        push: jest.fn()
    }

    let wrapper
    
    beforeEach(() => {
        wrapper = shallowMount(Entry, {
            props: {
                entry: journalState.entries[0]
            },
            global: {
                mocks: {
                    $router: mockRouter
                }
            }
        })
    })

    test('should match with snapshot', () => {
        expect (wrapper.html()).toMatchSnapshot()
    })

    test('should redirect when click entry', () => {
       
        const clickEvent = wrapper.find('.entry-container')//finds by class
        clickEvent.trigger('click')

        expect(mockRouter.push).toHaveBeenCalledWith({
            name: 'entry',
            params: {
                id: journalState.entries[0].id
            }
        })
    })

    test('computed properties test', () => {
       
        const dates = wrapper.vm
        expect(dates.day).toBeTruthy()
        expect(dates.month).toBeTruthy()
        expect(dates.yearDay).toBeTruthy()
        //console.log(wrapper.vm)

    })

})