const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {

    try {
        const {name, email, password } = req.body;
        
        if(!name || !email || !password ) {
            return res.status(400).json({message:"All fields are required"});
        }

        const existingUser = await User.findOne({email});
        console.log(existingUser)
        if(existingUser) {
            return res.status(400).json({message:"User Already existns in dB"})
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            name,
            email,
            password : hashedPassword,
        });

        return res.status(201).json({message: "User created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.emal
            },
        });

        
    } catch(err) {
        console.error(`Register error ${err}`);
        res.status(500).json({ message : "Server error"});

    }
}

exports.login = async (req,res) => {

    try {
        const {  email, password } = req.body;

        if(!email || !password ) {
            return res.status(400).json({message : "Email and Password are required"})
        }

        const user = await User.findOne({email});
        if(!user) {
            return res.status(401).json({message: "User not found "});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
                return res.status(401).json({message: "Invalid Crendentials "});
        }

        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );

        res.json({
            message:"Login Successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            
        });

    }catch(err) {
        console.log(`Server error ${err}`);
        res.status(500).json({message: "Server erro"})
    }
}