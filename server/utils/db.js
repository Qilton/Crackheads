const mongoose = require('mongoose');
require('dotenv').config()
const mongo_url = "mongodb+srv://swayambhalotia:9832900366@safespace.3g1ylme.mongodb.net/";


mongoose.connect(mongo_url)
    .then(() => {
        console.log('MongoDB Connected...');
    }).catch((err) => {
        console.log('MongoDB Connection Error: ', err);
    })
