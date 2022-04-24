let comment=$("#commentInput");
console.log($(":button"))

if(localStorage.length===1){
    setInterval(() => {
        comment.val("Hello!");
    }, 1000);
    setInterval(() => {
        localStorage.setItem("addComment","true")
        $("#btnComment").click();
    }, 2000);
}
if(localStorage.length===2){
    setInterval(() => {
        $(".btnDel").click();
    }, 1000);
    setInterval(() => {
       $("#btnBack").click();
    }, 2000);
}



