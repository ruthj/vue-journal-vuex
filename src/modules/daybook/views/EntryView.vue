<template>

    <template v-if="entry"> 
        <div class="entry-title d-flex justify-content-between p-2">
            <div>
                <span class="text-success fs-3 fw-bold">{{day}}</span>
                <span class="mx-1 fs-3">{{month}}</span>
                <span class="mx-2 fs-4 fw-light">{{yearDay}}</span>
            </div>
            <div>
                <input type="file"
                    @change="onSelectedImg"
                    ref="imagesSelector"
                    v-show="false"
                    accept="image/png, image/jpeg"
                >
                <button
                    v-if="entry.id" 
                    class="btn btn-danger mx-2"
                    @click="deleteEntryMethod">
                    Delete
                    <i class="fa fa-trash-alt"></i>   
                </button>
                <button class="btn btn-primary "
                    @click="onSelectImage"
                >
                    Upload
                    <i class="fa fa-upload"></i>   
                </button>
            </div>
        </div>

        <hr>

        <div class="d-flex flex-column px-3 h-75">
            <textarea
                placeholder="What happened today?"
                v-model="entry.text"
                ></textarea>
        </div>
 

        <img 
            v-if="entry.picture && !localImage"
            :src="entry.picture" 
            alt="entry-picture"
            class="img-thumbnail">

        <img 
            v-if="localImage"
            :src="localImage" 
            alt="entry-picture"
            class="img-thumbnail"
        >

    </template>

     <Fab 
        icon="fa-save"
        @on:click="saveEntry"
        
    />
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
import {mapGetters, mapActions} from 'vuex' // getters are computed properties
import getDayMonthYear from '../helpers/getDayMonthYear'
import uploadImage from '../helpers/uploadImage'
import Swal from 'sweetalert2'

export default {
    name:'EntryView',
    props:{
        id:{
            type: String,
            required: true
        }
    },

    components: {
        Fab: defineAsyncComponent(() => import('../components/Fab.vue'))
    },

    data(){
        return {
            entry: null,
            localImage: null,
            file: null
        }
    },
    
    computed: {
         
        ...mapGetters('journal', ['getEntriesById']),

        day() {
            const {day} = getDayMonthYear(this.entry.date)
            return day
        },
        month() {
            const {months} = getDayMonthYear(this.entry.date)
            return months
        },
         yearDay() {
            const {yearDay} = getDayMonthYear(this.entry.date)
            return yearDay
        },

        
    },

    methods: {
        ...mapActions('journal', ['updateEntries','createEntry','deleteEntry']),
        
        loadEntry(){
            let entry
            if (this.id === 'new'){
                entry = {
                    text: 'new text',
                    date: new Date().getTime()
                }
            }else {
                entry = this.getEntriesById(this.id)
                //console.log('hola', this.id)
                if (!entry) return this.$router.push({name: 'no-entry'})
            }
            this.entry = entry
        },
        
        async saveEntry() {

            new Swal ({
                title:'Loading...',
                allowOutsideClick: false
            })
            Swal.showLoading()

           
            const picture = await uploadImage( this.file )
            
            this.entry.picture = picture

            if(this.entry.id){
                await this.updateEntries(this.entry)
            
            }else {
               const id = await this.createEntry(this.entry)
               this.$router.push({name:'entry', params: {id}})
            }

            this.file = null 

            Swal.fire('Succesfully', 'Saved', 'success')
        },

        async deleteEntryMethod() {
            
            const {isConfirmed} = await Swal.fire({
                title:'Are you sure you want to delete?',
                text: '!!!!',
                showDenyButton: true,
                confirmButtonText:'Yes, Sure'
            })

            if (isConfirmed){
                 Swal.fire({
                    title:'Wait',
                    allowOutsideClick:false
                })
                Swal.showLoading()
                await this.deleteEntry(this.entry.id)

                this.$router.push({name: 'no-entry'})
 
               Swal.fire('Deleted', '', 'success')
            }
           
        },

        onSelectedImg($event) {
            const file = $event.target.files[0]

            if(!file) {
                this.localImage = null
                this.file = null
                return
            } 

            this.file = file
            const fr = new FileReader()
            fr.onload = () => this.localImage = fr.result
            fr.readAsDataURL(file)
            //this.localImage 


        },

        onSelectImage() {
           this.$refs.imagesSelector.click()

        }
    },

    created () {
        //cons/ole.log(this.id)
        this.loadEntry()
    },

//watch will see the ID
//console.log(value, oldValue)
    watch:{
        id() {
            this.loadEntry()
        }
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