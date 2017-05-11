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
        sql : 'SELECT desks.name, IFNULL((SELECT status FROM orders WHERE tempDeskID = desks.tempID ORDER BY orderID DESC LIMIT 1),0) as status, IFNULL((SELECT orderID FROM orders WHERE tempDeskID = desks.tempID ORDER BY orderID DESC LIMIT 1),0) as orderId FROM desks'
    });
    return deskList.result;
}

async function getBaskets(orderId) {
    let baskets = await database.query({
        sql : 'SELECT p.name, (SELECT CONCAT(?,image) FROM productimages WHERE productID = p.productID LIMIT 1) as image, b.piece, (b.piece*b.price) as total FROM baskets as b '+
        'INNER JOIN products as p ON b.productID = p.productID WHERE b.orderID = ?',
        values : [
            database.getImageHost("Products/"),
            orderId
        ]
    });
    return baskets.result;
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
    getTempDesk : getTempDesk,
    order : order,
    changeStatus : changeStatus,
    getDeskList : getDeskList,
    getBaskets : getBaskets
};