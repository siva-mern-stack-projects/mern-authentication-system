const User = require("../models/User");


const getProfile = async (req, res ) => {

    try {
        const userId = req.user.userId;
        const user = await User.findById(userId).select('-password');
        if(!user) {
            return res.status(401).json({message:"User Not found"});

        }
        return res.json(user);  
   } catch(err) {
        res.status(500).json({ message: "Server error" });
    }

}

module.exports = getProfile;
