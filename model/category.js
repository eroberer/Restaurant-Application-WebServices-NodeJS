const database = require('./config/connection');

async function getCategories(parentId) {
    let categories = await database.query({
        sql : 'SELECT categoryId, name, CONCAT(?,image) as image FROM categories WHERE parentID = ? ORDER BY sort ASC',
        values : [
            database.getImageHost("Categories/"),
            parentId
        ]
    });
    return categories.result;
}
 
module.exports = {
    getCategories : getCategories
};