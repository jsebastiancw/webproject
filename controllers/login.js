const flash = require('connect-flash');

module.exports = (req,res) => {
    const logdata = flash('logdata');


    var username = "";
    var password = "";

    if(logdata == "undefined"){
        username = logdata.username;
        password = logdata.password;
    }

    res.render('login',{
        errors: flash('logerr'),
        username: username,
        password: password
    });
}