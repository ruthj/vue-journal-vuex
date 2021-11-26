<template>
  <div class="d-flex justify-contente center">
      <h1 class="align-self-center">
          No entry selected
      </h1>
  </div>
  <Fab/>
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
export default {
    components:{
        Fab: defineAsyncComponent(() => import('../components/Fab.vue'))
    }
}
</script>

<style lang="scss" scoped>
    div{
        height: 100%;
    }
</style>