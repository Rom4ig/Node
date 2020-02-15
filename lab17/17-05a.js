const redis = require('redis');
const logger = require('./logger').logger;
const sub_client = redis.createClient('//redis-14589.c3.eu-west-1-1.ec2.cloud.redislabs.com:14589', {password: 'I6QP29lds59zxIulPKBLa8DH6HYBCwJ6'});
sub_client.on('subscribe', (channel, count) => logger.debug('subscribe:' + 'channel = ' + channel + ' count = ' + count));
sub_client.on('message', (channel, message) => logger.debug('subscribe:' + 'channel = ' + channel + ' : ' + message));
sub_client.subscribe('channel-01');

setTimeout(() => {
    sub_client.unsubscribe();
    sub_client.quit()
}, 60000);