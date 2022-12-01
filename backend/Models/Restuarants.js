const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: {
        type: String,
    
    },
    city_id: {
        type: Number,
     
    },
    location_id: {
        type: Number,
      
    },
    mealtype_id: {
        type: Number
    },
    min_price:{
        type: Number
    },
    cuisine_id: {
        type: Number,
    }

})

module.exports = mongoose.model('restaurantSample', restaurantSchema, 'restuarants');