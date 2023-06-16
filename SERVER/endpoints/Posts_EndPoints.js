const express = require('express');
const router = express.Router();
const multer = require('multer')
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// Models
const postModel = require("../models/Post")


cloudinary.config({
    cloud_name: process.env.API_CLOUD_NAME,
    api_key: process.env.API_CLOUD_KEY,
    api_secret: process.env.API_CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads/',
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => file.originalname,
    },
});

const upload = multer({ storage: storage });

router.get('/blog', async (req, res, next) => {
    res.status(200).json(await postModel.find());
})

router.get('/blog/:id', async (req, res, next) => {
    try {
        res.status(200).json(
            await postModel.findById(
                req.params.id
            )
        );
    } catch (err) {
        //res.status(400).json({error: "User ID not found"}, ...err);
        next();
    }
})
router.post('/blog', upload.single('uploadFile'), async (req, res, next) => {
    // Access the uploaded file via req.file
    console.log(req.file);
    try {
        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        // Delete the local file after uploading to Cloudinary
        fs.unlinkSync(req.file.path);
        // Create a new post with the image URL
        const newPost = new postModel({
            ...req.body,
            cover: result.secure_url
        });
        // Save the new post to the database
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        next(err);
    }
});

// router.post('/blog', upload.single('uploadFile'), async (req, res, next) => {
//     //const obj = req.body;
//     //const newUser = new postModel(obj);
//     //const dbResp = await newUser.save();
//     //res.status(201).json(dbResp)
//     try {
//         res.status(201).json(
//             await (new postModel(req.body)).save()
//         )
//     } catch (err) {
//         next();
//     }
// })

router.put('/blog/:id', async (req, res, next) => {
    //const id = req.params.id;
    //const obj = req.body;
    //const user = await postModel.findByIdAndUpdate(id, obj)
    try {
        res.status(200).json(
            await postModel.findByIdAndUpdate(
                req.params.id,
                req.body))
    } catch (err) {
        //res.status(400).json({error: "User ID not found"}, ...err);
        next();
    }
})

router.delete('/blog/:id', async (req, res, next) => {
    try {
        res.status(200).json(
            await postModel.findByIdAndDelete(req.params.id))
    } catch (err) {
        //res.status(400).json({error: "User ID not found"}, ...err);
        next();
    }
})

module.exports = router;