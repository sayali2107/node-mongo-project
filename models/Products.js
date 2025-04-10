const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
   productName:{type:String,require:true,unique:true},
   productPrice:{type:String,require:true},
   productUnit:{type:String,require:true},
   productDescription:{type:String,require:true}
});
module.exports = mongoose.model('Products', userSchema);