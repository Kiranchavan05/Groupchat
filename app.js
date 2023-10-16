const express=require('express');
const bodyParse=require('body-parser')
const app=express();
const fs=require("fs")

app.use(bodyParse.urlencoded({extended: false}))

app.get('/login' , (req,res) => {
     res.send(`<form onsubmit = "localStorage.setItem('username', document.getElementById('username').value)" action = "/" method = "GET"><span> Username: </span> <input id = "username" type = "text"> <button type = "submit"> Login </button></form>`)
})

app.get("/", (req,res) => {
    fs.readFile("username.txt",(err,data) => {
        if(err){
            data="NO Chat Exists"
        }
        res.send(
        `${data}
      <form action="/" onsubmit="document.getElementById('username').value=localStorage.getItem('username')" mathod="POST">
     <input type='text' id='message' name='message' name='message'>
     <input type='hidden' name='username' id='username'>
     <button type="submit">Send</button>
     </form>`)
    })

})

app.post("/",(req,res)=> {
    console.log(`${req.body.username} : ${req.body.message}`);
    fs.writeFileSync("username.txt", `${req.body.username} : ${req.body.message}`,
    {flag: 'a'})

    res.redirect("/")

})

app.listen(2000);

