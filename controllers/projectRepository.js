const ProjectRepository = require('../models/projectRepository');
const User = require('../models/user');


const uploadProjectRepository =  async (req, res) => {
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
    const newProjectRepository= new ProjectRepository(req.body);
    const val= await newProjectRepository.save(); 
    console.log('val', val);
    // res.json(val);
    res.status(200).send({ message:  "ProjectRepository added successfully" });

  }


  const getProjectRepository = async (req, res) => {
    if(req.query!=null){
      console.log('req.query', req.query);
      const val = await ProjectRepository.find(req.query);
        // console.log('val', val);
        res.status(200).send({'ProjectRepository':val});
    }
    else{
    // console.log(req.query);

    const val = await ProjectRepository.find();
    // console.log('val', val);
    res.status(200).send({'ProjectRepository':val});
    }
    }

    // const getUniqueCategoryIndurstrialProjects = async (req, res) => {
    //   const val = await IndustrialProjects.find().distinct('category');
    //   // console.log('val', val);
    //   res.send({'allcategory':val});
    // }

  

  

  module.exports = {uploadProjectRepository, getProjectRepository};