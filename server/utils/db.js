const mongoose = require('mongoose');
require('dotenv').config()
const mongo_url = "mongodb+srv://koshalsain4:yBMmLfPaF6fARdxR@cluster0.6obqj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/crackheads";


mongoose.connect(mongo_url)
    .then(() => {
        console.log('MongoDB Connected...');
    }).catch((err) => {
        console.log('MongoDB Connection Error: ', err);
    })
