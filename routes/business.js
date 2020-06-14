import businessSchema from "../utils/validations/business";
import errorParser from "../utils/handleValidationErrors";
import requireLogin from "../middlewares/requireLoggin";
import Business from "../models/Business";
import {Router} from "express";

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

export default router;
