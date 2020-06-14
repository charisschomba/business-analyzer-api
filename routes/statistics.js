const {Router} = require("express");
const requireLogin = require("../middlewares/requireLoggin");
const {getItemsValue, getItemsQuantity, getTotalAmount} = require('../controllers');
const Order = require("../models/Order");
const OrderPayment = require("../models/OrderPayment");
const BillPayment = require("../models/BillPayment");
const Bill = require("../models/Bill");

const router = Router();
// processes top items produced in terms of value
router.get('/value', requireLogin,  async (req, res) => {
  const { days } = req.query;
  const data =  await getItemsValue({user: req.user._id, days});
  return res.status(200).json({ data, days });
})
// processes top items produced in terms of quantity
router.get('/quantity', requireLogin, async (req, res) => {
  const { days } = req.query;
  const  data = await getItemsQuantity({user: req.user._id, days});
  return res.status(200).json({ data });
})

// processes  total incoming amount requests
router.get('/incoming-amount', requireLogin, async (req, res) => {
  const { days } = req.query;
  const  [totalOrder] = await getTotalAmount({user: req.user._id, model: Order, days});
  const  [totalOrderPayments] = await getTotalAmount({user: req.user._id, model: OrderPayment, days});
  const totalIncomingAmount = (totalOrder ? totalOrder.totalTransactionAmount : 0) -
    (totalOrderPayments ? totalOrderPayments.totalTransactionAmount: 0);
  return res.status(200).json({business: totalOrder._id, totalIncomingAmount});
})
// processes  total outgoing amount requests
router.get('/outgoing-amount', requireLogin, async (req, res) => {
  const { days } = req.query;
  const  [totalBill] = await getTotalAmount({user: req.user._id, model: Bill, days});
  const  [totalBillPayments] = await getTotalAmount({user: req.user._id, model: BillPayment, days});
  const totalOutgoingAmount = (totalBill ? totalBill.totalTransactionAmount: 0) -
    (totalBillPayments ? totalBillPayments.totalTransactionAmount : 0);
  return res.status(200).json({business: totalBill._id, totalOutgoingAmount});
})

module.exports = router;
