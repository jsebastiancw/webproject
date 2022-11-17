const User = require('../models/Users');
const Path = require('path')

module.exports = (req,res) => {
    User.create(req.body,(error,user)=>{
        if (error){
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
            console.log("This is" + validationErrors);
            req.flash('data', req.body);
            req.flash('validationErrors',validationErrors);
            return res.redirect('/auth/register/');
        };
        res.redirect('/');
    });
};

/*
            const errors = error.errors
            const usernameerror = errors.username.message;
            const passerror = errors.password.message;
            req.session.validationErrors = {
                usernameerror, passerror
            }
*/