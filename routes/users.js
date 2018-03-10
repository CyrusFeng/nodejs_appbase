var express = require('express');
var router = express.Router();

const UserService = require('../services/user_service');

/* GET users listing. */
router.route('/')
  .get((req, res, next) => {
    (async () => {
      const user = await UserService.getAllUsers()
      res.locals.user = user;
      res.render('user');
    })().then(r => {
      console.log(r)
    }).catch(e => {
      console.log(e)
    })

  })


router.post('/', function (req, res, next) {

  (async () => {
    const user = await UserService.addNewUser(req.body.username, req.body.password);
    res.json(user);
  })().then(r => {
    console.log(r)
  }).catch(e => {
    console.log(e)
  })
});


//插入订阅信息
router.post('/:userId/subscription', function (req, res, next) {
  try {
    const sub = UserService.createSubscription(req.params.userId, req.body.url);
    res.json(sub);
  } catch (error) {
    next(error)
  }
});




module.exports = router;
//695 712 732 755 778 779 854 868 882 210 212  585
//63
//88 113 146 150 181 183 195 211 282