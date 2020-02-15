module.exports = {
    getRandomText: function (length) {
        let rnd = '';
        while (rnd.length < length)
            rnd += Math.random().toString(36).substring(2);
        console.log('Generated ' + rnd.substring(0, length));
        return rnd.substring(0, length);
    }
};