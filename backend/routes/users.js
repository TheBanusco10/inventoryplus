const express = require('express');

const router = express.Router();

const userModel = require('../mongodb/schemas/User');

router.get('/user/:id', async (req, res) => {
    res.send(`Getting User ID: ${req.params.id}`);
});

router.post('/user/register', async (req, res) => {
    
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const user = new userModel({
        name,
        email,
        password
    });

    const newUser = await user.save();

    console.log(newUser);

    res.send('User created');
});

router.post('/user/login', async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    console.log(req.body);

    try {

        const user = await userModel.findOne({email: email});
    
        if (user.password === password) {
            res.send({
                message: 'Logged successfully',
                user,
                status: 200
            });
        }else {
            res.send({
                message: 'Bad credentials',
                status: 401
            });
        }
    
    }catch(error) {
        res.send({
            message: 'User not found',
            status: 401
        });
    }


});

module.exports = router;