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

module.exports = {
    getProducts : getProducts
};