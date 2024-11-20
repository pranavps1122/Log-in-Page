var express = require('express');
var router = express.Router();

const credential = {
    email: "admin@gmail.com",
    password: "admin123"
};


    router.post('/login',(req,res)=>{
        if(req.body.email==credential.email&&req.body.password==credential.password){
            req.session.user=req.body.email;
            res.redirect('/route/dashboard');
        }else{
            res.render('base',{log:"Invalid Email Or PassWord"})
        }
    })

router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render("dashboard",{user:req.session.user})
    }
})
router.get('/logout',(req,res)=>{
    req.session.destroy(function (err){
        if(err){
            console.log(err)
            return res.redirect('/dashboard')
        }
        res.clearCookie('connect.sid');
        res.redirect('/')
    })
})


module.exports = router;
