const express = require('express');
const router = express.Router();

// Models
const userModel = require("../models/Users")

const auth = require("../middlewares/AuthMiddleware")

router.get('/users', auth, async (req, res, next) => {
    res.status(200).json(await userModel.find());
})

// router.get('/users/:id', async (req, res, next) => {
//     try {
//         res.status(200).json(
//             await userModel.findById(
//                 req.params.id
//             )
//         );
//     } catch (err) {
//         next();
//     }
// })

router.post('/users', auth, async (req, res, next) => {
    res.status(201).json(
        await (new userModel(req.body)).save()
    )
})

// router.put('/users/:id', async (req, res, next) => {
//     try {
//     res.status(200).json(
//         await userModel.findByIdAndUpdate(
//                         req.params.id, 
//                         req.body))
//     } catch (err) {
//         next();
//     }
// })

// router.delete('/users/:id', async (req, res, next) => {
//     try {
//     res.status(200).json(
//         await userModel.findByIdAndDelete(req.params.id))
//     } catch (err) {
//         next();
//     }
// })

module.exports = router;