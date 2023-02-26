const IndustrialProjects = require('../models/industrialProject');
const User = require('../models/user');
const uploadIndustrialProject =  async (req, res) => {
// -> company name
// -> company brief details
// -> post name
// -> paid / or unpaid status
// -> duration
// -> mode of work
// -> criteria
// -> location
// -> postcode
// -> roles and responsibilities
// -> Phone
// -> terms and conditions.
    console.log('req.body', req.body);
    const newIndustrialProjects= new IndustrialProjects(req.body);
    const val= await newIndustrialProjects.save(); 
    console.log('val', val);
    // res.json(val);
    res.status(200).send({message: "Industrial Project added successfully"});

  }


  const getIndustrialProjects = async (req, res) => {
    if(req.query!=null){
      console.log('req.query', req.query);
      const val = await IndustrialProjects.find(req.query);
        // console.log('val', val);
        res.status(200).send({'IndustrialProjects':val});
    }
    else{
    // console.log(req.query);

    const val = await IndustrialProjects.find();
    // console.log('val', val);
    res.status(200).send({'IndustrialProjects':val});
    }
    }

    // const getUniqueCategoryIndurstrialProjects = async (req, res) => {
    //   const val = await IndustrialProjects.find().distinct('category');
    //   // console.log('val', val);
    //   res.send({'allcategory':val});
    // }

    const applyForIndustrialProject = async (req, res) => {
      var id = req.body.userId;
      console.log('req.body', req.body);
      // userId: req.body.userId,
      // internshipId: req.body.internshipId,
      const existingUser = await User.findById(id);
      if (!existingUser) {
          return res.status(404).send({ error: 'No user available.' });
      }
      const industrialProjectData = {
        industrialProjects: req.body.industrialProjectId,
      }
    
      User.findOneAndUpdate({ _id: id }, { $push: industrialProjectData }, (err, existingUser) => {
        if (!err){
          res.status(200).send({ message:  "Industrial Project applied successfully" });
        }
        else{
          res.status(400).send({ message:  "Industrial Project not applied" });
        }
    
    });
    }

  

  module.exports = {uploadIndustrialProject , getIndustrialProjects, applyForIndustrialProject};