const express = require('express');
const restaurantModel = require('../model/restaurant');
const app = express();

app.get('/restaurant', async (request, response) => {
  const restaurants = await restaurantModel.find({});
  try {
    response.status(200).send(restaurants);
  } catch (err) {
    response.status(500).send(err);
  }
});

app.get('/restaurants/cuisine/:cuisine', async (request,response)=>{
    const cuisine = request.params.cuisine
    const restaurants = await restaurantModel.find({cuisine: cuisine});

    try {
        if(restaurants.length != 0){
          response.send(restaurants);
        }else{
          response.send(JSON.stringify({status:false, message: "No data found"}))
        }
    } catch (err) {
      response.status(500).send(err);
    }
});

app.get('/restaurants', async (request, response) => {
  const sortBy = request.query.sortBy;
  const restaurants = await restaurantModel.find({}).select("id restaurant_id cuisine name city").sort({'restaurant_id': sortBy});   
  try {
    if(restaurants.length != 0){
      response.send(restaurants);
    }else{
      response.send(JSON.stringify({status:false, message: "No data found"}))
    }
  } catch (err) {
    response.status(500).send(err);
  }
});

app.get('/restaurants/:cuisine/:city', async(request,res)=>{
    const cuisine = request.params.cuisine
    const city = request.params.city

    const restaurants = await restaurantModel.find({cuisine: cuisine}).where("city").ne(city).select("cuisine name city").sort({'name': 'asc'});    
    try {
      response.send(restaurants);
      } catch (err) {
        response.status(500).send(err);
      }
})

app.post('/restaurant', async (request, response) => {
  console.log(request.body);
  const restaurant = new restaurantModel(request.body);
  try{
    await restaurant.save((err)=>{
      if(err){
        response.status(500).send(err);
      }else{
        response.send(response)
      }
    });
  }catch(err){
    response.status(500).send(err);
}
});

module.exports = app
