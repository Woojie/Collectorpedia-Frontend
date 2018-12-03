const express = require('express')
const router = express.Router()
const User = require('../database/models/user')
const passport = require('../passport')

router.get('/', (req, res, next) => {
  if (req.user) {
    User.findOne({username: req.user.username}, (err, user)=>{
      res.json({ user
      })
    })
  } else {
      res.json({ user: null })
  }
})

router.post('/', (req, res) => {
  const { username, password } = req.body

  User.findOne({ username: username }, (err, user) => {
    if (err) {
      console.log('User.js post error: ', err)
    } else if (user) {
      res.json({
        error: `Sorry, already a user with the username: ${username}`
      })
    }else {
      const newUser = new User({
        username: username,
        password: password,
        collections: []
      })

      newUser.save((err, savedUser) => {
        if (err) return res.json(err)
        res.json(savedUser)
      })
    }
  })
})

router.put('/', (req, res) =>{
  const {user} = req.body
  

  User.findOneAndUpdate({username:user.username}, user, {new:true},
    (err, user)=>{

      if(err) {
        console.log(err)
        return res.status(500).send(err)}

      res.send(user)
    })
})

router.post('/login',
  function (req, res, next) {
      next()
  },
  passport.authenticate('local'),
  (req, res) => {
      var userInfo = {
          username: req.user.username
      };
      res.send(userInfo);
  }
)


router.post('/logout', (req, res) => {
  if (req.user) {
      req.logout()
      res.send({ msg: 'logging out' })
  } else {
      res.json(req)
  }
})


module.exports = router