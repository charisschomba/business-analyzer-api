const {Router} = require("express");
const businessSchema = require("../utils/validations/business");
const errorParser = require("../utils/handleValidationErrors");
const requireLogin = require("../middlewares/requireLoggin");
const Business = require("../models/Business");

const router = Router();
// handles creation of new business
router.post('/business', requireLogin, async(req, res) => {
  const {country, name, entity, countriesOfOperations, address} = req.body;
  const { error, value } = businessSchema.validate({ country, name, entity, countriesOfOperations, address });
  if (error) {
    const resErrors = errorParser(error);
    return res.status(401).json({errors: resErrors});
  }
  const businessExists = await Business.findOne({name});
  if(businessExists){
    return res.status(409).json({
      errors: {
        message: 'business has already been registered',
        context: {
          key: 'name'
        }
      }
    })
  }
  const business = new Business({...req.body, user:req.user})
  await business.save();
  return res.status(201).json({message: 'business created successfully'})
});

module.exports = router;
