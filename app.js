const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const product = require('./model/product');
const category = require('./model/category');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/category/:parentId?', function (req, res) {
    let parentId = (req.params.parentId == null) ? 0 : req.params.parentId;
    let categories = category.getCategories(parentId);
    categories.then( (result) => {
        res.json({categories: result});
    });
});

app.get('/product/:categoryId', function (req, res) {
    let products = product.getProducts(req.params.categoryId);
    products.then( (result) => {
        res.json({products :  result});
    });
});

app.listen(9000, (err) => {
    console.log('http://localhost:9000 runnig');
}); 
