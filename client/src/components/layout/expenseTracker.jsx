import { useMemo } from 'react'
import { useState } from 'react'
import AuthModal from '../auth/AuthModal'
import TransactionModal from '../transactions/TransactionModal'
import Dashboard from './dashboard'
import Navbar from './navbar'
import StatusMessage from '../commons/StatusMessage'
import { footerItems, navigationItems } from '../commons/appConfig'
import { useAuth } from '../../hooks/useAuth'
import { useExpenseDashboardFilters } from '../../hooks/useExpenseDashboardFilters'
import { useTransactions } from '../../hooks/useTransactions'
import { getDashboardTotals } from '../../utils/transactionSummary'
import './expenseTracker.css'

function ExpenseTrackerLayout() {
	const [authMode, setAuthMode] = useState(null)
	const [transactionType, setTransactionType] = useState(null)
	const [expenseRange, setExpenseRange] = useState('allTime')
	const [reportRange, setReportRange] = useState('allTime')
	const [isAccountOpen, setIsAccountOpen] = useState(false)
	const auth = useAuth()
	const transactionsState = useTransactions()
	const { transactions, isLoading, error } = transactionsState
	const filterState = useExpenseDashboardFilters(expenseRange, reportRange)
	const totals = useMemo(() => getDashboardTotals(transactions), [transactions])

	const openAuthModal = (mode) => {
		auth.clearError()
		setIsAccountOpen(false)
		setAuthMode(mode)
	}

	const handleAuthSubmit = async (payload) => {
		if (authMode === 'signup') {
			await auth.signup(payload)
		} else {
			await auth.login(payload)
		}

		setAuthMode(null)
	}

	const handleLogout = () => {
		auth.logout()
		setIsAccountOpen(false)
	}

	const openTransactionModal = (type) => {
		transactionsState.clearSaveError()
		setIsAccountOpen(false)
		setTransactionType(type)
	}

	const handleTransactionSubmit = async (payload) => {
		await transactionsState.addTransaction(payload)
		await filterState.refreshFilteredData()
		setTransactionType(null)
	}

	return (
		<main className="tracker-shell app-root">
			<Navbar
				navigationItems={navigationItems}
				footerItems={footerItems}
				user={auth.user}
				isLoggedIn={auth.isLoggedIn}
				isAccountOpen={isAccountOpen}
				onSignupClick={() => openAuthModal('signup')}
				onLoginClick={() => openAuthModal('login')}
				onLogoutClick={handleLogout}
				onAccountClick={() => setIsAccountOpen((isOpen) => !isOpen)}
				onAddTransactionClick={openTransactionModal}
			/>

			<section className="content-area">
				{isLoading ? (
					<StatusMessage title="Loading dashboard" message="Fetching your latest transactions from the API." />
				) : error ? (
					<StatusMessage title="Dashboard unavailable" message={error} />
				) : filterState.filterError ? (
					<StatusMessage title="Filters unavailable" message={filterState.filterError} />
				) : (
					<Dashboard
						totals={totals}
						recentExpenses={filterState.filteredExpenses}
						reportRows={filterState.report.categoryTotals}
						reportTotal={filterState.report.totalExpenseAmount}
						expenseRange={expenseRange}
						reportRange={reportRange}
						isFiltering={filterState.isFiltering}
						onExpenseRangeChange={setExpenseRange}
						onReportRangeChange={setReportRange}
					/>
				)}
			</section>

			{authMode ? (
				<AuthModal
					mode={authMode}
					isSubmitting={auth.isSubmitting}
					error={auth.error}
					onClose={() => setAuthMode(null)}
					onSubmit={handleAuthSubmit}
					onSwitchMode={() => openAuthModal(authMode === 'signup' ? 'login' : 'signup')}
				/>
			) : null}

			{transactionType ? (
				<TransactionModal
					type={transactionType}
					isSaving={transactionsState.isSaving}
					error={transactionsState.saveError}
					onClose={() => setTransactionType(null)}
					onSubmit={handleTransactionSubmit}
				/>
			) : null}
		</main>
	)
}

export default ExpenseTrackerLayout
