"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Payments", [
      {
        paymentCode: "cash",
        paymentName: "cash",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        paymentCode: "credit_cards",
        paymentName: "Credit cards",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        paymentCode: "mobile",
        paymentName: "Mobile payments",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        paymentCode: "bank_transfer",
        paymentName: "Bank Transfers",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Payments", null, {});
  },
};
