const byNewestDate = (a, b) => new Date(b.date || 0) - new Date(a.date || 0)

export const normalizeTransaction = (transaction) => ({
	id: transaction._id || transaction.id,
	title: transaction.title || 'Untitled transaction',
	category: transaction.category || 'Uncategorized',
	amount: Number(transaction.amount) || 0,
	type: transaction.type,
	date: transaction.date,
})

export const getTransactionsByType = (transactions, type) =>
	transactions.filter((transaction) => transaction.type === type).sort(byNewestDate)

export const getDashboardTotals = (transactions) => {
	const income = getTransactionsByType(transactions, 'income').reduce((total, item) => total + item.amount, 0)
	const expense = getTransactionsByType(transactions, 'expense').reduce((total, item) => total + item.amount, 0)

	return {
		income,
		expense,
		balance: income - expense,
	}
}

export const getExpenseBreakdown = (expenses) => {
	const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0)
	const groupedExpenses = expenses.reduce((groups, expense) => {
		const category = expense.category || 'Uncategorized'
		groups.set(category, (groups.get(category) || 0) + expense.amount)
		return groups
	}, new Map())

	return Array.from(groupedExpenses.entries())
		.map(([category, amount]) => ({
			category,
			amount,
			percentage: totalExpense > 0 ? Number(((amount / totalExpense) * 100).toFixed(1)) : 0,
		}))
		.sort((a, b) => b.amount - a.amount)
}
