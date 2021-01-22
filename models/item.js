var db = require('../dbconnection');

var item={
 
    
    getAllitem:function(callback)
    {
     return db.query("SELECT * FROM item",callback);
    }
};
module.exports=item;