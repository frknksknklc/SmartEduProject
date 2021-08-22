const express = require('express');
// express fonksiyonunu çalıştırıyoruz
const app = express();
const pageRoute = require('./routes/pageRoute')

//Template Engine
app.set("view engine", "ejs");

//Middlewares
app.use(express.static("public"));

//Routes
app.use('/', pageRoute);


const port = 3000;
app.listen(port,()=>{
    console.log(`App started on port ${port}`)
});

