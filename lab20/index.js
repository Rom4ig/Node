const app = require('express')();
const hbs = require('express-handlebars').create({
    extname: '.hbs', helpers: {
        cancel: () => {
            return '<a href="/">Отказаться</a>'
        }
    }
});
const contacts = require('./data/contacts');
const bodyParser = require("body-parser");
const fs = require('fs');
const url = require("url");
const qs = require("querystring");
const Chance = require('chance');
const chance = new Chance();

app.engine('.hbs', hbs.engine);

app.set('view engine', '.hbs');
app.set('port', 3000);

app.use(require('express').static('views'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index', {layout: null, disabled: false, names: contacts});
});

app.get('/add', (req, res) => {
    res.render('index', {layout: null, disabled: true, names: contacts, add: true});
});

app.post('/add', (req, res) => {
    if (!req.body.name || !req.body.phone) return res.sendStatus(400);
    let newPerson = [{id: `${chance.integer({min: 0, max: 1024})}`, name: req.body.name, phone: req.body.phone,}];
    let newData = newPerson.concat(contacts);
    fs.writeFileSync('data/contacts.json', JSON.stringify(newData));
    res.end('success');
});

app.get('/update', (req, res) => {
    console.log('UPDATE GET');
    let query = url.parse(req.url).query,
        params = qs.parse(query);
    if (!params.id) {
        console.log();
        return;
    }
    let data = contacts;
    let updated;
    console.log(data.length);
    for (let i = 0; i < data.length; i++)
        if (data[i].id === params.id)
            updated = data[i];
    console.log(updated);
    console.log(data);
    res.render('index', {
        layout: null,
        disabled: true,
        names: contacts,
        update: true,
        inputName: updated.name,
        inputPhone: updated.phone
    });
});

app.post('/delete', (req, res) => {
    console.log('DELETE');
    let index;
    if (!req.body.name || !req.body.phone) return res.sendStatus(400);
    let delPerson = {id: req.body.id, name: req.body.name, phone: req.body.phone};
    console.log(delPerson);
    console.log(contacts);
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].id === delPerson.id)
            index = i;
    }
    console.log(index);
    contacts.splice(index, 1);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    res.end('success');
});

app.post('/update', (req, res) => {
    console.log('POST UPDATE');
    if (!req.body.name || !req.body.phone) return res.sendStatus(400);
    let newPerson = {id: req.body.id, name: req.body.name, phone: req.body.phone,};
    for (let i = 0; i < contacts.length; i++)
        if (contacts[i].id === newPerson.id)
            contacts[i] = newPerson;
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    res.end('success');
});

app.listen(app.get('port'), () => console.log(`Start server, port: ${app.get('port')}`));