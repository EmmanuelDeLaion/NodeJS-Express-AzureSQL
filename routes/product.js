var router = require('express').Router();
var TYPES = require('tedious').TYPES;


router.get('/', function(req, res) {
    req.sql("SELECT * FROM Product FOR JSON PATH")
        .into(res, '[]');
});


router.get('/:id', function(req, res) {
    req.sql("SELECT * FROM Product WHERE ProductID = @id FOR JSON PATH, without_array_wrapper")
        .param('id', req.params.id, TYPES.Int)
        .into(res, '{}');

});


router.post('/', function(req, res) {
    req.sql("EXEC createProduct @product")
        .param('product', req.body, TYPES.NVarChar)
        .exec(res);
    console.log("El producto se ha registrado con exito");

    res.json({
        "Mensaje": "El producto se ha creado con exito"
    });
});


router.put('/:id', function(req, res) {
    req.sql("EXEC updateProduct @id, @product")
        .param('id', req.params.id, TYPES.Int)
        .param('product', req.body, TYPES.NVarChar)
        .exec(res);

    console.log("El producto se ha actualizado con exito");

    res.json({
        "Mensaje": "El producto se ha actualizado con exito"
    });


});



router.delete('/:id', function(req, res) {
    req.sql("DELETE FROM Product WHERE ProductID = @id")
        .param('id', req.params.id, TYPES.Int)
        .exec(res);
    console.log("El producto se ha eliminado con exito");

    res.json({
        "Mensaje": "El producto se ha eliminado con exito"
    });
});


module.exports = router;