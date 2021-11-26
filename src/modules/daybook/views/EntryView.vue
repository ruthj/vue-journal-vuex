<template>
  <div class="entry-title d-flex justify-content-between p-2">
      <div>
          <span class="text-success fs-3 fw-bold">26</span>
          <span class="mx-1 fs-3">Nov</span>
          <span class="mx-2 fs-4 fw-light">2021</span>
      </div>
      <div>
          <button class="btn btn-danger mx-2">
              Delete
             <i class="fa fa-trash-alt"></i>   
          </button>
           <button class="btn btn-primary ">
              Upload
             <i class="fa fa-upload"></i>   
          </button>
      </div>
  </div>

  <hr>

  <div class="d-flex flex-column px-3 h-75">
      <textarea placeholder="What happened today?"></textarea>
  </div>
  <Fab icon="fa-save"/>

  <img 
    src="https://media.cntraveler.com/photos/59ef91dd8d4f736d51415c2e/master/w_2667,h_2000,c_limit/7MileBeach-2013-HiRes.jpg" 
    alt="entry-picture"
    class="img-thumbnail">
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
export default {
    components: {
        Fab: defineAsyncComponent(() => import('../components/Fab.vue'))
    }
}
</script>

<style lang="scss" scoped>
    textarea{
        font-size: 20px;
        border:none;
        height: 100%;

        &:focus{
            outline: none;
        }
    }
    img{
        width: 200px;
        position: fixed;
        bottom: 150px;
        right: 20px;
        box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
    }
</style>