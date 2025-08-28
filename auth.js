const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

app.post('login',(req,res) =>{
    let{username,password} = req.body;
    if(username == "admin" && password == "admin@123"){
        let token = jwt.sign({username},"SECRETKEY",{
            expires:'1h'
        });
        res.send(token);
    }
    
});
  
app.post('/verifylogin',(req,res) =>{
    let token = req.body.token;
    if(!token)return res.send("No  token provided");
    jwt.verify(token, "SECURETKEY",(err,decoded) => {
        if(err) return res.send("invalid token");
        console.log(decoded);
        res.sendStatus(200);
    });
});
app.listen(5000);