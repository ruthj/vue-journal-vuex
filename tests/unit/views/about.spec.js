import { shallowMount } from '@vue/test-utils'
import About from '../../../src/views/About'

describe('About View', () => {
  it('should match snapshot', () => {
    
    const wrapper = shallowMount(About)
    expect (wrapper.html()).toMatchSnapshot()

  })
})
