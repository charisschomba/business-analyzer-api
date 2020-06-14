import {Router} from "express";

import requireLogin from "../middlewares/requireLoggin";
import {getItemsValue, getItemsQuantity, getTotalAmount} from '../controllers'
import Order from "../models/Order";
import OrderPayment from "../models/OrderPayment";
import BillPayment from "../models/BillPayment";
import Bill from "../models/Bill";

const router = Router();

router.get('/value', requireLogin,  async (req, res) => {
  const { days } = req.query;
  const data =  await getItemsValue({user: req.user._id, days});
  return res.status(200).json({ data, days });
})

router.get('/quantity', requireLogin, async (req, res) => {
  const { days } = req.query;
  const  data = await getItemsQuantity({user: req.user._id, days});
  return res.status(200).json({ data });
})

router.get('/incoming-amount', requireLogin, async (req, res) => {
  const { days } = req.query;
  const  [totalOrder] = await getTotalAmount({user: req.user._id, model: Order, days});
  const  [totalOrderPayments] = await getTotalAmount({user: req.user._id, model: OrderPayment, days});
  const totalIncomingAmount = (totalOrder ? totalOrder.totalTransactionAmount : 0) -
    (totalOrderPayments ? totalOrderPayments.totalTransactionAmount: 0);
  return res.status(200).json({business: totalOrder._id, totalIncomingAmount});
})

router.get('/outgoing-amount', requireLogin, async (req, res) => {
  const { days } = req.query;
  const  [totalBill] = await getTotalAmount({user: req.user._id, model: Bill, days});
  const  [totalBillPayments] = await getTotalAmount({user: req.user._id, model: BillPayment, days});
  const totalOutgoingAmount = (totalBill ? totalBill.totalTransactionAmount: 0) -
    (totalBillPayments ? totalBillPayments.totalTransactionAmount : 0);
  return res.status(200).json({business: totalBill._id, totalOutgoingAmount});
})

export default router;
