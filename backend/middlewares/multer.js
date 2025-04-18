/* setting up a file upload handler using Multer, 
which is a middleware for handling multipart/form-data, used for uploading files in Node.js applications.*/

import multer from 'multer'

const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, file.originalname)
    }
})

const upload = multer({ storage })

export default upload;