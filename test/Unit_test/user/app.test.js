suite("test",function(){
    test("load",function(){
        chai.assert.equal(load(),true,"error");
    })
    test("Edit",function(){
        chai.assert.equal(Edit(),true,"error");
    })
    test("Male",function(){
        chai.assert.equal(Male(),true,"error");
    })
    test("Female",function(){
        chai.assert.equal(Female(),true,"error");
    })
    test("setCookie",function(){
        chai.assert.equal(setCookie(1,1,1),true,"error");
    })
    test("clearCookie",function(){
        chai.assert.equal(clearCookie(),true,"error");
    })
    test("finEdit",function(){
        chai.assert.equal(finEdit(),true,"error");
    })
    test("Back",function(){
        chai.assert.equal(Back(),true,"error");
    })
})