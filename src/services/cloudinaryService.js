import axios from 'axios'

export default {
    uploadImg
}

async function uploadImg(ev) {
    const CLOUD_NAME = 'dkvjwcj4r'; 
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const formData = new FormData();
    formData.append('file', ev.target.files[0]);
    formData.append('upload_preset', 'tgon7tca'); 

    return await axios.post(`${UPLOAD_URL}`, formData)

}