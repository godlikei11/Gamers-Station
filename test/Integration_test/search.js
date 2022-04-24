let userI = document.getElementById("userInfo");
var gameName = $("#inputSearch");
var name = $('input[name="CN_NAME"]').val();
let userCookie = document.cookie.split(";")[0].split("=")[1];
let Name = document.getElementById("Name");
function load(){
    console.log(userCookie)
        $("#Name").html("<span class='u'>"+userCookie+"</span>");
}//show the name

function displayset(num){
    var set = document.getElementById("set");
    set.style.opacity=num;
}//show the set icon
function deleteChild() {
    var e = document.querySelector("ul");
    var first = e.firstElementChild;
    while (first) {
    first.remove();
    first = e.firstElementChild;
    }
}
function Search(){
    deleteChild()
    $("#About").css("display","none");
    $("#inputSearch").css("transform","translate(-50%, -1400%)")
    $("#btnSearch").css("transform","translate(300%, -1400%)")
    $("#GameStation").css("font-size","30px")
    $("#GameStation").css("transform","translate(-50%, -1700%)")
    $(".gameList").css("width","1000px")
    $(".gameList").css("height","800px")
    $(".gameList").css("transform","translate(-45%, -40%)")
    $.ajax({
        url: "../Node.js",
        type: "get",
        data: {Page:"search",Name:document.getElementById("inputSearch").value},
        success: function (Data,Status){
            if(Data==="no_game"){
                $(".game").html("<div>no game<div/>")
            }//If no game
            else{
                let newData=JSON.parse(Data)
                console.log(newData[0]);
                for(var i = 0;i<=newData.length-1;i++){
                    var $li = $("<li><img src='../Img/"+ unescape(newData[i].split(";")[0])+".jpg' class='img'>"+
                    "<div class='title' ondblclick='enterGame(this)'>"+unescape(newData[i].split(";")[0])+"</div><br>"+
                    "<div class='intro'>"+unescape(newData[i].split(";")[2])+"</div>"+
                    "<div class='developer'>"+unescape(newData[i].split(";")[1])+"</div></li><br><br>")
                    $(".game").append($li)
                }      
            }//add gamelist
        }
    })
}
function setCookie(name,content, exdays){
    let exdate = new Date(); 
    exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
    window.document.cookie = name + "=" + content + ";path=/;expires=" + exdate.toGMTString();
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
}//clear cookie
function enterGame(e){
    clearCookie();
    setCookie("user",userCookie,7)
    setCookie("game",e.innerText,7)
    console.log(e.innerText)
    window.location.href="game.html"
}
function userInfo(){
    clearCookie();
    setCookie("user",userCookie,7)
    setCookie("page","search",7)

    window.location.href="user.html"
}
function About(){
    clearCookie();
    setCookie("user",userCookie,7)
    setCookie("from","search",1)
    window.location.href="about.html"
}
function log_out(){
    clearCookie();
    window.location.href="login.html"
}