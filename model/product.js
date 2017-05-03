const connection = require('./config/connection');

async function getProducts(categoryId) {
    let results = [];
    let p = await productQuery(categoryId);
    for (let i = 0; i < p.products.length; i++) {
        let product = p.products[i];
        let { images } = await imageQuery(product.productID);
        
        let opt = await optionsOfProduct(product.productID);
        for(let j = 0; j < opt.options.length; j++){
            let option = opt.options[j]
            let { values } = await optionValues(option.optionID);
            option.values = values;
        }
        product.images = images;
        product.options = opt.options;
        results.push(product);
    }
    return results;
}


function productQuery(categoryId) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM products WHERE category = ?', [categoryId], (error, products, fields) => {
            if (error) return reject(error)
            resolve({ products, fields })
        })
    })
}
 
function imageQuery(productId) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT image FROM productimages WHERE productID = ?', [productId], (err, images, fields) => {
            if (err) return reject(err)
            resolve({ images, fields })
        })
    })
}

function optionsOfProduct(productId) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM optionsofproduct as op, productoptions as po WHERE op.productID = ? AND op.optionID = po.optionID', [productId],  (err, options, fields) => {
            if (err) return reject(err)
            resolve({ options, fields })
        })
    })
}

function optionValues(optionId) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM productoptionvalues WHERE optionID = ?', [optionId],  (err, values, fields) => {
            if (err) return reject(err)
            resolve({ values, fields })
        })
    })
}


module.exports = {
    getProducts : getProducts
};