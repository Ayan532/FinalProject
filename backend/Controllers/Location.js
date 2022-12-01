const Location = require("../Models/Location")

exports.getLocations=async(req,res)=>{


    const location =await Location.find({})

    res.status(200).json({
        Locations:location
    })
}