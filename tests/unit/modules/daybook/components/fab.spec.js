import { shallowMount } from '@vue/test-utils'
import Fab from '../../../../../src/modules/daybook/components/Fab.vue'

describe('Test FAB component', () => {

  it('should show default icon', () => {
    
    const wrapper = shallowMount(Fab)

    const iconTag = wrapper.find('i')

    expect (iconTag.classes('fa-plus')).toBeTruthy()
    
  })

  it('should show icon by argument fa-circle', () => {
    const wrapper = shallowMount(Fab, {
        props: {
            icon: 'fa-circle'
        }
    })

    const iconTag = wrapper.find('i')
    expect (iconTag.classes('fa-circle')).toBeTruthy()
    

  })

  it('should emit on:click event when clicking', () => {
    
    const wrapper = shallowMount(Fab)

    const emitClick = wrapper.find('button')

    emitClick.trigger('click')

    console.log(wrapper.emitted())

    expect(wrapper.emitted('on:click')).toHaveLength(1)

    })

})
