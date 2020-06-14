const {Router} = require("express");
const requireLogin = require("../middlewares/requireLoggin");
const processUpload = require("../middlewares/processUpload");
const checkBusiness = require("../middlewares/checkUserBusiness")
const parseCsv = require("../utils/parseCsv");
const {validateCsvData} = require('../utils/validations/validateCsvFile');

const router = Router();
//handles csv upload requests
router.post('/upload', requireLogin, checkBusiness, processUpload, parseCsv, validateCsvData, async (req, res) => {
  return res.
  status(200).
  json({message: 'file uploaded to successfully'})
});

module.exports = router;
