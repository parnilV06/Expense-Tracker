import { useCallback, useEffect, useState } from 'react'
import { fetchExpenseCategoryReport, fetchTransactions } from '../services/transactionsApi'
import { normalizeTransaction } from '../utils/transactionSummary'

const normalizeReport = (report) => ({
	totalExpenseAmount: Number(report.totalExpenseAmount) || 0,
	categoryTotals: Array.isArray(report.categoryTotals)
		? report.categoryTotals.map((row) => ({
				category: row.category,
				amount: Number(row.amount) || 0,
				percentage: Number(row.percent) || 0,
			}))
		: [],
})

export function useExpenseDashboardFilters(expenseRange, reportRange) {
	const [filteredExpenses, setFilteredExpenses] = useState([])
	const [report, setReport] = useState({ totalExpenseAmount: 0, categoryTotals: [] })
	const [isFiltering, setIsFiltering] = useState(false)
	const [filterError, setFilterError] = useState('')

	const loadFilteredData = useCallback(async () => {
		setIsFiltering(true)
		setFilterError('')

		try {
			const [expenseData, reportData] = await Promise.all([
				fetchTransactions({
					type: 'expense',
					range: expenseRange,
				}),
				fetchExpenseCategoryReport({ range: reportRange }),
			])

			setFilteredExpenses(Array.isArray(expenseData) ? expenseData.map(normalizeTransaction) : [])
			setReport(normalizeReport(reportData))
		} catch (requestError) {
			setFilterError(requestError.message)
		} finally {
			setIsFiltering(false)
		}
	}, [expenseRange, reportRange])

	useEffect(() => {
		const timeoutId = window.setTimeout(loadFilteredData, 0)

		return () => {
			window.clearTimeout(timeoutId)
		}
	}, [loadFilteredData])

	return {
		filteredExpenses,
		report,
		isFiltering,
		filterError,
		refreshFilteredData: loadFilteredData,
	}
}
