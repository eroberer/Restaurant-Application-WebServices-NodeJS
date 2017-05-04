const config = require('./config/connection');
const connection = config.connection;

async function getTempDesk (deskId) {
    let {tempId} = await addTempDesk(deskId);
    return tempId;
}

function addTempDesk(deskId) {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO tempdesks (deskID) VALUES (?)', [deskId], (error, result, fields) => {
            if (error) return reject(error)
            let tempId = result.insertId;
            connection.query('UPDATE desks SET tempID = ? WHERE deskID = ?',[tempId, deskId] , (err, res, fields) => {
                resolve({ tempId, fields });
            });
        });
    });
}

async function order(tempId, products) {
    let order = await newOrder(tempId);
    for(let i = 0; i < products.length; i++){
        await addBasket(order.orderId, products[i].productId, products[i].piece);
    }
    return true;
}

function newOrder(tempId) {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO orders (tempDeskID, status) VALUES (?,0)',[tempId] , (err, result, fields) => {
            let orderId = result.insertId;
            resolve({orderId});
        });
    });
}

function addBasket(orderId, productId, piece) {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO baskets (orderID, productID, piece, price)'+ 
        'VALUES (?, ?, ?, ?*(SELECT price FROM products WHERE productID = ?))', [orderId, productId, piece, piece, productId], 
        (err, result, fields) => {
            resolve({ result, fields });
        });
    });
}

async function changeStatus(orderId, status) {
    await connection.query('UPDATE orders SET status = ? WHERE orderID = ?', [status, orderId], (err, result, fields) => {
        if(err) return false;
        if(result.affectedRows > 0) return true;
        else return false;
    });
}
 
module.exports = {
    getTempDesk : getTempDesk,
    order : order,
    changeStatus : changeStatus
};