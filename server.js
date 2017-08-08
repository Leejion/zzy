/**
 * Created by zhangzhongyou on 2017/8/5.
 */
var express = require('express');

var app = express();
app.use(function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});
app.use(function(req,res){
    console.log(1111);
    res.send({user:'zzy'}).end();
});
app.listen("9099");

