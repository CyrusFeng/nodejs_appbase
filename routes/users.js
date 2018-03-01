var express = require('express');
var router = express.Router();

const UserService = require('../services/user_service');

/* GET users listing. */
router.route('/')
.get((req, res, next)=>{
  const user = UserService.getAllUsers()
  res.locals.user = user;
  res.render('user');
}).post((req, res, next)=>{
  const {username,password} = req.body;
  const user = UserService.addNewUser(username,password)
  res.json(user);
})
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
//695 712 732 755 778 779 854 868 882 210 212  585
//63
//88 113 146 150 181 183 195 211 282
