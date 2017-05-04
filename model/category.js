const config = require('./config/connection');
const connection = config.connection;

async function getCategories (parentId) {
    let {categories} = await categoryQuery(parentId);
    return categories;
}

function categoryQuery(parentId) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT categoryId, name, CONCAT(?,image) as image FROM categories WHERE parentID = ? ORDER BY sort ASC', [config.imageHost + "Categories/", parentId], (error, categories, fields) => {
            if (error) return reject(error)
            resolve({ categories, fields })
        })
    })
}
 
module.exports = {
    getCategories : getCategories
};