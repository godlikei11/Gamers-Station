let name1 = localStorage.getItem("name");
let pass1 = localStorage.getItem("password");
let email1 = localStorage.getItem("email");
let Name1 = document.getElementById("Name");
let Pass1 = document.getElementById("Password");
localStorage.clear();
if(localStorage.length===3){
    $("#Name").val(name1);
    $("#Password").val(pass1);

    setInterval(() => {
        localStorage.clear();
        $("#Login")[0].click();
    }, 2000);
    
}
else if(localStorage.length===4){
    setInterval(() => {
        $("#Forget")[0].click();
    }, 2000);
}
else if(localStorage.length===1){
    setInterval(() => {
        $("#Register")[0].click()
    }, 2000);
}
else if(localStorage.length===0){
    setInterval(() => {
        $("#About")[0].click()
    }, 2000);
}
else if(localStorage.length===2){
    localStorage.clear();

        alert("Integration test success")

}