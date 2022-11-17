const bcrypt = require('bcrypt')
const User = require('../models/Users')

module.exports = (req, res) =>{
const { username, password } = req.body;
User.findOne({username:username}, (error,user) => {
if (user){
bcrypt.compare(password, user.password, (error, same) =>{
if(same){ // if passwords match
// store user session, will talk about it later
req.session.userId = user._id;
res.redirect('/');
}
else{
const logerr = "Username or Password is incorrect";
req.flash('logerr',logerr);
req.flash('logdata',req.body);
res.redirect('/auth/login');
}

})
}
else{
const logerr = "Username or Password is incorrect";
req.flash('logerr',logerr);
req.flash('logdata',req.body);
res.redirect('/auth/login');
}
})
}