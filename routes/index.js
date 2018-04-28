var express = require('express');
var router = express.Router();

const userRouter = require('./users');
const JWT = require('jsonwebtoken')

const UserService = require('../services/user_service')

router.get('/login', (req, res, next) => {
  // res.set('Set-cookie',`username=${req.query.username}`);
  // res.send();
  const {
    username
  } = req.query;
  // console.log(username)
  // const user = {username}
  const token = JWT.sign(username, 'asdfghjk');
  res.send(token);
})

router.get('/hello', (req, res, next) => {
  // if (req.cookies.username) {
  //   res.send(`<h1>${req.cookies.username}</h1>`)
  // }
})

router.use('/user', userRouter);


router.post('/login', function (req, res, next) {
  (async () => {
    const {
      username,
      password
    } = req.body;

    const result = await UserService.loginwithNamePass({
      username,
      password
    });
    // return result
    res.json(result);
  })().then(r => {
    console.log(r)
  }).catch(e => {
    console.log(e)
  })
});

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;