let user = document.cookie.split("=")[1];
console.log(user)
function load(){
    //console.log("load");
    $.ajax({
        url: "../Node.js",
        type: "get",
        data: {Page:"log_suc",Name:user},
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
                $("#divAge").html("<font>"+Age+"</font>");
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
}
function Edit(){
    $("#divAge").html("<input id='newAge' placeholder='Age' type='text'/>")
    $("#divSex").html("<button onclick='Male()'>Male</button>&nbsp<button onclick='Female()'>Female</button>")
    $("#divLive").html("<input id='newLive' placeholder='Place of residence' type='text'/>")
    $("#divSign").html("<input id='newSign' placeholder='Sign' type='text'/>")
    $("#btnCha").html("<button id='finEdit' class='btnE' onclick='finEdit()'>Finish</button>")
}//enter the input to let user change information
function Male(){
    $("#divSex").html("<div id='newSex'>Male</div>")
}//male btn
function Female(){
    $("#divSex").html("<div id='newSex'>Female</div>")
}//female btn
function finEdit(){
    if($("#newSex")==="undefined"){
        Note.style.opacity=3;
        Note.innerHTML="<center><font color='white' size=20px>Please enter sex</font></center>";
        return
    }//If sex not be select
    $.ajax({
        url: "../Node.js",
        type: "get",
        data: {Page:"edit",Name:user,Age:$("#newAge").val(),Live:$("#newLive").val(),Sign:$("#newSign").val(),Sex:$("#newSex").html()},
        success: function (Data,Status){
            load();
            $("#btnCha").html("<button id='Edit' class='btnE' onclick='Edit()'>Edit</button>")
        }//upload the information and input btn for back
    })


}
function Back(){
    window.location.href="search.html"
}
