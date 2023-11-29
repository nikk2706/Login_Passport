const bcrypt = require('bcrypt');

const hashPasswordMiddleware = async(req, res, next)=>{
    const { password } = req.body;

    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        req.body.hashPassword  = hashedPassword;
        next();
    }catch(error){
        res.status(500).send("Password hashing failed...");
    }
}
module.exports =  hashPasswordMiddleware  ;
