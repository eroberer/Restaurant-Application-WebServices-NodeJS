const database = require('./config/connection');

async function getProducts(categoryId) {
    let results = [];

    let products = await database.query({
        sql : 'SELECT * FROM products WHERE category = ?',
        values : [ categoryId ]
    });

    for (let i = 0; i < products.result.length; i++){
        let product = products.result[i];
        let images = await database.query({
            sql : 'SELECT CONCAT(?, image) as image FROM productimages WHERE productID = ?',
            values : [
                database.getImageHost("Products/"),
                product.productID
            ]
        });
        product.images = images.result;
        results.push(product);
    }

    return results;
}


async function detail(productId) {
    let product = await database.query({
        sql : 'SELECT * FROM products WHERE productID = ?',
        values : [productId]
    });

    if (product.result[0] !== undefined) {
        let images = await database.query({
            sql : 'SELECT CONCAT(?,image) as image FROM productimages WHERE productID = ?',
            values : [
                database.getImageHost("Products/"),
                productId
            ]
        });
        product.result[0].images = images.result;
        return product.result;
    } else {
        return product.result;
    }
}

module.exports = {
    getProducts : getProducts,
    detail : detail
};