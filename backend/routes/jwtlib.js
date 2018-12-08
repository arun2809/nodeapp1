const jwt = require('jsonwebtoken')
const secretkey = "somerandomtesxt345#$%^@$#"

let jwtsign = (data,cb)=>
{
    try{
        let token = jwt.sign(data,secretkey)
        cb(null,token)
    }
    catch
    {
        cb(null,err)
    }

}

let jwtverify = (token,secretkey,cb)=>{
    jwt.verify(token,secretkey,(err,result)=>{
        if(err)
        {
            console.log("either token or data is wrong")
            cb(err,null)
        }
        else{
           cb(null,result)
           
        }
    })
}

module.exports={
    jwtsign:jwtsign,
    jwtverify:jwtverify
}