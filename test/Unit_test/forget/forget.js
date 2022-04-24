function Search(){
    let Name = $("#forName");
    let Email = $("#forEmail");
    let Note = document.getElementById("note");
    let webName = document.getElementById("webName");
    let userInfor = document.getElementById("userInfor");
    let btnCha = document.getElementById("btnCha");
    if(Name.val()===""){
        Note.style.opacity=3;
        Note.innerHTML="<center><font color='white' size=20px>The name can't be empty</font></center>";
    }//If name is empty
    if(Email.val()===""){
        Note.style.opacity=3;
        Note.innerHTML="<center><font color='white' size=20px>The email can't be empty</font></center>";
    }//If email is empty
    $.ajax({
        url: "../Node.js",
        type: "get",
        data: {Page:"forget",Name:Name.val(),Email:Email.val()},
            success: function (Data,Status){
                if(Data=="not exist"){
                    Note.innerHTML="<center><font color='white' size=20px>The name is not exist</font></center>";
                }//If name is not exist
                else if(Data=="success"){
                    webName.innerHTML="Hi,"+Name.val();
                    userInfor.innerHTML="<br><br><br><input class='forInput' id='fPass' placeholder='Enter new password' type='password'/><br><br><input class='forInput' id='sPass' placeholder='Enter new password again' type='password'/><br>"
                    btnCha.innerHTML="<button class='btnReset' id='Reset' onclick='Reset()'>Reset Password</button><br><br>"
                }//Change the input and btn to reset
                else if(Data=="fail"){
                    Note.style.opacity=3;
                    Note.innerHTML="<center><font color='white' size=20px>Email does not match the name</font></center>";
                }//If email does not match the name
        }
    }); 
    return true
}
function Reset(){
    let fPass = $("#fPass");
    let sPass = $("#sPass");
    let Note = document.getElementById("note");
    let webName = document.getElementById("webName");
    let name = webName.innerHTML.split(",")[1]
    if(fPass.val()===""){
        Note.style.opacity=3;
        Note.innerHTML="<center><font color='white' size=20px>Please enter new password</font></center>";
    }//note enter new password
    else if(fPass.val()<8){
        Note.style.opacity=3;
        Note.innerHTML="<center><font color='white' size=20px>Password need at least 8 digits</font></center>";
    }
    if(sPass.val()===""){
        Note.style.opacity=3;
        Note.innerHTML="<center><font color='white' size=20px>Please enter new password again</font></center>";
    }//note enter new password twice
    if(sPass.val()!==fPass.val()){
        Note.style.opacity=3;
        Note.innerHTML="<center><font color='white' size=20px>Two passwords are not same</font></center>";
    }//note two passwords are not same
    $.ajax({
        url: "../Node.js",
        type: "get",
        data: {Page:"reset",Name:name,Pass:fPass.val()},
            success: function (Data,Status){
                if(Data=="reset_success"){
                    window.location.href="login.html"
                }//back tp login
            }
    });
    return true
}
function Back(){
    //window.location.href="login.html"
    return true
}