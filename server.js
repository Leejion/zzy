/**
 * Created by zhangzhongyou on 2017/8/5.
 */
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan')
console.log(bodyParser.urlencoded);
var app = express();
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(bodyParser.json());
app.use(morgan('dev'));
var router = express.Router();
app.use(function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});
app.use("/",router);
router.post("/login",function (req,res) {
    console.log(req.body);
    res.json({
        user:{
            token : 1234,
            id: 1,
            role:2
        }

    }).end();

});
app.listen("9099");

