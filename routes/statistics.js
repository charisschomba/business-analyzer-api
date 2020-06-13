import {Router} from "express";
import moment from 'moment';

import Business from '../models/Business';
import requireLogin from "../middlewares/requireLoggin";
import Order from '../models/Order';

const router = Router();

router.get('/value', requireLogin,  async (req, res) => {

  const  business = await Business.findOne({user : req.user._id})

  const startDate = moment().add({ days: -30 });

  console.log(startDate.toLocaleString());

  const data = await Order.aggregate([
    { $match: { business: business._id,
      } },
    { $group: { _id: '$item', value: { $sum: { $multiply: ['$quantity', '$amount'] } } } },
    { $sort: { value: -1 } }
  ]).exec();
  res.json({ data, business: business, user: req.user._id, date: startDate.toLocaleString() });
})

router.get('/quantity', async (req, res) => {
  const data = await Order.aggregate([
    { $match: {} },
    { $group: { _id: '$item', value: { $sum: `$quantity` } } },
    { $sort: { value: -1 } }
  ]).exec();
  res.json({ data });
})

export default router;
