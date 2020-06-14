import {Router} from "express";

import requireLogin from "../middlewares/requireLoggin";
import processUpload from "../middlewares/processUpload";

const router = Router();
//handles csv upload requests
router.post('/upload', requireLogin, processUpload, async (req, res) => {
  return res.
  status(200).
  json({message: 'file uploaded to successfully'})
});

export default router;
