const redis = require('redis');
const {getRandomText} = require('./util');
const logger = require('./logger').logger;
const client = redis.createClient('//redis-14589.c3.eu-west-1-1.ec2.cloud.redislabs.com:14589', {password: 'I6QP29lds59zxIulPKBLa8DH6HYBCwJ6'});
client.on('ready', () => logger.info("ready"));
client.on('error', (err) => logger.error('error' + err));
client.on('connect', () => logger.info('connected'));
client.on('end', () => logger.info('end'));
let key = getRandomText(5);

const count = 10000;
let start;
start = new Date();
for (let i = 1; i <= count; i++) {
    client.set(key + i, i);
}
logger.info(`Time set: ${new Date() - start}ms`);
logger.debug('After set');
start = new Date();
for (let i = 1; i <= count; i++) {
    client.get(key + i, (err, result) => {
        if (err) logger.error(err);
        logger.trace(`${key + i} = ${result}`);
    });
}
logger.info(`Time get: ${new Date() - start}ms`);

start = new Date();
for (let i = 1; i <= count; i++) {
    client.incr(key + i);
}
logger.info(`Time incr: ${new Date() - start}ms`);
logger.debug('After incr');

for (let i = 1; i <= count; i++) {
    client.get(key + i, (err, result) => {
        if (err) logger.error(err);
        logger.trace(`${key + i} = ${result}`);
    });
}

start = new Date();
for (let i = 1; i <= count; i++) {
    client.decr(key + i);
}
logger.info(`Time decr: ${new Date() - start}ms`);
logger.debug('After decr');

for (let i = 1; i <= count; i++) {
    client.get(key + i, (err, result) => {
        if (err) logger.error(err);
        logger.trace(`${key + i} = ${result}`);
    });
}

start = new Date();
for (let i = 1; i <= count; i++) {
    client.del(key + i);
}
logger.info(`Time del: ${new Date() - start}ms`);


key = getRandomText(5);

start = new Date();
for (let i = 1; i <= count; i++) {
    client.hset(key + i, key, `{id:${i}, val:"val-${i}"}`);
}
logger.info(`Time hset: ${new Date() - start}ms`);
logger.debug('After hset');
start = new Date();
for (let i = 1; i <= count; i++) {
    client.hget(key + i, key, (err, result) => {
        if (err) logger.error(err);
        logger.trace(`${key + i} = ${result}`);
    });
}
logger.info(`Time hget: ${new Date() - start}ms`);
client.quit();