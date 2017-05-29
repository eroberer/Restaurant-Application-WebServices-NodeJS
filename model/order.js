const database = require('./config/connection');

async function getTempDesk(deskId) {
    let isHaveDesk = await database.query({
        sql : 'SELECT tempID FROM desks WHERE desksID = ?',
        values : [
            deskId
        ]
    });
    if(isHaveDesk.result[0].tempID === 0 ) {
        let tempDesk = await database.query({
            sql : 'INSERT INTO tempdesks (deskID) VALUES (?)',
            values : [
                deskId
            ]
        });
        await database.query({
            sql : 'UPDATE desks SET tempID = ? WHERE desksID = ?',
            values : [
                tempDesk.result.insertId,
                deskId
            ]
        });
        return tempDesk.result.insertId;
    } else {
        return isHaveDesk.result[0].tempID;
    }
}

async function order(tempId, products) {
    let order = await database.query({
        sql : 'INSERT INTO orders (tempDeskID, status) VALUES (?,1)',
        values : [
            tempId
        ]
    });
    for (let i = 0; i < products.length; i++) {
        await database.query({
            sql : 'INSERT INTO baskets (orderID, productID, piece, price) '+
            'VALUES (?, ?, ?, (SELECT price FROM products WHERE productID = ?))',
            values : [
                order.result.insertId,
                products[i].productId,
                products[i].piece,
                products[i].productId
            ]
        });
    }
    return true;
}

async function getDeskList() {
    let deskList = await database.query({
        sql : 'SELECT desks.name, IFNULL((SELECT status FROM orders WHERE tempDeskID = desks.tempID ORDER BY orderID DESC LIMIT 1),0) as status, IFNULL((SELECT desks.tempID FROM orders WHERE tempDeskID = desks.tempID ORDER BY orderID DESC LIMIT 1),0) as tempId FROM desks WHERE deleteAt = 0'
    });
    return deskList.result;
}

async function getDeskOrders(tempId) {
    let orderList = await database.query({
        sql: 'SELECT ord.orderID, TIME(ord.date) as date, ord.status, (SELECT SUM(price*piece) FROM baskets WHERE orderID = ord.orderID) as total FROM orders as ord WHERE ord.tempDeskID = ? AND (SELECT COUNT(*) FROM baskets WHERE orderID = ord.orderID ) > 0 ORDER BY ord.orderID DESC',
        values : [tempId]
    });
    return orderList.result;
}

async function getBaskets(orderId) {
    let baskets = await database.query({
        sql : 'SELECT b.basketID, p.name, (SELECT CONCAT(?,image) FROM productimages WHERE productID = p.productID LIMIT 1) as image, b.piece, b.price as total FROM baskets as b '+
        'INNER JOIN products as p ON b.productID = p.productID WHERE b.orderID = ?',
        values : [
            database.getImageHost("Products/"),
            orderId
        ]
    });
    return baskets.result;
}

async function editBasket(baskets) {
    for (let i = 0; i < baskets.length; i++) {
        await database.query({
            sql : 'UPDATE baskets SET piece = ? WHERE basketID = ? ',
            values : [
                baskets[i].piece,
                baskets[i].basketId
            ]
        });
    }
    return true;
}

async function deleteBasket(basketId) {
    let change = await database.query({
            sql : 'DELETE FROM baskets WHERE basketID = ? ',
            values : [ basketId ]
        });
    return change.result.affectedRows > 0;
}

async function changeStatus(orderId, status) {
    let change = await database.query({
        sql : 'UPDATE orders SET status = ? WHERE orderID = ?',
        values : [
            status,
            orderId
        ]
    });
    return change.result.affectedRows > 0;
}
 
module.exports = {
    getTempDesk     : getTempDesk,
    order           : order,
    changeStatus    : changeStatus,
    getDeskList     : getDeskList,
    getBaskets      : getBaskets,
    getDeskOrders   : getDeskOrders,
    editBasket      : editBasket,
    deleteBasket    : deleteBasket
};