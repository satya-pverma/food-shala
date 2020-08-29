const express = require('express');
const Restaurent = require('../models/restaurentsModel');
const { getToken, isAuth } = require('../util');

const router = express.Router();


router.post('/restsignin', async (req, res) => {

    const signinRestaurent = await Restaurent.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if (signinRestaurent) {
        res.send({
            _id: signinRestaurent.id,
            name: signinRestaurent.name,
            email: signinRestaurent.email,
            isAdmin: signinRestaurent.isAdmin,
            token: getToken(signinRestaurent)
        })

    } else {
        res.status(401).send({ msg: 'Invalid Email or Password.' });
    }

})

router.post('/restregister', async (req, res) => {
    const user = new Restaurent({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,

    });
    const newUser = await user.save();
    if (newUser) {
        res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser)
        })
    } else {
        res.status(401).send({ msg: 'Invalid User Data.' });
    }

})
module.exports = router