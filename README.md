# jwtAuth
## JSON web token implementation (jwtAuth)

### To Get the Token send a post request: with userdetail in body

<br/>
<hr/>

## Allowing API access if the token is varified true
```
app.post('/api/post',checkTokenExist,(req,res)=>{
    jwt.verify(req.token,process.env.secrateKey,(err,auth)=>{
        if(err){
            res.status(403).send("Forbidden inValid token");
        }else{
            
            res.status(200).json({message:"Post created",auth});

        }

    })
  
});

```
<br/>
<hr/>

### Generating a JWT token for perticular user login session

```
app.post("/api/login",(req,res)=>{
    //Test User 
    // let user={
    //     "username":"saif",
    //     "id":1,
    //     "email":"u4saif@gmail.com"
    // }
    console.log(req.body);
    jwt.sign(req.body,process.env.secrateKey,{expiresIn: '120sec'},(err,token)=>{
        res.json({
            token:token
        });
    });
});
```

##### 
````
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
````