import RecentExpenses from '../dashboard/RecentExpenses'
import SpendingReport from '../dashboard/SpendingReport'
import SummaryGrid from '../dashboard/SummaryGrid'

function Dashboard({
	totals,
	recentExpenses,
	reportRows,
	reportTotal,
	expenseRange,
	reportRange,
	isFiltering,
	onExpenseRangeChange,
	onReportRangeChange,
}) {
	return (
		<section className="dashboard">
			<SummaryGrid totals={totals} />

			<section className="dashboard-grid">
				<RecentExpenses
					expenses={recentExpenses}
					selectedRange={expenseRange}
					onRangeChange={onExpenseRangeChange}
					isFiltering={isFiltering}
				/>
				<SpendingReport
					totalExpense={reportTotal}
					reportRows={reportRows}
					selectedRange={reportRange}
					onRangeChange={onReportRangeChange}
					isFiltering={isFiltering}
				/>
			</section>
		</section>
	)
}

export default Dashboard
