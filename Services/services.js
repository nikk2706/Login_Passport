const User = require('../models/user-model');

const checkuserexist = async (username) => {
    const userexist = await User.findOne({ username });
    return userexist;
}

const register_service = async (userdata) => {
    const user = new User(userdata)
    if (userdata.hashPassword) {
        user.password = userdata.hashPassword;
    }
    await user.save();
}
const getAllUser = async()=>{
    return await User.find();
}

const getUserprofile = async(id)=>{
    return await User.findById(id);
}

module.exports = { checkuserexist, register_service, getAllUser, getUserprofile }