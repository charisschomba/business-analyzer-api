const {Router} = require("express");
const businessSchema = require("../utils/validations/business");
const errorParser = require("../utils/handleValidationErrors");
const requireLogin = require("../middlewares/requireLoggin");
const Business = require("../models/Business");
const User = require("../models/User");

const router = Router();
// handles creation of new business
router.post('/business', requireLogin, async(req, res) => {
  const {country, name, entity, countriesOfOperations, address, annualSales} = req.body;
  const { error, value } = businessSchema.validate({ country, name, entity, countriesOfOperations, address, annualSales });
  if (error) {
    const resErrors = errorParser(error);
    return res.status(401).json({errors: resErrors});
  }
  const businessExists = await Business.findOne({name});
  const userBusinessRegistered = await Business.findOne({user: req.user._id});

  if(userBusinessRegistered){
    return res.status(409).json({
      errors: {
        message: 'You have registered your business already',
        context: {
          key: 'name'
        }
      }
    })
  }

  if(businessExists){
    return res.status(409).json({
      errors: {
        message: 'Business name already taken',
        context: {
          key: 'name'
        }
      }
    })
  }
  try {
    const business = new Business({...req.body, user:req.user});
    await business.save();
    return res.status(201).json({message: 'business created successfully'});
  }catch (e) {
    return res.status(500).json({message: 'Something went wrong. Try again'});
  }
});

module.exports = router;
