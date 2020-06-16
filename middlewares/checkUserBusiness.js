const { getBusiness } = require('../controllers')
const checkUserBusiness = async (req, res, next) => {
  const business = await getBusiness({user: req.user._id});
  if(!business) {
    return res.status(404).json({error: 'Register business first'});
  }
  next();
};
module.exports = checkUserBusiness;
