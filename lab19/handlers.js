exports.home_index = (req, res) => {
    console.log('home/index');
    res.end('home/index');
};
exports.home_account = (req, res) => {
    console.log('home/account');
    res.end('home/account');
};
exports.calc_salary = (req, res) => {
    console.log('calc/salary');
    res.end('calc/salary');
};
exports.calc_trans = (req, res) => {
    console.log('calc/trans');
    res.end('calc/trans');
};
