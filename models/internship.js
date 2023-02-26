

const mongoose=require('mongoose');

const internshipScheme=new mongoose.Schema({
    companyName:{type:String,required:true},
    companyId:{type:String,required:true},
    position:{type:String,required:true},
    briefDescription:{type:String,required:true},
    location:{type:String,required:true},
    duration:{type:String,required:true},
    stipend:{type:String,required:true},
    skillsRequired:{type:String,required:true},
    numberOfOpenings:{type:Number,required:true},
    dateOfPosting:{type:Date,required:true,default:Date.now()},
    lastDateToApply:{type:Date,required:true},
    contactDetails:{type:String,required:true},
    status:{type:String,required:true},
    dateOfCreation:{type:Date,required:true,default:Date.now()},
    dateOfUpdation:{type:Date,default:null},
    paidOrUnpaid:{type:String,required:true},
    typeOfInternship:{type:String,required:true},
    category:{type:String,required:true},
    rolesAndResponsibilities:{type:String,required:true},
    perks:{type:String,required:true},
    whoCanApply:{type:String,required:true},
    totalNumberOfApplicants:{type:Number,required:true},
    criteriaForSelection:{type:String,required:true}


});
module.exports=mongoose.model("Internship",internshipScheme);





