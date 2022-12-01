const MealType = require("../Models/MealType")

exports.getMealTypes=async(req,res)=>{

    const mealtypes=await MealType.find({}).sort({mealtypeId:1})
    console.log(mealtypes);
    res.status(200).json({
        mealTypes:mealtypes
    })
}