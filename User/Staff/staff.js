
function Load(){
    let passState = document.cookie.split(";")[0].split("=")[1];
    clearCookie()
    if(passState==="ture"){
        return
    }
    else{
        window.location.href="pass.html"
    }
}
function upload(){
    let gName = $("#Name");
    let gDeveloper = $("#Developer");
    let gIntro = $("#Introduction");
    let gType = $("#Type");
    let gPlatform = $("#Platform");
    let gSeries = $("#Series");
    let gRegion = $("#Region");
    let gDate = $("#Date");
    let gPublisher = $("#Publisher");
    let gPrice = $("#Price");
    let gMusic = $("#Music");
    let gNumber = $("#Number");
    let gEngine = $("#Engine");
    let gSize = $("#Size");
    let gRating = $("#Rating");
    let gStory = $("#Story");
    let gOffical = $("#Offical");
    let gTwitter = $("#Twitter");
    let gWiki = $("#Wiki");
    console.log(gName.val())
    $.ajax({
        url: "../Node.js",
        type: "get",
        data: {Page:"upload",Name:gName.val(),Developer:gDeveloper.val(),Intro:gIntro.val(),Type:gType.val(),Platform:gPlatform.val(),Series:gSeries.val(),Region:gRegion.val(),Date:gDate.val(),Publisher:gPublisher.val(),Price:gPrice.val(),Music:gMusic.val(),Number:gNumber.val(),Engine:gEngine.val(),Size:gSize.val(),Rating:gRating.val(),Story:gStory.val(),Offical:gOffical.val(),Twitter:gTwitter.val(),Wiki:gWiki.val()},
        success: function (Data,Status){
            console.log(Data)
        }
    })
}
function delGame(){
    let dName = $("#Name");
    $.ajax({
        url: "../Node.js",
        type: "get",
        data: {Page:"delGame",Name:dName.val()},
               success: function (Data,Status){
            console.log(Data)
        }
    })
}
function changeInfo(){
    $.ajax({
        url: "../Node.js",
        type: "get",
        data: {Page:"changeGame",Name:cName.val(),Wiki:cWiki.val()},
               success: function (Data,Status){
            console.log(Data)
        }
    })
    console.log(changeInfo)
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
