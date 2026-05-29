// define basic transaction routes for the server to use in server.js , there should be a create , read, update and delete route for transactions
const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const {
  createTransaction,
  getTransactions,
  getExpenseCategoryReport,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transaction.controller");

// @route   POST /api/transactions
// @desc    Create a new transaction
// @access  
router.post("/", createTransaction); 

// @route   GET /api/transactions
// @desc    Get all transactions
// @access  
router.get("/", getTransactions);

// @route   GET /api/transactions/reports/categories
// @desc    Get expense category totals and percentages
// @access
router.get("/reports/categories", getExpenseCategoryReport);

// @route   PUT /api/transactions/:id
// @desc    Update a transaction
// @access  
router.put("/:id", updateTransaction);

// @route   DELETE /api/transactions/:id
// @desc    Delete a transaction
// @access  
router.delete("/:id", deleteTransaction);

module.exports = router;
