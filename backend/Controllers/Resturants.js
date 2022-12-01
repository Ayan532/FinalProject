
const Location = require('../Models/Location');
const MealType = require('../Models/MealType');
const Restuarants = require('../Models/Restuarants');


exports.filterRestaurants = async(req, res) => {
    let { location, cuisine, lcost, hcost, sort, page, mealtype } = req.body;
    

    
    const headerMealType=await MealType.find({mealtypeId:mealtype})
    let headerLocation;
    if(location)
    {
        headerLocation=await Location.find({locationId:location})
 

    }


    sort = sort ? sort : 1;
    page=page?Number(page):1
    console.log(page);

    const itemsPerPage = 2;
    let startIndex = (page * itemsPerPage) - itemsPerPage;
    let endIndex =( page * itemsPerPage);
    // let skip=itemsPerPage *(page-1);
    let filterObj = {};

    mealtype && (filterObj["mealtype_id"] = mealtype);
    location && (filterObj["location_id"] = location);
    cuisine && (filterObj["cuisine_id"] = { $in:cuisine});
    lcost && hcost && (filterObj["min_price"] = { $gte: lcost, $lte: hcost });

    console.log(filterObj);

    Restuarants.find(filterObj).sort({ min_price: sort })
   // .limit(itemsPerPage).skip(skip)
        .then(response => {
            // console.log(response);
            // console.log(response.length);
            const pageCountArr = [];
             const filteredResponse = response.slice(startIndex, endIndex);
            //  console.log(filteredResponse);
            // const filterDocument=filteredResponse.length;
            for (var i = 1; i <= Math.ceil(response.length/itemsPerPage); i++) {
                pageCountArr.push(i);
            }
            // console.log(pageCountArr);

            res.status(200).json({
                message: "Restaurants Fetched Succesfully",
                restaurants: filteredResponse,
                pageCountArr:pageCountArr,
                totalCount: response.length,
                headerMealType:headerMealType[0].mealtype,
                headerLocation:headerLocation?headerLocation[0].location:undefined



            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}


exports.getResturantsDetailsById=async(req,res)=>{
   
    try{

        const {resId}=req.params;
        
    
        const resturants=await Restuarants.findById(resId)
        console.log(resturants);
        res.status(200).json({
            Resturants:resturants
        })

    }
    catch(err){
        res.status(404).json({
            message:"Resturant Details Not Found"
        })
    }

}

exports.getRestaurantByLocId = (req, res) => {
    const { locId } = req.params;
    
    Restuarants.find({ city_id: locId }, {})
        .then(response => {
            res.status(200).json({
                message:"Restaurant Fetched Successfully", 
                restaurants: response 
            })        
        })
        .catch(err =>{
            res.status(500).json({ error: err })
        })
    
}