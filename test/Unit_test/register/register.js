function Register(){
    let Name = $("#rgName");
    let Pass = $("#rgPassword");
    let rePass = $("#rePassword");
    let Email = $("#Email");
    let Note = document.getElementById("note");
    if(Name.val() ===""){
        Note.style.opacity=3;
        Note.innerHTML="<center><font color='white' size=20px>Name can not be empty</font></center>";
    }//If name is empty
    if(Name.val().length>=8){
        Note.style.opacity=3;
        Note.innerHTML="<center><font color='white' size=20px>Name length can not more than 8 digits</font></center>";
    }//If name is too long
    if(Pass.val().length<8){
        Note.style.opacity=3;
        Note.innerHTML="<center><font color='white' size=20px>Password need at least 8 digits</font></center>";
    }//If password is too short
    if(Pass.val() != rePass.val()){
        Note.style.opacity=3;
        Note.innerHTML="<center><font color='white' size=20px>Two passwords are not same</font></center>";
    }//If two passwords are not same
    if(Email.val() === ""){
        Note.style.opacity=3;
        Note.innerHTML="<center><font color='white' size=20px>Email can not be empty</font></center>";
    }//If email is empty
    if(Email.val().indexOf("@")==-1||Email.val().indexOf(".")==-1){
        Note.style.opacity=3;
        Note.innerHTML="<center><font color='white' size=20px>Email format is incorrect</font></center>";
    }//If email format is incorrect
    $.ajax({
        url: "node.js",
        type: "get",
        data: {Page:"register",Name:Name.val(),Password:Pass.val(),Email:Email.val()},

        success: function (Data,Status){
            if(Data=="success"){
                window.location.href="login.html"
            }
            else if(Data=="exist"){
                Note.style.opacity=3;
                Note.innerHTML="<center><font color='white' size=20px>Name has already been used</font></center>";
            }//If name has already been used
            console.log(Data);

        }
    });
    return true
}
function Back(){
    //window.location.href="login.html"
    return true
}