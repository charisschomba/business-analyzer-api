const moment = require("moment");

const Business = require("../models/Business");
const Order = require("../models/Order");

// gets a single business using logged in user
const getBusiness = async ({user}) => {
  return Business.findOne({user});
}

/**
 * Gets top items produced, in terms of value produced,
 *
 * @param user
 * @param days
 */

const getItemsValue = async ({user, days = 30}) => {
  const business = await getBusiness({user});
  const startDate = moment().subtract(days, 'days');
  return Order.aggregate([
      {
        $match: {
          business: business._id,
          transactionDate: {$gte: new Date(startDate)}
        }
      },
      {$group: {_id: '$item', value: {$sum: {$multiply: ['$quantity', '$amount']}}}},
      {$sort: {value: -1}},
      {$limit: 5}
    ]).exec();
}
/**
 * Gets top items produced, in terms of quantity produced,
 *
 * @param user
 * @param days
 */
const getItemsQuantity = async ({user, days = 30}) => {
  const business = await getBusiness({user});
  const startDate = moment().subtract(days, 'days');
  return Order.aggregate([
    { $match: {
        business: business._id,
        transactionDate: {$gte: new Date(startDate)}
      }},
    { $group: { _id: '$item', quantity: { $sum: `$quantity` } } },
    { $sort: { quantity: -1 } }
    ,
    {
      $limit:  5
    }
  ]).exec();
}
/**
 * Gets total amount transactions
 *
 * @param user
 * @param days
 */
const getTotalAmount = async ({user, model, days = 30}) => {
  // console.log(user)
  const business = await getBusiness({user});
  // console.log(business)
  const startDate = moment().subtract(days, 'days');
  return  model.aggregate([
    { $match: {
        business: business._id,
        transactionDate: {$gte: new Date(startDate)}
      }},
    { $group: {
      _id: `${business.name}`,
       totalTransactionAmount: { $sum: `$transactionAmount` }
      },
    }
  ]).exec();
}

module.exports = {
  getTotalAmount,
  getItemsQuantity,
  getBusiness,
  getItemsValue
}
