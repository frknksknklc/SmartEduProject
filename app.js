const express = require('express');
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash');
const methodOverride = require('method-override')
const MongoStore = require('connect-mongo');
const pageRoute = require('./routes/pageRoute')
const courseRoute = require('./routes/courseRoute')
const categoryRoute = require('./routes/categoryRoute')
const userRoute = require('./routes/userRoute')

const app = express();
//Connect DB
mongoose.connect('mongodb://localhost:27017/smartedu-db', 
    {useNewUrlParser: true,
        
    });

// mongoose.connect('mongo://localhost:smartedu-db', {
//     useNewUrlParser : true,
//     useUnifiedTopology: true,
//     useFindAndModify: true,
//     useCreateIndex: true
// }).then(()=>{
//     console.log('DB connected succesfuly')
// })

//Template Engine
app.set("view engine", "ejs");

//Global variable
global.userIN = null


//Middlewares
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/smartedu-db' })
  }))
app.use(flash());
app.use((req, res, next)=> {
    res.locals.flashMessages = req.flash();
    next();
  })
app.use(methodOverride('_method',{
  methods:['POST', 'GET']
}))

//Routes
app.use('*',(req,res,next) =>{
    userIN = req.session.userID;
    next();
})
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

const port = 3000;
app.listen(port,()=>{
    console.log(`App started on port ${port}`)
});

