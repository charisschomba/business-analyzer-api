const {Router} = require("express");
const requireLogin = require("../middlewares/requireLoggin");
const {getItemsValue, getItemsQuantity, getTotalAmount} = require('../controllers');
const Order = require("../models/Order");
const OrderPayment = require("../models/OrderPayment");
const BillPayment = require("../models/BillPayment");
const Bill = require("../models/Bill");
const checkBusiness = require('../middlewares/checkUserBusiness');

const router = Router();
// processes top items produced in terms of value
router.get('/value', requireLogin, checkBusiness, async (req, res) => {
  const { days } = req.query;
  const data =  await getItemsValue({user: req.user._id, days});
  return res.status(200).json({ data, days });
})
// processes top items produced in terms of quantity
router.get('/quantity', requireLogin, checkBusiness, async (req, res) => {
  const { days } = req.query;
  const  data = await getItemsQuantity({user: req.user._id, days});
  return res.status(200).json({ data });
})

// processes  total incoming amount requests
router.get('/incoming-amount', requireLogin, checkBusiness, async (req, res) => {
  const { days } = req.query;
  const  [totalOrder] = await getTotalAmount({user: req.user._id, model: Order, days});
  const  [totalOrderPayments] = await getTotalAmount({user: req.user._id, model: OrderPayment, days});
  const businessName = totalOrder && totalOrder._id || totalOrderPayments && totalOrderPayments._id || "";
  const totalIncomingAmount = (totalOrder ? totalOrder.totalTransactionAmount : 0) -
    (totalOrderPayments ? totalOrderPayments.totalTransactionAmount: 0);
  return res.status(200).json({business: businessName, totalIncomingAmount});
})
// processes  total outgoing amount requests
router.get('/outgoing-amount', requireLogin, checkBusiness, async (req, res) => {
  const { days } = req.query;
  const  [totalBill] = await getTotalAmount({user: req.user._id, model: Bill, days});
  const  [totalBillPayments] = await getTotalAmount({user: req.user._id, model: BillPayment, days});
  const businessName = totalBill && totalBill._id || totalBillPayments && totalBillPayments._id || "";
  const totalOutgoingAmount = (totalBill ? totalBill.totalTransactionAmount: 0) -
    (totalBillPayments ? totalBillPayments.totalTransactionAmount : 0);
  return res.status(200).json({business: businessName, totalOutgoingAmount});
})

module.exports = router;
