const {Router} = require("express");

const requireLogin = require("../middlewares/requireLoggin");
const processUpload = require("../middlewares/processUpload");

const router = Router();
//handles csv upload requests
router.post('/upload', requireLogin, processUpload, async (req, res) => {
  return res.
  status(200).
  json({message: 'file uploaded to successfully'})
});

module.exports = router;
