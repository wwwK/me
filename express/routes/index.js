var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/ts', function(req, res, next) {
  res.render('index', { title: 'Expressts' });
});
router.get('/getstorage', function (req, res, next) {
  res.send(200,{code:1,message:'Hello express!'});
});

/* POST */
router.post('/submitstorage', function (req, res, next) {
    res.send(200,{code:1,message:'成功提交',json:req.body});
});
module.exports = router;
