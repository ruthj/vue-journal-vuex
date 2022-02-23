import { shallowMount } from '@vue/test-utils'
import Home from '../../../src/views/Home'

describe('Home View', () => {

  it('should match snapshot', () => {
    
    const wrapper = shallowMount(Home)
    expect (wrapper.html()).toMatchSnapshot()

  })

  it('should click and redirect to no-entry', () => {
    
    const mockRouter = {
        push: jest.fn()
    }

    const wrapper = shallowMount(Home, {
        global: {
            mocks: {
                $router: mockRouter
            }
        }
    })

    wrapper.find('button').trigger('click')

    expect(mockRouter.push).toHaveBeenCalled()

    expect(mockRouter.push).toHaveBeenCalledWith({name: 'no-entry'})



  })

})
