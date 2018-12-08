const express = require('express');
const router = express.Router();
const usermodel = require('../routes/usermodel')
const jwtencrypt = require('../routes/jwtlib')
const secretkey = "somerandomtesxt345#$%^@$#"


router.get('/',verifytoken,(req,res)=>{
    usermodel.findOne({email:tokendata},(err,result)=>{
        if(err)
        {
            
            res.json(err)
           
        }
        if(!result)
        {
            let name = "user"
            return name
        }
        else{
            res.json(result.name)
            return result.name;
        }
    })
   
})


let tokendata;
function verifytoken(req,res,next)
{
     
let token = req.query.token||req.body.token||req.params.token || req.headers.token
jwtencrypt.jwtverify(token,secretkey,(err,userdetail)=>{
if(err)
{
    res.json(err)
}

else{
   tokendata = userdetail.email;
 
  
}

})
next();

}

   
    

  





module.exports = router;
