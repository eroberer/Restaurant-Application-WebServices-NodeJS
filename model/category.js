const connection = require('./config/connection');

async function getCategories (parentId) {
    let {categories} = await categoryQuery(parentId);
    return categories;
}

function categoryQuery(parentId) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM categories WHERE parentID = ?', [parentId], (error, categories, fields) => {
            if (error) return reject(error)
            resolve({ categories, fields })
        })
    })
}
 
module.exports = {
    getCategories : getCategories
};