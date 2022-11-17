const flash = require('connect-flash');

module.exports = (req,res) => {
    if(req.session.userId){
    res.render('CreatePost',{
        createPost: true,
        errors: flash('nodataerr')
    });
    }else{
        res.redirect('/auth/login');
    }    
}