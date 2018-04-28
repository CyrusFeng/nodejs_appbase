var express = require('express');
var router = express.Router();

const UserService = require('../services/user_service');
const HttpReqParamError = require('../errors/http_request_param_error');
const auth = require('../middlewares/auth')





/* GET users listing. */
router.route('/')
  .get((req, res, next) => {
    (async () => {
      // throw new HttpReqParamError('page','请指定页码','page can not be empty');
      const user = await UserService.getAllUsers()
      res.locals.user = user;
    })().then(r => {
      res.render('user');
    }).catch(e => {
      next(e)
    })

  })


router.post('/', function (req, res, next) {
  (async () => {
    const {username,password} = req.body;
    
    const user = await UserService.addNewUser({username,password});
    res.json(user);
  })().then(r => {
    console.log(r)
  }).catch(e => {
    console.log(e)
  })
});




//插入订阅信息
router.post('/:userId/subscription', auth(),function (req, res, next) {
  (async () => {
    try {
      const userId = req.params.userId;
      console.log(userId)
      if (userId.length<2) {
        throw new HttpReqParamError('userId','用户id不能为空','userId can not be empty')
      }
      const sub = await UserService.createSubscription(req.params.userId, req.body.url);
      res.json(sub);
    } catch (error) {
      next(error)
    }
  })().then(r => {
    console.log(r)
  }).catch(e => {
    console.log('e',e)
  })

  
});




module.exports = router;
//695 712 732 755 778 779 854 868 882 210 212  585
//63
//88 113 146 150 181 183 195 211 282

