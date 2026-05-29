import { ChevronDownIcon } from '../commons/icons'
import { formatCurrency } from '../../utils/formatters'
import { dateRangeOptions } from '../../utils/dateRanges'

function SpendingReport({ totalExpense, reportRows, selectedRange, onRangeChange, isFiltering }) {
	return (
		<section className="panel report-panel" aria-label="Spending report">
			<div className="panel-header">
				<h2>Spending Report</h2>
				<label className="range-select">
					<span className="sr-only">Report time range</span>
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

			<div className="report-total">
				<span>Total Expense</span>
				<strong>{formatCurrency(totalExpense)}</strong>
			</div>

			<div className="table-wrap report-table-wrap">
				<table>
					<thead>
						<tr>
							<th>Category</th>
							<th>Amount</th>
							<th>Percentage</th>
						</tr>
					</thead>
					<tbody>
						{reportRows.map((row) => (
							<tr key={row.category}>
								<td>
									<span className="category-cell">
										<span className="category-dot" aria-hidden="true" />
										{row.category}
									</span>
								</td>
								<td>{formatCurrency(row.amount)}</td>
								<td>{row.percentage}%</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{reportRows.length === 0 ? <p className="empty-text">No spending data available.</p> : null}
		</section>
	)
}

export default SpendingReport
