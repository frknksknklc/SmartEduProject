const express = require('express');
const mongoose = require('mongoose')
const pageRoute = require('./routes/pageRoute')
const courseRoute = require('./routes/courseRoute')
const categoryRoute = require('./routes/categoryRoute')

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

//Middlewares
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//Routes
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);

const port = 3000;
app.listen(port,()=>{
    console.log(`App started on port ${port}`)
});

