const express=require('express');
const { getLocations } = require('../Controllers/Location');
const { getMealTypes } = require('../Controllers/MealType');
const { getMenuItemsByResId } = require('../Controllers/MenuItem');
const { order, verify } = require('../Controllers/payment');
const router=express.Router()
const { getResturantsDetailsById, filterRestaurants, getRestaurantByLocId } = require('../Controllers/Resturants');




router.post('/filter',filterRestaurants)
router.get('/locations',getLocations)
router.get('/mealtypes',getMealTypes)
router.get('/restuarant/:resId',getResturantsDetailsById)
router.get('/menuitems/:resID', getMenuItemsByResId);
router.get('/restaurants/:locId',getRestaurantByLocId)



//Payment
router.post('/api/payment/orders',order);
router.post('/api/payment/verify',verify);








module.exports=router;