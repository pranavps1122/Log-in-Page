const express =require('express');
const path=require('path')
const session=require('express-session')
const nocache = require('nocache')

const app=express();

const PORT = 3003

app.set('view engine','ejs')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(nocache());


app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/images',express.static(path.join(__dirname,'public/images')))

app.use(session({
    secret:'123456',
    resave:false,
    saveUninitialized:true
}))

const credential = {
    email: "user@gmail.com",
    password: "user123"
};

app.post('/login',(req,res)=>{
    if(req.body.email==credential.email&&req.body.password==credential.password){
        req.session.user=req.body.email;
        res.redirect('/dashboard');
    }else{
        res.render('login',{title:"Express" ,alert:"Invalid username or Password"})
    }
})

app.get('/',(req,res) => {
    if(req.session.user){
        res.redirect('/dashboard');
    }else{
        res.render('login')
    }
})




app.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render("dashboard",{user:req.session.user})
    }else{
        res.redirect('/')
    }
})


//Home Route..
app.get('/',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user})
    }else{
        res.render('login',{title:"Login System"})
    } 
})

app.get('/logout', (req, res) => {  
    req.session.destroy();
        res.redirect("/")
    });


app.listen(PORT,()=>{
    console.log(`Server Is Runs On http://localhost:${PORT}`)
})