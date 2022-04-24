import user from "../User/user.js";
import search from "../User/search.js"
import register from "../User/register.js"
import login from "../User/login.js"
import game from "../User/game.js"
import forget from "../User/forget.js"
import staff from "../User/Staff/staff.js"
import pass from "../User/Staff/pass.js"
let http = require('http'); 
let MongoClient = require('mongodb').MongoClient;

try{
    MongoClient.connect("mongodb://localhost:8080/");
}catch{
    console.log("Mongodb connect fail")
}
try{
    http.createServer().listen(8080); 
}catch{
    console.log("Http connect fail")
}
describe("#Register",function(){
    describe("#register",function(){
        register.Register();
    })
    describe("#back",function(){
        register.Back();
    })
})
