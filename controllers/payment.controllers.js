const { Payment } = require("../models");

const getPaymentList = () => {
  return Payment.findAll({
    attributes: {
      exclude: ["id", "createdAt", "updatedAt"],
    },
  });
};

const getPaymentByPaymentCode = (paymentCode) => {
  return Payment.findOne({
    where: { paymentCode },
  });
};
module.exports = {
  getPaymentList,
  getPaymentByPaymentCode,
};
