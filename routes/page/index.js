exports.info = {
    method: 'get',
    url: '/'
}

exports.run = (req, res, next) => {
    res.render('index');
}