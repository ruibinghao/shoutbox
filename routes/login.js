const User = require('../models/users');

exports.form = (req, res) => { 
    res.render('login', { title: 'Login' });
};

exports.submit = (req, res, next) => {
    const data = req.body.user;
    console.log("debug: login as: "+data.name+" with password: "+data.pass); 
    User.authenticate(data.name, data.pass, (err, user) => {
        if (err) return next(err);
        if (user) {
            req.session.uid = user.id;
            res.redirect('/'); 
        } else {
            res.error('Sorry! invalid credentials. ');
            res.redirect('back'); 
        }
    });
};

exports.logout = (req, res) => { 
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect('/'); 
    })
};