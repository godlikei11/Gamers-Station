var Name = $("#rgName");
let Pass = $("#rgPassword");
let rePass = $("#rePassword");
let Email = $("#Email");
//let btnRegister = document.getElementById('Register');
Name.val(Math.round(Math.random()*150));
Pass.val("test1234");
rePass.val("test1234");
Email.val("test@gmail.com");
localStorage.setItem("name",Name.val())
localStorage.setItem("password",Pass.val())
localStorage.setItem("email",Email.val())
setInterval(() => {
    $("#Register")[0].click()
}, 2000); 
//Math.round(Math.random()*150)