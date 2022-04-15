let http = require('http');
let fs = require('fs');
let bcrypt = require('bcryptjs');
let Httpserver = http.createServer();
let MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
let WebSocket = require("ws");
const { ObjectID } = require('bson');
let wss = new WebSocket.Server({ port: 3000, clientTracking: true });
wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
      wss.clients.forEach(function(client){
         //Sendback the data
         let MongoUrl = "mongodb://localhost:27017/";//start Mongodb
         console.log(message)
         let dataGame = message.toString().split('"')[1];
            MongoClient.connect(MongoUrl, function(err, db) {
            if (err) throw err;
            let dboComment = db.db("MongoDatabase3");
            let SearchName = {"Name":"ywan1"}
            dboComment.collection("site").find({"Game":dataGame}).toArray(function(err, result) {
               client.send(JSON.stringify(result));
               //db.close();
            })
         })
      })
    })
})

/*var ws = require('nodejs-websocket');
var WebSocketserver = ws.createServer(function(socket){

   var count = 1;
   socket.on('text', function(str) {

        console.log(str);

        socket.sendText('服务器端收到客户端端发来的消息了！' + count++);
    });
}).listen(3000);*/

Httpserver.on("request",function(req,res){
    let url = req.url;
    console.log(url)
    function sendMessage(message){
      res.writeHead(200, {'Content-type' : 'text/html'});
      res.write(message)
      res.end();
   }//function to send message
   function hashPass(pass){
      let salt = bcrypt.genSaltSync(10);
      let hashedPassword = bcrypt.hashSync(pass, salt);
      console.log(hashedPassword)
      return hashedPassword;
   }//function to hash the password

   if(url.indexOf("?")!=-1){
      let Data = url.split("?")[1].split("&"); 
      let Page = Data[0].split("=")[1];//get the page to deal
      let MongoUrl = "mongodb://localhost:27017/";//start Mongodb
      MongoClient.connect(MongoUrl, function(err, db) {
         if (err) throw err;
         let dboUser = db.db("MongoDatabaseUser");
         if(Page==="register"){
            console.log("register interface")
            let myobj = { Name: Data[1].split("=")[1], Password: hashPass(Data[2].split("=")[1]),Email : Data[3].split("=")[1]};
            let SearchName = {"Name":Data[1].split("=")[1]}
            dboUser.collection("site").find(SearchName).toArray(function(err, result) {
               if (err) throw err;
               else if(result==""){
                  dboUser.collection("site").insertOne(myobj, function(err, res) {
                     if (err) throw err;
                     sendMessage("success");
                     console.log("reg success");
                     //db.close();
                  });
               }//If no same name in database,insert the data
               else{
                  sendMessage("exist");
                  console.log("exist");
                  //db.close();
               }//If same name in database,send "exist"
            })
         }//register function
         if(Page==="login"){
            let SearchName = {"Name":Data[1].split("=")[1]}
            dboUser.collection("site").find(SearchName).toArray(function(err, result) {
               if (err) throw err;
               else if(result==""){
                  sendMessage("not exist");
                  console.log("not exist");
                  //db.close();
               }//If no name in database,send "not exist"
               else{
                  if(bcrypt.compareSync(Data[2].split("=")[1],result[0].Password)){
                     sendMessage("success");
                     console.log("log success");
                     //db.close();
                    }//If name is match the password in database,send "success"
                  else{
                     sendMessage("fail");
                     console.log("log fail");
                     //db.close();
                  }//If password is not right,send "fail"
               }
            });
         }//login function
         if(Page==="forget"){
            let SearchName = {"Name":Data[1].split("=")[1]}
            dboUser.collection("site").find(SearchName).toArray(function(err, result) {
               if (err) throw err;
               else if(result==""){
                  sendMessage("not exist");
                  console.log("not exist");
                  //db.close();
               }//If name is not exist,send"not exist"
               else{
                  if(Data[2].split("=")[1]==result[0].Email){
                     sendMessage("success");
                     console.log("log success");
                     //db.close();
                    }//If name is match the email,send"success"
                  else{
                     sendMessage("fail");
                     console.log("log fail");
                     //db.close();
                  }//If name is not match the email,send"fail"
               }
            });
         }//forget password function
         if(Page==="reset"){
            let SearchName = {"Name":Data[1].split("=")[1]}
            let newPass = {$set:{"Password":hashPass(Data[2].split("=")[1])}}
            dboUser.collection("site").updateOne(SearchName, newPass, function(err, res) {
               if (err) throw err;
               sendMessage("reset_success");
               console.log("reset success");
               //db.close();
           });//reset data
         }//reset password function
         if(Page==="log_suc"){
            let SearchName = {"Name":Data[1].split("=")[1]}
            console.log("log_suc");
            dboUser.collection("site").find(SearchName).toArray(function(err, result) {
               if (err) throw err;
               res.writeHead(200, {'Content-type' : 'text/html'});
               res.write(result[0].Name+";"+result[0].Email+";"+result[0].Age+";"+result[0].Sex+";"+result[0].Live+";"+result[0].Sign)
               res.end();
            })//find the information
         }//show user information function
         if(Page==="edit"){
            let SearchName = {"Name":Data[1].split("=")[1]}
            if(Data[2].split("=")[1]!==""){
               dboUser.collection("site").updateOne(SearchName,{$set:{"Age":Data[2].split("=")[1]}}, function(err, res) {
                  if (err) throw err;
                  //db.close();
               })
            }//update Age
            if(Data[3].split("=")[1]!==""){
               dboUser.collection("site").updateOne(SearchName,{$set:{"Live":Data[3].split("=")[1]}}, function(err, res) {
                  if (err) throw err;
                  //db.close();
               })
            }//update Live
            if(Data[4].split("=")[1]!==""){
               dboUser.collection("site").updateOne(SearchName,{$set:{"Sign":Data[4].split("=")[1]}}, function(err, res) {
                  if (err) throw err;
                  //db.close();
               })
            }//update Sign
            if(Data[5]){
               dboUser.collection("site").updateOne(SearchName,{$set:{"Sex":Data[5].split("=")[1]}}, function(err, res) {
                  if (err) throw err;
                  //db.close();
               })
            } //update Sex
            res.writeHead(200, {'Content-type' : 'text/html'});
            res.end();
         }//edit user information function
      let dboGame = db.db("MongoDatabaseGame");
         if(Page==="search"){
            let list=new Array;
            let SearchName = {"Name": new RegExp(Data[1].split("=")[1]) }
            dboGame.collection("site").find(SearchName).toArray(function(err, result) {
               if (err) throw err;
               if(result[0]!==undefined){   
                  for(var i = 0;i<=result.length-1;i++){
                     list.push(result[i].Name+";"+result[i].Developer+";"+result[i].Intro)
                  }
                  sendMessage(JSON.stringify(list))
                  //db.close();
               }//Find the game and send back
               else{
                  sendMessage("no_game");
                  //db.close();
               }//Find no game 
            })
         }//search games function
         if(Page==="upload"){
            let gameObj={Name: Data[1].split("=")[1], Developer: Data[2].split("=")[1],Intro : Data[3].split("=")[1],Type : Data[4].split("=")[1],Platform : Data[5].split("=")[1],Series : Data[6].split("=")[1],Region : Data[7].split("=")[1],Date : Data[8].split("=")[1],Publisher : Data[9].split("=")[1],Price : Data[10].split("=")[1],Music : Data[11].split("=")[1],Number : Data[12].split("=")[1],Engine : Data[13].split("=")[1],Size : Data[14].split("=")[1],Rating : Data[15].split("=")[1],Story : Data[16].split("=")[1],Offical : Data[17].split("=")[1],Twitter : Data[18].split("=")[1],Wiki : Data[19].split("=")[1]};
            let SearchName = {"Name":Data[1].split("=")[1]}
            dboGame.collection("site").find(SearchName).toArray(function(err, result) {
               if (err) throw err;
               else if(result==""){
                  dboGame.collection("site").insertOne(gameObj, function(err, res) {
                     if (err) throw err;
                     sendMessage("success");
                     console.log("upload success");
                     //db.close();
                  });
               }//upload game success
               else{
                  sendMessage("exist");
                  console.log("exist");
                  //db.close();
               }//game is already
            })
         }//upload games' information function

      let dboComment = db.db("MongoDatabaseComment");
      if(Page==="game"){
         let gameObj={Name: Data[1].split("=")[1]};
         console.log("obj="+Data)
         dboGame.collection("site").find(gameObj).toArray(function(err, result1) {
            if (err) throw err;
            console.log(result1)
            dboComment.collection("site").find({"Game":Data[1].split("=")[1]}).toArray(function(err, result2) {
               if (err) throw err;
               result1.push(result2);
               res.writeHead(200, {'Content-type' : 'text/html'});
               res.write(JSON.stringify(result1));
               res.end();
               //db.close();
            })

         })

      }
      if(Page==="delGame"){
         var whereStr = {"Name":Data[1].split("=")[1]};  // 查询条件
         dboGame.collection("site").deleteOne(whereStr, function(err, obj) {
            if (err) throw err;
            sendMessage("success");

            console.log("文档删除成功");
            db.close();
         });
      }
      if(Page==="changeGame"){
         let SearchName = {"Name":Data[1].split("=")[1]}
         let newPass = {$set:{"Wiki":Data[2].split("=")[1]}}
         dboGame.collection("site").updateOne(SearchName, newPass, function(err, res) {
            if (err) throw err;
            sendMessage("reset_success");
            console.log("reset success");
            //db.close();
        });//reset data

      }
         if(Page==="sendComment"){
            let myobj = { Name: Data[1].split("=")[1], Game: Data[2].split("=")[1],userComment:Data[3].split("=")[1]};
            dboComment.collection("site").insertOne(myobj, function(err, res) {
               if (err) throw err;
               sendMessage("success");
               console.log("comment success");
               //db.close();
            });
         }
         if(Page==="delComment"){
            console.log(Data[1].split("=")[1])
            var whereStr = {"_id":ObjectID(Data[1].split("=")[1])};  // 查询条件
            dboComment.collection("site").deleteOne(whereStr, function(err, obj) {
               if (err) throw err;
               sendMessage("success");

               console.log("文档删除成功");
               db.close();
            });
         }
      console.log(Data)
      })

   }
   else{
      fs.readFile(url.substring(1), function (err, data) {
         if (err) {
            console.log(err);
            res.writeHead(404, {'Content-Type': 'text/html'});
         }else{             
            res.writeHead(200);
            res.write(data);          
         }
         res.end();
      });//Read the requested file contents from the file system
   }
})
Httpserver.listen(8080,function(){
    console.log("server running");
})

//({'content':/^.*120.77.215.34:9999.*$/})

/*
                  let gameObj={Name:"Resident%20Evil%20Village",Developer: 'Capcom',Intro:"'Resident Evil: Village' is an action-adventure game produced and published by Capcom. It will be released on May 7, 2021. It is the eighth work of the 'Resident Evil' mainline series and the sequel to 'Resident Evil 7'."}
            dboGame.collection("site").insertOne(gameObj, function(err, res) {
               if (err) throw err;
               sendMessage("success");
               console.log("reg success");
            });
   function comparePass(enterPass,dbPass){
      let salt = bcrypt.genSaltSync(10);
      let ePass = bcrypt.hashSync(enterPass, salt);
      if(ePass===dbPass){
         return true
      }
      else{
         return false
      }
   }
      */