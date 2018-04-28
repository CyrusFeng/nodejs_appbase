const HttpBaseError = require('../errors/http_base_error');

function handler(options) {
  return function(err,req,res,next) {
    if (err instanceof HttpBaseError) {
      // console.log('拥有软件');
      // console.log(`${err.httpStatusCode} ${err.message} ${err.errCode}哇哈哈哈哈`,err);
      res.json({
        code:err.errCode,
        msg:err.message
      });
    }else{
      next(err)
    }
  }
}

module.exports = handler;