const express = require('express');
const path = require('path');
const bodyParser=require('body-parser');
const app = express();

app.set('view engine','ejs');
app.set('views','views');

const PORT = Number( process.env.PORT || 3100) ;


app.set('view engine','ejs');
app.set('views','views');

app
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','*');
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, PUT');
        return res.status(200).json({})
    }
    next();
});


const homeRoutes=require('./routes/index');
const submitRoutes=require('./routes/submit');
app.use(homeRoutes)
app.use(submitRoutes)


app.use((req,res)=>{
   
    res.status(404).send('<h1>Error</h1>');
});


app.listen(PORT, console.log(`listening in port ${process.env.NODE_ENV} mode on port${PORT}`));