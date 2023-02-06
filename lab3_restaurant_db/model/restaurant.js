const mongoose = require('mongoose')

const RestaurantSchema = new mongoose.Schema({
    address:{
        building:{
            type: Number,
            requried: true
        },
        street:{
            type:String,
            requried: true
        },
        zipcode:{
            type:Number,
            requried: true
        }
    },
    city:{
        type:String,
        required:true
    },
    cuisine:{
        type:String,
        required:true
    },
    name:{
        type:String, 
        required:true
    },
    restraunt_id:{
        type:Number,
        required:true
    }

})

const Restaurant = mongoose.model('Restaurant',RestaurantSchema)
module.exports = Restaurant