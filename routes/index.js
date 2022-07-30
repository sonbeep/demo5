var express = require('express');
var multer  = require('multer');
const e = require("express");
var storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, 'uploads');
  },
  filename: function (req, file, cb){
    cb(null,Date.now() + Math.random()+ file.originalname );
  },
});
var upload = multer({storage:storage, limit: {fileSize: 2 * 1024 * 1024},
  fileFilter: function (req, file, cb){
    var ten = file.mimetype;
    var kichthuoc = file.length;
     if (ten.indexOf('.jpg')> -1){
       cb(null, true);
     }else {
       cb(new Error("Duoi file phai la jpg"), false);
     }
  }});
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/upload',upload.single('file'), function (req, res){
  upload(req, res, function (err){
    if (err != null){
      res.send(err.message)
    }else {
      var email = req.body.email;
      var file = req.file.originalname;
      res.send("OK, upload thanh cong: "+ file);
    }
  })
  res.send("'OK, upload thanh cong" + file);
})
module.exports = router;
