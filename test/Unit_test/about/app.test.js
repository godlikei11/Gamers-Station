suite("test",function(){

    test("setCookie",function(){
        chai.assert.equal(setCookie("user","test",1),true,"error");
    })
    test("clearCookie",function(){
        chai.assert.equal(clearCookie(),true,"error");
    })
    test("Back",function(){
        chai.assert.equal(Back(),true,"error");
    })
})