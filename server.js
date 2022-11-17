const express = require('express');               //seeting up express js and ejs(rendering)
const app = new express();
const ejs = require('ejs');

const mongoose = require('mongoose');             // setting up mongoose to use mongodb
const url = 'mongodb+srv://jsebas:08102004@cluster0.lsldofq.mongodb.net/school';


const fileUpload  = require('express-fileupload');  // setting up fileupload to be able to use images
app.use(fileUpload());


const bodyParser = require('body-parser');       //setting up the body-parser to handle user input
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


const expressSession = require('express-session'); //setting up expres session to be able to keep user logged in
app.use(expressSession({
  secret:'mma'
}));

const flash = require('connect-flash');
app.use(flash());


;(async () => {                                 //setting up connection for database
    try {
      await mongoose.connect(url, {
        useNewUrlParser: true
      })
      console.log(`MongoDB Connected: ${url}`)
    } catch (err) {
      console.error(err);
    }
  })();

  
const validateMiddleware = require("./middleware/validationMiddleware");  //middleware
app.use('/posts/store', validateMiddleware);
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuth = require('./middleware/redirectIfAuth');


app.set('view engine','ejs');                     // seeting up ejs as view engine and feedinf static elemnts to the server via the public folder
app.use(express.static('public')); 


global.loggedIn = null;
app.use("*",(req,res,next)=>{
  loggedIn = req.session.userId;
  next()
});


const logoutController = require('./controllers/logout');
app.get('/auth/logout',logoutController);

const homeController = require('./controllers/home')  //server side that handles request
app.get('/',(homeController));

app.get('/about',(req,res)=>{
    res.render('about.ejs');
});

app.get('/contact',(req,res)=>{
    res.render('contact.ejs');
});

const getPostController = require('./controllers/getPost');
app.get('/post/:id', (getPostController));

const newPostController = require('./controllers/newPost');  
app.get('/posts/new', authMiddleware, (newPostController));

const storePostController = require('./controllers/storepost');
app.post('/posts/store', (storePostController));

const getNewUserController = require('./controllers/getNewUser'); 
app.get('/auth/register', redirectIfAuth ,getNewUserController);

const storeUserController =  require('./controllers/storeUser'); 
app.post('/users/register',redirectIfAuth, storeUserController);

const loginController = require('./controllers/login'); 
app.get('/auth/login',redirectIfAuth, loginController);

const userLoginController = require('./controllers/loginUsers');
app.post('/users/login',redirectIfAuth, userLoginController);

app.use((req,res)=>{res.render('notfound')});

var port = 3000;

app.listen(port, ()=>{
console.log('App listening...')
})





