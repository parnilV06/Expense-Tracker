import { CategoryIcon, ChevronDownIcon } from '../commons/icons'
import { formatCurrency, formatDate } from '../../utils/formatters'
import { dateRangeOptions } from '../../utils/dateRanges'

function RecentExpenses({ expenses, selectedRange, onRangeChange, isFiltering }) {
	return (
		<section className="panel expenses-panel" aria-label="Recent expenses">
			<div className="panel-header">
				<h2>Recent Expenses</h2>
				<label className="range-select">
					<span className="sr-only">Expense time range</span>
					<select value={selectedRange} onChange={(event) => onRangeChange(event.target.value)} disabled={isFiltering}>
						{dateRangeOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
					<ChevronDownIcon />
				</label>
			</div>

			<div className="table-wrap">
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Category</th>
							<th>Amount</th>
							<th>Date</th>
						</tr>
					</thead>
					<tbody>
						{expenses.map((expense) => (
							<tr key={expense.id}>
								<td>
									<span className="transaction-name">
										<CategoryIcon category={expense.category} />
										<span>{expense.title}</span>
									</span>
								</td>
								<td>
									<span className="category-cell">
										<span className="category-dot" aria-hidden="true" />
										{expense.category}
									</span>
								</td>
								<td className="amount-text expense">{formatCurrency(expense.amount)}</td>
								<td>{formatDate(expense.date)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{expenses.length === 0 ? <p className="empty-text">No expenses found.</p> : null}
		</section>
	)
}

export default RecentExpenses
