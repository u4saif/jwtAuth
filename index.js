const express=require('express');
const jwt=require("jsonwebtoken");
const port=process.env.PORT || 3000;
const app=express();


app.get('/api',(req,res)=>{
    res.status(200).send("project running...");
});

app.post('/api/post',checkTokenExist,(req,res)=>{
    jwt.verify(req.token,"secrateKey",(err,auth)=>{
        if(err){
            res.status(403).send("Forbidden inValid token");
        }else{
            
            res.status(200).json({message:"Post created",auth});

        }

    })
  
});

app.post("/api/login",(req,res)=>{
    //Test User 
    let user={
        "username":"saif",
        "id":1,
        "email":"u4saif@gmail.com"
    }
    jwt.sign({user:user},'secrateKey',{expiresIn: '12sec'},(err,token)=>{
        res.json({
            token:token
        });
    });
});

function checkTokenExist(req,res,next){
    const bearHeader=req.headers["authorization"]
    if(typeof bearHeader !='undefined'){
        const bearer=bearHeader.split(" ");
        const bearerToken=bearer[1];
        req.token=bearerToken;
        next();
    }else{
        res.status(403).send("Forbidden");
    }
}
app.listen(port,()=>{
    console.log("Started at post: ", port);
});