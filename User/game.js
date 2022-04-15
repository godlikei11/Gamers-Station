let userCookie = document.cookie.split(";")[0].split("=")[1];
let gameCookie = document.cookie.split(";")[1].split("=")[1];

console.log(userCookie,gameCookie)
function Back(){
    clearCookie();
    setCookie(7);
    window.location.href="search.html"

}
function deleteChild() {
    var e = document.querySelector("ul");
    var first = e.firstElementChild;
    while (first) {
    first.remove();
    first = e.firstElementChild;
    }
}
function Load(){
    $.ajax({
        url: "../Node.js",
        type: "get",
        data: {Page:"game",Name:gameCookie},
            success: function (Data,Status){
                console.log(JSON.parse(Data))
                let dataGame=JSON.parse(Data)[0];
                let comGame = JSON.parse(Data)[1];
                console.log(decodeURIComponent(dataGame.Name))
                $("#cover").css("background-image","url('../Page/"+decodeURIComponent(dataGame.Name)+".jpg')")
                $(".topGame").css("background-image","url('../Page/"+decodeURIComponent(dataGame.Name)+".jpg')")

                $(".title").text(decodeURIComponent(dataGame.Name));
                $("#Name").text(decodeURIComponent(dataGame.Name));
                $("#Type").text(decodeURIComponent(dataGame.Type));
                $("#Platform").text(decodeURIComponent(dataGame.Platform));
                $("#Series").text(decodeURIComponent(dataGame.Series));
                $("#Region").text(decodeURIComponent(dataGame.Region));
                $("#Date").text(decodeURIComponent(dataGame.Date));
                $("#Publisher").text(decodeURIComponent(dataGame.Publisher));
                $("#Price").text(decodeURIComponent(dataGame.Price));
                $("#Producer").text(decodeURIComponent(dataGame.Developer));
                $("#Music").text(decodeURIComponent(dataGame.Music));
                $("#Number").text(decodeURIComponent(dataGame.Number));
                $("#Engine").text(decodeURIComponent(dataGame.Engine));
                $("#Size").text(decodeURIComponent(dataGame.Size));
                $("#Rating").text(decodeURIComponent(dataGame.Rating));
                $("#Story").text(decodeURIComponent(dataGame.Story));
                for(var i=0;i<=comGame.length-1;i++){
                    if(comGame[i].Name!==userCookie){
                        var $li = $("<li><div class='liComment'>"+comGame[i].userComment+"</div>"+
                    "<br><div class='liUser'>"+comGame[i].Name+"</div><button class='nonDel'>Delete</button></li>")
                    }
                    else{
                        var $li = $("<li><div class='liComment'>"+comGame[i].userComment+"</div>"+
                    "<br><div class='liUser'>"+comGame[i].Name+"</div><button class='btnDel' onclick='delComment(this)' id='"+comGame[i]._id+"'>Delete</button></li>")
                    }
                    $(".content").append($li)
                }
                var $btn=$("<div id='"+decodeURIComponent(dataGame.Wiki)+"' class='web wiki' onclick='webOpen(this)'></div><div id='"+decodeURIComponent(dataGame.Twitter)+"' class='web twi' onclick='webOpen(this)'></div><div id='"+decodeURIComponent(dataGame.Offical)+"' class='web off' onclick='webOpen(this)'></div>")
                $(".gameInfor").append($btn)

            }
            
    })

    /*var ws = new WebSocket('ws://localhost:3000/'); 
    ws.onopen = function() {
        ws.send('start');
    }
        ws.onmessage = function(e) {
            deleteChild()
            let com = JSON.parse(e.data)
            let len = $(".content li").length
            console.log(com.length)
                for(var i=0;i<=com.length-1;i++){
                    var $li = $("<li><div class='liComment'>"+com[i].userComment+"</div>"+
                    "<br><div class='liUser'>"+com[i].Name+"</div><button class='btnDel'>Delete</button></li>")
                    $(".content").append($li)
            }
            ws.send(JSON.stringify(gameCookie));
        }
        ws.onclose = function () {
            console.log("WebSocket连接关闭");
        }*/

}
function webOpen(e){
    window.open(e.id)
}
function delComment(e){
    $.ajax({
        url: "../Node.js",
        type: "get",
        data: {Page:"delComment",_id:e.id},
            success: function (Data,Status){
                if(Data==="success"){
                    location.reload();
                }
            }
    })
}
function wikiCilck(e){
    window.open("https://en.wikipedia.org/wiki/"+e.innerText)
}
function sendComment(){
    let Note = document.getElementById("note");
    let comment = document.getElementById("commentInput").value;
    
    if(comment.length>=30){
        Note.style.opacity=3;
        document.getElementById("note").style.backgroundColor="rgba(165, 42, 42, 0.616)";
        Note.innerHTML="<center><font color='white' size=20px>Comment can not more than 30 digits</font></center>";
        return
    }
    if(comment.length==0){
        Note.style.opacity=3;
        document.getElementById("note").style.backgroundColor="rgba(165, 42, 42, 0.616)";
        Note.innerHTML="<center><font color='white' size=20px>Comment can not be empty</font></center>";
        return
    }
    $.ajax({
        url: "../Node.js",
        type: "get",
        data: {Page:"sendComment",Name:userCookie,Game:gameCookie,userComment:document.getElementById("commentInput").value},
            success: function (Data,Status){
                console.log(Data)
                if(Data==="success"){
                    document.getElementById("commentInput").value=""
                    document.getElementById("note").style.opacity=3;
                    document.getElementById("note").style.backgroundColor="rgba(74, 233, 108, 0.616)";
                    document.getElementById("note").innerHTML="<center><font color='white' size=20px>Comment success</font></center>";
                    location.reload();
                }
            }
        })
}



function setCookie(exdays){
    let exdate = new Date(); 
    exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
    window.document.cookie = "user" + "=" + userCookie + ";path=/;expires=" + exdate.toGMTString();
}
function clearCookie(){
    var cookies = document.cookie.split("; ");
    for (var c = 0; c < cookies.length; c++) {
        var d = window.location.hostname.split(".");
        while (d.length > 0) {
            var cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
            var p = location.pathname.split('/');
            document.cookie = cookieBase + '/';
            while (p.length > 0) {
                document.cookie = cookieBase + p.join('/');
                p.pop();
            };
            d.shift();
        }
    }
}