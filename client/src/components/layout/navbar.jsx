function NavItem({ item, onClick }) {
	const Icon = item.icon

	return (
		<button type="button" className={`nav-item ${item.active ? 'active' : ''}`} onClick={onClick}>
			<span className="nav-icon">
				<Icon />
			</span>
			<span>{item.label}</span>
		</button>
	)
}

function Navbar({
	navigationItems,
	footerItems,
	user,
	isLoggedIn,
	isAccountOpen,
	onSignupClick,
	onLoginClick,
	onLogoutClick,
	onAccountClick,
	onAddTransactionClick,
}) {
	const [accountItem, authItem] = footerItems

	return (
		<aside className="sidebar">
			<div className="brand-block">
				<img className="brand-mark" src="/logo-main.png" alt="Expense Tracker logo" />
				<div className="brand-title">
					Expense<span>Tracker</span>
				</div>
			</div>

			<nav className="sidebar-nav" aria-label="Primary">
				{navigationItems.map((item) => (
					<NavItem
						key={item.label}
						item={item}
						onClick={() => {
							if (item.action === 'add-income') {
								onAddTransactionClick('income')
							}

							if (item.action === 'add-expense') {
								onAddTransactionClick('expense')
							}
						}}
					/>
				))}
			</nav>

			<div className="sidebar-footer" aria-label="Secondary">
				<div className="account-nav-wrap">
					<NavItem
						item={{
							...accountItem,
							label: isLoggedIn ? 'Account' : 'Signup',
						}}
						onClick={isLoggedIn ? onAccountClick : onSignupClick}
					/>

					{isLoggedIn && isAccountOpen ? (
						<div className="account-popover" role="status">
							<strong>{user.name}</strong>
							<span>{user.email}</span>
						</div>
					) : null}
				</div>

				<NavItem
					item={{
						...authItem,
						label: isLoggedIn ? 'Logout' : 'Login',
					}}
					onClick={isLoggedIn ? onLogoutClick : onLoginClick}
				/>
			</div>
		</aside>
	)
}

export default Navbar
