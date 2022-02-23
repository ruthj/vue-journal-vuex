import axios from 'axios'
import cloudinary from 'cloudinary'
import uploadImage  from '../../../../../src/modules/daybook/helpers/uploadImage'


cloudinary.config({
    cloud_name:'dkmyf5au0',
    api_key:'525713197966536',
    api_secret:'MMNbpHwiKGwjKH2wEovk4OkE4vQ'
})

describe('Test daybook uploadImage', () => {

    test('should upload file and return URL', async (done) => {

        const {data} = await axios.get('https://res.cloudinary.com/dkmyf5au0/image/upload/v1638284777/sample.jpg', {
            responseType: 'arraybuffer' //fix image
        })


        const file = new File([data], 'img.jpg')
        //console.log(file)

        const url = await uploadImage(file)

        expect(typeof url).toBe('string')


        //take id

       // console.log(url)
       const segments = url.split('/')
       const imageId = segments[segments.length - 1].replace('.jpg', '')
       //console.log(imageId)
       cloudinary.v2.api.delete_resources(imageId, {}, () => {
            done()//notify to asyc that is finished
       })


    })

})

