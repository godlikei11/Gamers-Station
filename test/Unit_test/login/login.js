function Register(){
    //window.location.href="register.html"
    return true
}
function Forget(){
    //window.location.href="forget.html"
    return true
}
function About(){
    clearCookie();
    setCookie("user",$("#Name").val(),7);
    setCookie("page","login",7);
    //window.location.href="about.html"
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
}//clear cookie

function setCookie(name,content, exdays){
    let exdate = new Date(); 
    exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
    window.document.cookie = name + "=" + content + ";path=/;expires=" + exdate.toGMTString();
    return true
}

function Login(){
    let Name = $("#Name");
    let Pass = $("#Password");
    let Note = document.getElementById("note");
    if(Name.val()===""){
        Note.style.opacity=3;
        Note.innerHTML="<center><font color='white' size=20px>The name can't be empty</font></center>";
    }//If name is empty
    $.ajax({
        url: "../Node.js",
        type: "get",
        data: {Page:"login",Name:Name.val(),Password:Pass.val()},
            success: function (Data,Status){
                if(Data=="not exist"){
                    Note.style.opacity=3;
                    Note.innerHTML="<center><font color='white' size=20px>This name is not exist</font></center>";
                }//If name is not exist
                else if(Data=="success"){
                    clearCookie();
                    setCookie("user",Name.val(),7);
                    window.location.href="search.html";
                }
                else if(Data=="fail"){
                    Note.style.opacity=3;
                    Note.innerHTML="<center><font color='white' size=20px>The password is not right</font></center>";
                }//If password is not right
                console.log(Data);
                console.log(Status);
        }
    });
    return true
}
