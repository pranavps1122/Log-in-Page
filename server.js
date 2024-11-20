const express =require('express');
const { title } = require('process');
const path=require('path')
const nocache = require('nocache')
const session=require('express-session')
const{v4:uuidv4}=require('uuid')
const router=require('./router');
const bodyParser = require('body-parser');


const app=express();
const Port=process.env.Port||3003;
app.set('view engine','ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(nocache());


app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/images',express.static(path.join(__dirname,'public/images')))
app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}))

app.use('/route',router);



//Home Route..
app.get('/',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user})
    }else{
        res.render('base',{title:"Login System"})
    }
   
})
app.listen(Port,()=>{
    console.log(`Server Is Runs On http://localhost:3003`)
})