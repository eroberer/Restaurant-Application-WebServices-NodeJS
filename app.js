const product = require('./model/product');
const category = require('./model/category');
const account = require('./model/account');
const order = require('./model/order');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

app.get('/category/:parentId?', (req, res) => {
    let parentId = (req.params.parentId == null) ? 0 : req.params.parentId;
    let categories = category.getCategories(parentId);
    categories.then( (result) => {
        res.json({categories: result});
    });
});

app.get('/product/:categoryId', (req, res) => {
    let products = product.getProducts(req.params.categoryId);
    products.then( (result) => {
        res.json({products :  result});
    });
});

app.post('/login', (req, res) => {
    if(req.body.username !== undefined && req.body.password !== undefined) {
        let login = account.login(req.body.username, req.body.password);
        login.then( (result) => {
            res.json({result : result});
        });
        
    }else{
        res.json({err : 'selam'});
    }
});

app.post('/tempdesk', (req, res) => {
    if(req.body.deskid !== undefined){
        let tempDeskId = order.getTempDesk(req.body.deskid);
        tempDeskId.then((result) => {
            res.json({tempId : result});
        });
    }else{
        res.json({err : 'selam'});
    }
});

app.post('/order', (req, res) => {
    if(req.body.products !== undefined && req.body.tempId !== undefined ){
        if(req.body.products.length > 0){
            let result = order.order(req.body.tempId, req.body.products);
            result.then((reslt) => {
                res.json({result: reslt});
            });
        }else{
            res.json({err : 'hata'});
        }
    }else{
        res.json({err : 'hata'});
    }
});

app.post('/changestatus', (req, res) => {
    if(req.body.orderId !== undefined && req.body.status !== undefined){
        let result = order.changeStatus(req.body.orderId, req.body.status);
        result.then((reslt) => {

            
            res.json({result: true});
        });
    }else{
        res.json({err : 'hata'});
    }
})

app.listen(9090, (err) => {
    console.log('http://localhost:9090 runnig');
}); 
