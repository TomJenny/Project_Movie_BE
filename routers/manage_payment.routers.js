const express = require("express");
const managePaymentRouters = express.Router();

const { RESPONSE_CODE } = require("../constants");
const validationMiddleware = require("../middlewares/validation.middleware");
const { authenticateToken } = require("../middlewares/verify-token.middleware");
const roleSchemas = require("../validations/role.validation");
const paymentCtr = require("../controllers/payment.controllers");

managePaymentRouters.get(
  "/",
  authenticateToken,
  validationMiddleware(roleSchemas.authorRoleAdmin, "user"),
  async (req, res) => {
    try {
      const paymentList = await paymentCtr.getPaymentList();
      res.send(paymentList).status(200);
    } catch (error) {
      res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).send(error);
    }
  }
);

module.exports = {
  managePaymentRouters,
};
