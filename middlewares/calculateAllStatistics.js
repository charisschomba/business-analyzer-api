const { getTotalAmount, getItemsValue, getItemsQuantity} = require("../controllers");
const Order = require("../models/Order");
const OrderPayment = require("../models/OrderPayment");
const BillPayment = require("../models/BillPayment");
const Bill = require("../models/Bill");

const calculateAllStatistics = async (req, res, next) => {
  const { days } = req.query;
  // total incoming amount
  const  [totalOrder] = await getTotalAmount({user: req.user._id, model: Order, days});
  const  [totalOrderPayments] = await getTotalAmount({user: req.user._id, model: OrderPayment, days});
  const businessName = totalOrder && totalOrder._id || totalOrderPayments && totalOrderPayments._id || "";
  const totalIncomingAmount = (totalOrder ? totalOrder.totalTransactionAmount : 0) -
    (totalOrderPayments ? totalOrderPayments.totalTransactionAmount: 0)

  // total outgoing amount
  const  [totalBill] = await getTotalAmount({user: req.user._id, model: Bill, days});
  const  [totalBillPayments] = await getTotalAmount({user: req.user._id, model: BillPayment, days});
  const totalOutgoingAmount = (totalBill ? totalBill.totalTransactionAmount: 0) -
    (totalBillPayments ? totalBillPayments.totalTransactionAmount : 0);

  // top items produced in terms of quantity
  const  quantity = await getItemsQuantity({user: req.user._id, days});

  // top items produced in terms of value
  const value =  await getItemsValue({user: req.user._id, days});
  return res.status(200).json({
    business: businessName,
    totalIncomingAmount,
    totalOutgoingAmount,
    quantity,
    value
  })
};
module.exports = calculateAllStatistics;
