const sellProduct = require('../models/sellProduct');
const User = require('../models/user');


const sellproduct = async (req, res) => {
  // Product Title
  // category
  // sub-Category
  // Tag
  // Location
  // date when you buy
  // condition rating out of 5
  // Price
  // note
  // photos

  var product_id;
  console.log('req.body', req.body);
  const newsellProduct = new sellProduct(req.body);
  // const val = await newsellProduct.save();
  
  await newsellProduct.save((err, newsellProduct) => {
    if (err) {
      return res.status(400).json({
        error: err.message
      });
    }
    // product._id is the product ID
    product_id = newsellProduct._id;
  });
  // get product Id from database
  

  var userId = req.body.userId;

  // userId: req.body.userId,
  // internshipId: req.body.internshipId,
  const existingUser = await User.findById(userId);
  if (!existingUser) {
    return res.status(400).send({ error: 'No user available.' });
  }
  const sellProductData = {
    sellProducts: product_id,
  }

  User.findOneAndUpdate({ _id: userId }, { $push: sellProductData }, (err, existingUser) => {
    if (!err) {
      res.send({ message: "Your product is uploaded. wait for confirmationh" });
    }
    else {
      res.send({ message: "Your product is not uploaded.." });
    }

  });




}

const getProducts = async (req, res) => {
  if (req.query != null) {
    console.log('req.query', req.query);
    const val = await sellProduct.find(req.query);
    // console.log('val', val);
    res.send({ 'products': val });
  }
  else {
    // console.log(req.query);

    const val = await sellProduct.find();
    // console.log('val', val);
    res.send({ 'products': val });
  }
}

const setSold = async (req, res) => {
  var product_id = req.body.productId;
  var userId = req.body.userId;
  console.log('req.body', req.body);
  //  find the product from database by product id
  const existingProduct = await sellProduct.findById(product_id);
  console.log('existingProduct', existingProduct);
  if (!existingProduct) {
    return res.status(400).send({ error: 'No product available.' });
  }
  const sellProductData = {
    sold: true,
    buyerEmail: req.body.buyerEmail,
  }

  console.log('sellProductData', sellProductData);
  try {
    await sellProduct.findOneAndUpdate({ _id: product_id },sellProductData);
    res.send({ message: "Your product is sold" });
  } catch (err) {
    res.send({ message: "Your product is not sold" });
  }
}







module.exports = { sellproduct , getProducts, setSold};