const mongoose=require("mongoose")
const shortid=require("shortid")
const bankSchema= new mongoose.Schema({
    _id: {
        type: String,
        default: () => `BAN-${shortid.generate()}`
    },
    bank:{
        type:String,
        required:true
    },
    rateOfInterest:{
        type:Number,
        required:true
    },
    processingFee:{
        type:Number,
        required:true,

    },
    loanPeriod:{
        type:Number,
        required:true

    }
    
})
const banks=new mongoose.model("banks",bankSchema);
module.exports= {banks};