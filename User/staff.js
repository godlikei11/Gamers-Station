
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
    console.log()
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
    let cName = $("#Name");
    let cWiki = $("#Wiki");
    $.ajax({
        url: "../Node.js",
        type: "get",
        data: {Page:"changeGame",Name:cName.val(),Wiki:cWiki.val()},
               success: function (Data,Status){
            console.log(Data)
        }
    })

}