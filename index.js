const express = require('express')
const app = express()   
const dotenv = require('dotenv')
const hbs = require('express-hbs');
const path = require('path')
dotenv.config()


app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/partials',
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',require('./routes/textWriter'))
app.use(express.static(path.join(__dirname,'public')))
const PORT = process.env.PORT || 3000

app.listen(PORT, () =>{
    console.log(`Server has been started on ${PORT}`);
})

