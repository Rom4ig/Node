const app = require('express')();
const passport = require('passport');
const DigestStrategy= require('passport-http').DigestStrategy;
const users=require('./user.json');
const session=require('express-session')(
    {
        resave:false,
        saveUninitialized:false,
        secret:'12345678'
    }
);
function VerifyUser(user)
{
    c=null;
    users.forEach(element => {
        if(element.user==user)
        {
            c=element;
        }
    });
    return c;
}
passport.use(new DigestStrategy({gop:'auth'},(user,done)=>
{
    let rc =null;
    let cr=VerifyUser(user);
    console.log(cr);
    if(!cr)
    {
        console.log(cr);
        rc=done(null,false);
    }
    else rc=done(null,cr.user,cr.password);
    return rc;
},(params,done)=>
{
    console.log('parms = ',params);
    done(null,true);
}));
passport.serializeUser((user,done)=>
{
    console.log('serialize',user);
    done(null,user);
});
passport.deserializeUser((user,done)=>
{
    console.log('deserialize',user);
    done(null,user);
});
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.get('/login',(req,res,next)=>
{
    console.log('preAuth');
    if(req.session.logout && req.headers['authorization'])
    {
        req.session.logout=false;
        delete req.headers['authorization'];
    }
    next();
}).get('/login',passport.authenticate('digest',{session:false}),(req,res,next)=>
{
    next()
}).get('/login',(req,res,next)=>
{
    res.send('success login');
});
app.get('/resource',(req,res,next)=>
{
    if(req.headers['authorization'])
    {
    res.send('resource');
    }
    else
    {
        res.redirect('/login');
    }
});
app.get('/logout',(req,res)=>
{
    req.session.logout=true;
    res.redirect('/login');
});
app.use((req,res,next)=>
{
    res.statusCode="404";
	res.end('Method not define');
});
app.listen(3000,()=>
{
    console.log('Start server, port:3000');
});