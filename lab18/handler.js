const Faculty = require('./models/Faculty');
const Subject = require('./models/Subject');
const Pulpit = require('./models/Pulpit');
const Teacher = require('./models/Teacher');
const url = require('url');

module.exports = (req, res) => {
    if (req.method === 'GET') {
        switch (req.url) {
            case '/api/faculties': {
                Faculty.findAll({raw: true}).then(faculties => {
                    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                    console.log(typeof (faculties));
                    res.end(JSON.stringify(faculties));
                }).catch(err => console.log(err));
            }
                break;
            case '/api/pulpits': {
                Pulpit.findAll({raw: true}).then(pulpits => {
                    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                    console.log(typeof (pulpits));
                    res.end(JSON.stringify(pulpits));
                }).catch(err => console.log(err));
            }
                break;
            case '/api/subjects': {
                Subject.findAll({raw: true}).then(subjects => {
                    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                    console.log(typeof (subjects));
                    res.end(JSON.stringify(subjects));
                }).catch(err => console.log(err));
            }
                break;
            case '/api/teachers': {
                Teacher.findAll({raw: true}).then(teachers => {
                    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                    console.log(typeof (teachers));
                    res.end(JSON.stringify(teachers));
                }).catch(err => console.log(err));
            }
                break;
            default:
                res.writeHead(404);
                res.end('Not found');
        }
    } else if (req.method === 'POST') {
        switch (req.url) {
            case '/api/faculties': {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                req.on('end', async () => {
                    let faculty = JSON.parse(body);
                    Faculty.create(faculty).then(faculty => {
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(`{"Faculty":"${faculty.Faculty}","Faculty_name":"${faculty.Faculty_name}"}`);
                    });
                })
            }
                break;
            case '/api/pulpits': {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                req.on('end', async () => {
                    let pulpit = JSON.parse(body);
                    Pulpit.create(pulpit).then(pulpit => {
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(`{"Pulpit":"${pulpit.Pulpit}","Pulpit_name":"${pulpit.Pulpit_name}", "Faculty" : "${pulpit.Faculty}"}`);
                    });
                })
            }
                break;
            case '/api/subjects': {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                req.on('end', async () => {
                    let subject = JSON.parse(body);
                    Subject.create(subject).then(subject => {
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(`{"Subject":"${subject.Subject}","Subject_name":"${subject.Subject_name}", "Pulpit":"${subject.Pulpit}"}`);
                    });
                })
            }
                break;
            case '/api/teachers': {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                req.on('end', async () => {
                    let teacher = JSON.parse(body);
                    Teacher.create(teacher).then(teacher => {
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(`{"Teacher":"${teacher.Teacher}","Teacher_name":"${teacher.Teacher_name}", "Pulpit":"${teacher.Pulpit}"}`);
                    });
                })
            }
                break;
            default:
                res.writeHead(404);
                res.end('Not found');
        }
    } else if (req.method === 'DELETE') {
        if (url.parse(req.url).pathname.search('\/api\/faculties\/[A-z]+') !== (-1)) {
            let p = url.parse(req.url, true);
            let r = decodeURI(p.pathname).split('/');
            let faculty = r[3];
            Faculty.destroy({
                where: {
                    Faculty: faculty
                }
            }).then(() => {
                res.end("Done");
            });
        } else if (url.parse(req.url).pathname.search('\/api\/pulpits\/[A-z]+') !== (-1)) {
            let p = url.parse(req.url, true);
            let r = decodeURI(p.pathname).split('/');
            let pulpit = r[3];
            Pulpit.destroy({
                where: {
                    Pulpit: pulpit
                }
            }).then(() => {
                res.end("Done");
            });

        } else if (url.parse(req.url).pathname.search('\/api\/subjects\/[A-z]+') !== (-1)) {
            let p = url.parse(req.url, true);
            let r = decodeURI(p.pathname).split('/');
            let subject = r[3];
            Subject.destroy({
                where: {
                    Subject: subject
                }
            }).then(() => {
                res.end("Done");
            });
        }
    } else if (req.method === 'PUT') {
        switch (req.url) {
            case '/api/faculties': {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                req.on('end', async () => {
                    let faculty = JSON.parse(body);
                    Faculty.update(faculty, {where: {Faculty: faculty.Faculty}}).then(() => {
                        res.end(`done`);
                    });
                })
            }
                break;
            case '/api/pulpits': {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                req.on('end', async () => {
                    let pulpit = JSON.parse(body);
                    Pulpit.update(pulpit, {where: {Pulpit: pulpit.Pulpit}}).then(() => {
                        res.end(`done`);
                    });
                })
            }
                break;
            case '/api/subjects': {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                req.on('end', async () => {
                    let subject = JSON.parse(body);
                    Subject.update(subject, {where: {Subject: subject.Subject}}).then(() => {
                        res.end(`done`);
                    });
                })
            }
                break;
            case '/api/teachers': {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                req.on('end', async () => {
                    let teacher = JSON.parse(body);
                    Teacher.update(teacher, {where: {Teacher: teacher.Teacher}}).then(() => {
                        res.end(`done`);
                    });
                })
            }
                break;
            default:
                res.writeHead(404);
                res.end('Not found');
        }
    }

};