const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const locationSchema = new Schema({
    location: {
        type: String,
     
    },
    locationId:{
        type:Number,
        
    }
})

module.exports = mongoose.model('sample', locationSchema, 'locations');