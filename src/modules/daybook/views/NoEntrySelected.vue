<template>
  <div class="d-flex justify-contente center">
      <h1 class="align-self-center">
          No entry selected
      </h1>
  </div>
  <Fab @on:click="createNewEntry"/>
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
export default {
    name:'NoEntrySelected',
    components:{
        Fab: defineAsyncComponent(() => import('../components/Fab.vue'))
    },
    methods: {
        createNewEntry() {
            this.$router.push({name:'entry', params: {id:'new'}})
        }
    }
}
</script>

<style lang="scss" scoped>
    div{
        height: 100%;
    }
</style>