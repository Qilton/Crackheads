const alert=require("../models/Alert");


const getAlerts = async (req, res) => { 
    try {
        const alerts = await alert.find({}).populate('userId', 'name pfp');
        res.status(200).json(alerts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports={getAlerts}