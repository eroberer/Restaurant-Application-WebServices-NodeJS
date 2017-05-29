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
    let parentId = (req.params.parentId === undefined) ? 0 : req.params.parentId;
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

app.get('/desklist', (req, res) => {
    let deskList = order.getDeskList();
    deskList.then( (result) => {
        res.json({desklist : result});
    })
});

app.get('/deskOrders/:tempId', (req, res) => {
    let deskOrders = order.getDeskOrders(req.params.tempId);
    deskOrders.then( (result) => {
        res.json({deskOrders : result});
    })
});

app.post('/editbasket', (req, res) => {
    if(req.body.baskets !== undefined){
        if (req.body.baskets.length > 0){
            order.editBasket(req.body.baskets).then( (result) => {
                res.json({result : result});
            });
        } else {
            res.json({result : 'baskets array length is zero'});
        }
    } else {
        res.json({result : 'undefined baskets parameters!'});
    }

});

app.post('/deletebasket', (req, res) => {
    order.deleteBasket(req.body.basketId).then( (result) => {
        res.json({result : result});
    })
});

app.post('/changestatus', (req, res) => {
    if(req.body.orderId !== undefined && req.body.status !== undefined){
        let change = order.changeStatus(req.body.orderId, req.body.status);
        change.then((result) => {
            res.json({result: result});
        });
    }else{
        res.json({err : 'selam'});
    }
});

app.get('/baskets/:orderId', (req, res) => {
    if(req.params.orderId !== undefined && !isNaN(req.params.orderId)) {
        let baskets = order.getBaskets(req.params.orderId);
        baskets.then( (result) => {
            res.json({baskets : result});
        });
    } else {
        res.json({err : 'selam'});
    }
});

app.get('/detail/:productId', (req, res) => {
   if(req.params.productId !== undefined) {
       let detail = product.detail(req.params.productId);
       detail.then( (result) => {
           res.json({detail : result});
       });
   } else {
       res.json({err : 'selam'});
   }
});

app.listen(9090, () => {
    console.log('http://localhost:9090 runnig');
}); 
