const express=require('express')
const app=express();
var cookieParser = require("cookie-parser");
var session = require("express-session");


app.use(cookieParser());
app.use(
 session({
  key:"user_sid",
  secret:"somerandomstuffs",
  resave: false,
  saveUninitialized: false,
  cookie:{
    expires:6000,
  },
 })
)



app.set('view engine','ejs')
app.use(express.static("views"))

const path =require('path');
app.use(express.static(path.join(__dirname,'/upload')))


const router= require('./controller/controll')
const bodyParser=require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const mongoose=require('./db/config')





app.use('/',router);
app.listen(8080);
