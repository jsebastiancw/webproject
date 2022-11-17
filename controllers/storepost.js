const BlogPost = require('../models/BlogPost.js')
const path = require('path')

module.exports = (req,res) =>{
    let image = req.files.image;
    image.mv(path.resolve(__dirname,'..','public/img', image.name),async (error)=>{
        await BlogPost.create({title: req.body.title,
        body: req.body.body,
        image: '/img/' +  image.name,
        userid: req.session.userId
    },(error) =>{
        if(error){
            console.log(error);
            const nodataerr = Object.keys(error.errors).map(key => error.errors[key].message);
            req.flash('nodataerr',nodataerr);
            res.redirect('/CreatePost')
        }
    });
    res.redirect('/');
    });
};
