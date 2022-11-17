const flash = require('connect-flash');
module.exports = (req,res)=>{
    console.log(req.session.validationErrors);

    const data = flash('data')[0];
    console.log("data" + data);
    var username = "";
    var password = "";

    if(typeof data != "undefined"){
        username = data.username;
        password = data.password;
    }


    res.render('register',{ 
        errors : flash('validationErrors'),
        username: username,
        password: password
});


};