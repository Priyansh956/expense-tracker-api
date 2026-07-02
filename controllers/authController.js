const bcrypt = require('bcrypt');

const {User} = require('../models/userModel'); 
const {setUser} = require('../services/jwtService');

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

    const email = body.email;
    const existingUser = await User.findOne({email});

    if(existingUser){
        return res.status(409).json({
            "message": "An account already exists with this email id",
            "success": false,
        })
    }

    //Password hashing
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(req.body.password, salt);
    try{
        await User.create({
            email: req.body.email,
            password: encryptedPassword,
            categories: req.body.categories,
        });
    
        return res.status(201).json({
            "message": "Successful",
            // "message": securePassword,
            "success": true,
        });
    }
    catch(err){
        if (err.code === 11000) {
        return res.status(409).json({
            "success": false,
            "message": "Email already exists",
        });
        }

        res.status(500).json({
            "success": false,
            "message": "Server error",
        });
    }
}

async function userLogin(req, res){
    const {email} = req.body;
    

    const user = await User.findOne({email});
    if(!user) return res.status(404).json({
        "message": "Invalid email or password",
        "success": false
    });

    const comparison = await bcrypt.compare(
        req.body.password,
        user.password
    );
    
    if(!comparison)return res.status(401).json({
        "message": "Invalid email or password",
        "success": false,
    });

    const token = setUser(user);

    return res.status(200).json({
        "message": "User found",
        "success": true,
        token,
    });
}

module.exports = {
    signUp,
    userLogin,
};