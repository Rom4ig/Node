const app = require('express')();
const hbs = require('express-handlebars').create({extname: '.hbs'});
const contacts = require('./data/contacts');

app.set('port', 3000);
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.use(require('express').static(__dirname + '/views'));

app.get('/', (req, res) => {
    res.render('index', {layout: null, names: contacts});
});
app.listen(app.get('port'), () => console.log(`Start server, port: ${app.get('port')}`));