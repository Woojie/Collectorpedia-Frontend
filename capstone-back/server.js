const express = require('express'),
app = express(),
bodyParser = require('body-parser'),
cors = require('cors'),
port = process.env.PORT || 3030,
dbConnection = require('./database') ,
user = require('./routes/user'),
session = require('express-session'),
passport = require('./passport'),
MongoStore = require('connect-mongo')(session),
flash = require('connect-flash')

app.use(flash())
app.use(cors({
  credentials: true,
  origin: true, 
  preflightContinue: true
}));



app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use(
  session({
  resave: false,
  secret: 'hello-world', 
  store: new MongoStore({ mongooseConnection: dbConnection }),
  saveUninitialized: false,

  })
)

app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser
app.use('/user', user)



app.listen(port, ()=>{
  console.log(`Listening on ${port}`)
})
