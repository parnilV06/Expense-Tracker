// transaction controller to handle the logic for creating, reading, updating and deleting transactions

const Transaction = require("../models/Transaction");
const transactionService = require("../services/transaction.services");
const expenseAggregator = require("../aggregtor/expenseAggregtor");
const dateRangeService = require("../services/dateRange.service");
// Create a new transaction
exports.createTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, date } = req.body;
    const transaction = await transactionService.createTransaction({ title, amount, type, category, date });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// Get all transactions
exports.getTransactions = async (req, res) => {
  try {
    const { type, startDate, endDate, range } = req.query;
    const rangeFilter = dateRangeService.getDateRangeFilter(range);
    const transactions = await transactionService.getTransactions({
      type,
      startDate: startDate || rangeFilter.startDate,
      endDate: endDate || rangeFilter.endDate,
    });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// Get expense category report
exports.getExpenseCategoryReport = async (req, res) => {
  try {
    const { startDate, endDate, category, range } = req.query;
    const rangeFilter = dateRangeService.getDateRangeFilter(range);
    const report = await expenseAggregator.getExpenseCategoryReport({
      startDate: startDate || rangeFilter.startDate,
      endDate: endDate || rangeFilter.endDate,
      category,
    });
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// Update a transaction
exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, type, category, date } = req.body;
    const transaction = await transactionService.updateTransaction(id, { title, amount, type, category, date });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// Delete a transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await transactionService.deleteTransaction(id);
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
