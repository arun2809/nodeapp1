const express = require('express')
const app = new express();
const path = require('path')
const bodyparser = require('body-parser');
const mongoose = require('mongoose')
const route_file = require('./routes/router')
const passwordbcrypt = require('./routes/passwordencrypt')
const jwtencryption = require('./routes/jwtlib')





app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });





  
//database connectivity
const usermodel = require('./routes/usermodel')
mongoose.connect("mongodb://localhost:27017/tasktracking",{useNewUrlParser:true})
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

const dashboardmodel = require('./routes/dashboardmodel')




//username for dashboard
app.use('/username',route_file)


        
//registration of user
app.post("/signup",(req,res)=>{
    if(req.body.email)
    {
        if(req.body.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
        {
            usermodel.findOne({email:req.body.email},(err,result)=>{
                if(err)
                {
                   
                    res.json(err)
                    console.log(err)
                }
                else if(result)
                {
                     res.status(409).send("already exist"); 
                }
                else{
                    new usermodel({
        name:req.body.name,
        
        email:req.body.email,
        contact:req.body.contact,
        
        password:passwordbcrypt.hashpassword(req.body.password)
    }).save((err,result)=>{
        if(err)
        {
            res.json(err)
        }
        else{
            
            res.json({name:result.name,
                email:result.email,contact:result.contact})
            
        }
    })                
                }
                
            })
        }
        else{
            res.status(411).send("email format wrong");
            res.json("email format is wrong")
            res.end("email format is wrong")
         
            
        }
         }
    else{
        res.json("enter email")
    }
})

//login function of user
app.post('/login',(req,res)=>{
    if(req.body.email)
    {
        usermodel.findOne({email:req.body.email},(err,result)=>{
            if(err)

            {
                
                res.json(err)

            }
            else if(!result)
            {
                res.status(404).send("email not found")
                res.end();
              
            }
            else if(result)

            {
                
               if(passwordbcrypt.comparepassword(req.body.password,result.password))
               {
                   
               let token =  jwtencryption.jwtsign({email:result.email},(err,tokendetails)=>{
                   if(err) throw err
                   else {

                      res.json(tokendetails)
                       return tokendetails;
                    };
    
               })
             
               res.json(token)
            
                
               }
               else{
                   res.status(409).send("password not matched")
                     
                   
               }
            }
            
            
        })

    }
    else{

       
        res.end("enter email")
    }
    })


    var today = new Date();
   app.post('/dashboard',(req,res)=>{
       new dashboardmodel({
           Title:req.body.title,
           Status:req.body.status,
           Date:today,
           Reporter:req.body.reporter

       }).save((err,result)=>{
          if(err)
          {
              res.json(err)
          }
          else
          {
              res.json(result)
          }
       })
   }) 



   app.get('/dashboarddata',(req,res)=>{
       dashboardmodel.find().select('-__v -_id').lean()
       .exec(function(err,result){
       if(err)
       {
           res.json(err)
       }
       if(result)
       {
       
        res.json(result)
       }
       else{
          
       }
       })
   })

   

app.post('/delete',(req,res)=>{
    dashboardmodel.findOne({"Title":req.body.Title},(err,result)=>{
        if(err)
        {
            res.json(err)
        }
        else if(!result)
        {
            res.status(404)
            res.json("not found")
        }
        else 
        {
            
           result.remove();
        }
    })
})


  
  
       
  app.listen(4400,()=>{
      console.log("running on 4400")
  })