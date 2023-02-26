const Internship = require('../models/internship');
const { find } = require('../models/user');
const User = require('../models/user');
const addInternship =  async (req, res) => {
    // {
    //     "companyName":"Plushvie",
    //     "companyId":"63567fjdbvjfbjg",
    //     "briefDescription":"Description",
    //     "location":"location",
    //     "duration":"duration",
    //     "stipend":"0",
    //     "skillsRequired":"mongo skill",
    //     "numberOfOpenings":"5",
    //     "lastDateToApply":"22jan 2024",
    //     "contactDetails":"54545465456",
    //     "status":"active",
    //     "dateOfUpdation":"52 jan",
    //     "paidOrUnpaid":"paid",
    //     "typeOfInternship":"type of internship",
    //     "category":"marketing",
    //     "rolesAndResponsibilities":"roles and resposibility",
    //     "perks":"perks",
    //     "whoCanApply":"who can apply",
    //     "totalNumberOfApplicants":"42",
    //     "criteriaForSelection":"criteria"
    // }
    console.log('req.body', req.body);
    const newInternship= new Internship(req.body);
    const val= await newInternship.save(); 
    console.log('val', val);
    // res.json(val);
    res.send({ message:  "Internship added successfully" });

  }


  const getInternship = async (req, res) => {
    console.log('req.query length', Object.keys(req.query).length);
    if(Object.keys(req.query).length > 0){
      console.log('req.query', req.query);
      // find the internship with the given query  and less than the given stipend
      // covert req.query.stipend to integer and then compare it with stipend
      const val = await Internship.find(req.query).where('stipend').gte(parseInt(req.query.stipend));

      
         console.log('val', val);
        res.send({'allinternship':val});
    }
    else{
      console.log('req.query');
    // console.log(req.query);

    const val = await Internship.find();
    // console.log('val', val);
    res.send({'allinternship':val});
    }
    }

    const GetspecinternshipDetail = async (req, res) => {
      console.log('req.query..', req.query);
      // find a record whose _id is equal to req.query.id
      const val=await Internship.find({_id:req.query.id})
      
      // console.log('val', val);
      res.send({'specInternship':val});
    }

    const Getuniquecategory = async (req, res) => {
      const val = await Internship.find().distinct('category');
      // console.log('val', val);
      res.send({'allcategory':val});
    }

    const Getuniquelocation= async (req, res) => {
      const val = await Internship.find().distinct('location');
      // console.log('val', val);
      res.send({'alllocation':val});
    }

const applyForInternship = async (req, res) => {
  var id = req.body.userId;
  console.log('req.body', req.body);
  // userId: req.body.userId,
  // internshipId: req.body.internshipId,
  const existingUser = await User.findById(id);
  if (!existingUser) {
      return res.status(400).send({ error: 'No user available.' });
  }
  const InternshipData = {
    internships: req.body.internshipId,
  }

  User.findOneAndUpdate({ _id: id }, { $push: InternshipData }, (err, existingUser) => {
    if (!err){
      res.send({ message:  "Internship applied successfully" });
    }
    else{
      res.send({ message:  "Internship not applied" });
    }

});



}

  

  module.exports = {addInternship , getInternship, Getuniquecategory, applyForInternship,Getuniquelocation,GetspecinternshipDetail};