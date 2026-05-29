// service to handle the logic for creating, reading, updating and deleting transactions

const Transaction = require("../models/Transaction");
// Create a new transaction
exports.createTransaction = async ({ title, amount, type, category, date }) => {
  const transaction = new Transaction({ title, amount, type, category, date });
  return await transaction.save();
};
// Get all transactions
exports.getTransactions = async ({ type, startDate, endDate } = {}) => {
  const query = {};

  if (type) {
    query.type = type;
  }

  if (startDate || endDate) {
    query.date = {};

    if (startDate) {
      query.date.$gte = new Date(startDate);
    }

    if (endDate) {
      query.date.$lte = new Date(endDate);
    }
  }

  return await Transaction.find(query).sort({ date: -1 });
};
// Update a transaction
exports.updateTransaction = async (id, { title, amount, type, category, date }) => {
    return await Transaction.findByIdAndUpdate(id, { title, amount, type, category, date }, { new: true });
};
// Delete a transaction
exports.deleteTransaction = async (id) => {
    return await Transaction.findByIdAndDelete(id);
};
