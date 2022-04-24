let userCookie = "test";
let pageCookie = "test";
console.log(userCookie)
function load(){
    if(pageCookie==="game"){
        $("#Edit").css("display","none");
    }
    $.ajax({
        url: "../Node.js",
        type: "get",
        data: {Page:"log_suc",Name:userCookie},
        success: function (Data,Status){
            let Name = Data.split(";")[0];
            let Email = Data.split(";")[1];
            let Age = Data.split(";")[2];
            let Sex = Data.split(";")[3];
            let Live = Data.split(";")[4];
            let Sign = Data.split(";")[5];
            $("#divName").html("<font>"+decodeURIComponent(Name)+"</font>");
            $("#divEmail").html("<font>"+decodeURIComponent(Email)+"</font>");
            if(Age!=="undefined"){
                $("#divAge").html("<font>"+decodeURIComponent(Age)+"</font>");
            }
            else{
                $("#divAge").html("<font>unknow</font>");
            }
            if(Sex!=="undefined"){
                $("#divSex").html("<font>"+Sex+"</font>");
            }
            else{
                $("#divSex").html("<font>unknow</font>");
            }
            if(Live!=="undefined"){
                $("#divLive").html("<font>"+decodeURIComponent(Live)+"</font>");
            }
            else{
                $("#divLive").html("<font>unknow</font>");
            }
            if(Sign!=="undefined"){
                $("#divSign").html("<font>"+decodeURIComponent(Sign)+"</font>");
            }
            else{
                $("#divSign").html("<font>No sign</font>");
            }
            console.log(Data)
        }//get the information and show
    })
    return true
}
function Edit(){
    $("#divAge").html("<input id='newAge' placeholder='Age' type='text'/>")
    $("#divSex").html("<button onclick='Male()'>Male</button>&nbsp<button onclick='Female()'>Female</button>")
    $("#divLive").html("<input id='newLive' placeholder='Place of residence' type='text'/>")
    $("#divSign").html("<input id='newSign' placeholder='Sign' type='text'/>")
    $("#btnCha").html("<button id='finEdit' class='btnE' onclick='finEdit()'>Finish</button>")
    return true

}//enter the input to let user change information
function Male(){
    $("#divSex").html("<div id='newSex'>Male</div>")
    return true

}//male btn
function Female(){
    $("#divSex").html("<div id='newSex'>Female</div>")
    return true

}//female btn
function finEdit(){
    if($("#newSex")==="undefined"){
        Note.style.opacity=3;
        Note.innerHTML="<center><font color='white' size=20px>Please enter sex</font></center>";
    }//If sex not be select
    $.ajax({
        url: "../Node.js",
        type: "get",
        data: {Page:"edit",Name:userCookie,Age:$("#newAge").val(),Live:$("#newLive").val(),Sign:$("#newSign").val(),Sex:$("#newSex").html()},
        success: function (Data,Status){
            load();
            $("#btnCha").html("<button id='Edit' class='btnE' onclick='Edit()'>Edit</button>")
        }//upload the information and input btn for back
    })
    return true

}
function setCookie(name,content,exdays){
    let exdate = new Date(); 
    exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
    window.document.cookie = name + "=" + content + ";path=/;expires=" + exdate.toGMTString();
    return true

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
    return true

}

function Back(){
    if(pageCookie==="search"){
        clearCookie();
        setCookie("user",userCookie,7)
        //window.location.href="search.html"
        
    }
    else if(pageCookie==="game"){
        let meCookie = document.cookie.split(";")[3].split("=")[1];
        let gameCookie = document.cookie.split(";")[2].split("=")[1];
        clearCookie();
        setCookie("user",meCookie,7)
        setCookie("game",gameCookie,7)
        //window.location.href="game.html"

    }
    return true

}
