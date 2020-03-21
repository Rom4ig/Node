const app = require('express')();
const myrouter = new (require('./MVC').MVCRouter)('/:controller/:action', '/api/:controller/:action/:p', '/loc/lex/:controller/:m/:action');
const handlers = require('./handlers');
const mycontrollers = new (require('./MVC')).MVCControllers({
    home: {
        index: handlers.home_index,
        account: handlers.home_account
    },
    calc: {
        salary: handlers.calc_salary,
        trans: handlers.calc_trans
    }
});
const mvc = new (require('./MVC')).MVC(myrouter, mycontrollers);
app.get(mvc.router.uri_templates, mvc.use);
app.post(mvc.router.uri_templates, mvc.use);

app.listen(3000);