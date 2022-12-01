const Items= require('../Models/MenuItem');

exports.getMenuItemsByResId = async(req, res) => {
    const { resID } = req.params;
    
    const items=await Items.find({ restaurantId: resID })
    console.log(items);
    res.status(200).json({
        items: items
    })
    
}