let Name = $("#forName")
let Email = $("#forEmail")
let name1 = localStorage.getItem("name");
let email1 = localStorage.getItem("email");

Name.val(name1);
Email.val(email1);

setInterval(() => {
    $("#Search")[0].click();
}, 2000);

setInterval(() => {
    $("#fPass").val("testSecondpass");
    $("#sPass").val("testSecondpass");
}, 2000);

setInterval(() => {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.setItem("password",$("#fPass").val())
    $("#Reset")[0].click();
}, 2000);