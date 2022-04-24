if(localStorage.length===0){
    setInterval(() => {
        $("#head").click();
    }, 2000);
}
if(localStorage.length===1){
    setInterval(() => {
        $("#inputSearch").val("Resident");
    }, 1000);
    setInterval(() => {
        $("#btnSearch").click();
    }, 2000);
    setInterval(() => {
        $(".title").dblclick();
    }, 3000);
}
if(localStorage.length===2){
    setInterval(() => {
        $("#About").dblclick();
    }, 1000);
}

if(localStorage.length===3){
    setInterval(() => {
        localStorage.removeItem("about");
        $("#logout").dblclick();
    }, 1000);
}