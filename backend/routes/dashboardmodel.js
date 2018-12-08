const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// const userimport = require('./usermodel')

const user_dashboard = new Schema({
    Status:String,
    Title:String,
    Reporter:String,
    Date:Date

})

module.exports = mongoose.model('userdashboard',user_dashboard)