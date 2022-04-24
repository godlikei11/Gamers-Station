suite("test",function(){
    test("Register",function(){
        chai.assert.equal(Register(),true,"error");
    })
    test("Back",function(){
        chai.assert.equal(Back(),true,"error");
    })
})