let gPass = $("#Pass");

function setCookie(exdays){
    let exdate = new Date(); 
    exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
    window.document.cookie = "Pass=ture;path=/;expires=" + exdate.toGMTString();
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

function check(){
    console.log(gPass.val())
    console.log(document.getElementById("Pass").value)

    $.ajax({
        url: "../Node.js",
        type: "get",
        data: {Page:"Pass",Name:document.getElementById("Name").value,Pass:document.getElementById("Pass").value},
               success: function (Data,Status){
                   if(Data==="pass"){
                    clearCookie()
                    setCookie(1)
                    window.location.href="staff.html"
                }
                if(Data==="fail"){
                    clearCookie()
                    alert("wrong name or password")
                }
            console.log(Data)
        }
    })

}