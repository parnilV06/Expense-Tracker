require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 3000;  

// Connect to MongoDB
connectDB();

app.get('/', (req, res) => {
  res.send('Welcome to the Expense Tracker API!');
});
// mount the transaction routes and user routes
app.use('/api/transactions', require('./routes/transaction.route'));
app.use('/api/users', require('./routes/user.routes'));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
