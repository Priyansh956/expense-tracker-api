const {User} = require('../models/userModels'); 

async function signUp(req, res){
    const body = req.body;

    if(!body.email) return res.status(400).json({
        "message": "Enter a valid email",
        "success": false,
    });
    if(!body.password) return res.status(400).json({
        "message": "Enter a password",
        "success": false,
    })
    if(body.password !== body.confirmPassword) return res.status(400).json({
        "message": "The passwords do not match",
        "success": false,
    });
    if(!body.email.includes('@')) return res.status(400).json({
        "message": "Enter a valid email",
        "success": false,
    });
    if(body.password.length < 6) return res.status(400).json({
        "message": "Enter a password of atleast length 6",
        "success": false,
    });

    await User.create({
        email: req.body.email,
        password: req.body.password,
        categories: req.body.categories,
    });

    return res.status(201).json({
        // "message": "Successful",
        "message": "A new user is created successfully",
        "success": true,
    });
}

module.exports = {
    signUp,
};