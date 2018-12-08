const bcrypt = require('bcrypt')
const saltRounds = 10;
let normalpassword ;

let hashpassword = (normalpassword)=>{
    let salt =  bcrypt.genSalt(saltRounds)
    let salt1 = parseInt(salt)
    let hashkey = bcrypt.hashSync(normalpassword,salt1)
    return hashkey;
}

let comparepassword = (oldpassword,hashpassword)=>{
    return bcrypt.compareSync(oldpassword,hashpassword)
       
    

    
}


module.exports={
    hashpassword:hashpassword,
    comparepassword:comparepassword
}