
setInterval(() => {
    $("#Edit").click();
}, 2000);

setInterval(() => {
    $("#newAge").val("20");
    $("#Male").click();
    $("#newLive").val("Plymouth");
    $("#newSign").val("Hello!");
}, 3000);

setInterval(() => {
    $("#finEdit").click();
}, 4000);

setInterval(() => {
    localStorage.setItem("user","true")
    $("#Back").click();
}, 5000);