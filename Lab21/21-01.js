const app = require('express')();
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const users = require('./user.json');
const session = require('express-session')(
    {
        resave: false,
        saveUninitialized: false,
        secret: '12345678'
    }
);

function VerifyUser(user) {
    let c = false;
    users.forEach(element => {
        console.log(element.user);
        console.log(user);
        if (element.user === user) {
            c = true;
        }
    });
    return c;
}

function VerifyPassword(pass) {
    let c = false;
    users.forEach(element => {
        console.log(element.password);
        console.log(pass);
        console.log(element.password === pass);
        if (element.password === pass) {
            c = true;
        }
    });
    return c;
}

passport.use(new BasicStrategy((user, password, done) => {
    console.log('passport.use ', user, password);
    let rc = null;
    let cr = VerifyUser(user);
    console.log(VerifyUser(user));
    if (!cr) {
        console.log(cr);
        rc = done(null, false, {message: 'incorrect username'});
    } else if (!VerifyPassword(password)) {
        console.log(2);
        rc = done(null, false, {message: 'incorrect password'})
    } else rc = done(null, user);
    return rc;
}));
passport.serializeUser((user, done) => {
    console.log('serialize', user);
    done(null, user);
});
passport.deserializeUser((user, done) => {
    console.log('deserialize', user);
    done(null, user);
});
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.get('/login', (req, res, next) => {
    console.log('preAuth');
    if (req.session.logout && req.headers['authorization']) {
        req.session.logout = false;
        delete req.headers['authorization'];
    }
    next();
}, passport.authenticate('basic'), (req, res, next) => {
    next()
}).get('/login', (req, res, next) => {
        res.send('success login');  
});
app.get('/resource', (req, res, next) => {
    if (req.headers['authorization']) {
        res.send('resource');
    } else {
        res.redirect('/login');
    }
});
app.get('/logout', (req, res) => {
    req.session.logout = true;
    res.redirect('/login');
});
app.use((req, res, next) => {
    res.statusCode = "404";
    res.end('Method not define');
});
app.listen(3000, () => {
    console.log('Start server, port:3000');
});
