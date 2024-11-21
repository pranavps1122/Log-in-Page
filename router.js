var express = require('express');
const session = require('express-session');
var router = express.Router();

const credential = {
    email: "user@gmail.com",
    password: "user123"
};


router.get('/',(req,res) => {
    if(req.session.user){
        res.redirect('/route/dashboard');
    }else{
        res.render('base',{title:"Express" ,alert:"Invalid username or Password"})
    }
})


    router.post('/login',(req,res)=>{
        if(req.body.email==credential.email&&req.body.password==credential.password){


            req.session.user=req.body.email;
            res.redirect('/route/dashboard');
        }else{
            
            res.render('base',{title:"Express" ,alert:"Invalid username or Password"})
        }
    })

   router.get('/dashboard',(req,res)=>{
  
    
   
    if(req.session.user){
        res.render("dashboard",{user:req.session.user})
    }else{
        res.redirect('/')
    }
})
router.get('/logout', (req, res) => {  
    req.session.destroy(function (err){
        if (err) {
            console.log(err);
             res.send('Error logging out');
             

        }else{
       


        res.redirect("/")
      
        }

       
    });
});
module.exports = router;
