// models/Transaction.js
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  category: { type: String }, // e.g. food, salary, travel
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", transactionSchema);