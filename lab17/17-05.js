const redis = require('redis');
const {getRandomText} = require('./util');
const logger = require('./logger').logger;
const pub_client = redis.createClient('//redis-14589.c3.eu-west-1-1.ec2.cloud.redislabs.com:14589', {password: 'I6QP29lds59zxIulPKBLa8DH6HYBCwJ6'});
pub_client.publish('channel-01', 'from pub_client message 1');
pub_client.publish('channel-01', 'from pub_client message 2');
setTimeout(() => pub_client.publish('channel-01', ' from pub_client message 3'), 10000);
setTimeout(() => pub_client.publish('channel-01', ' from pub_client message 4'), 20000);
setTimeout(() => pub_client.publish('channel-01', ' from pub_client message 5'), 30000);
setTimeout(() => pub_client.publish('channel-01', ' from pub_client message 6'), 40000);

setTimeout(() => pub_client.quit(), 60000);