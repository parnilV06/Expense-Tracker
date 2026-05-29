import {
	ArrowDownIcon,
	ArrowUpIcon,
	CardIcon,
	HomeIcon,
	LogoutIcon,
	ReceiptIcon,
	UserIcon,
	WalletIcon,
} from './icons'

export const navigationItems = [
	{ label: 'Dashboard', icon: HomeIcon, active: true, action: 'dashboard' },
	{ label: 'Add Expense', icon: ReceiptIcon, action: 'add-expense' },
	{ label: 'Add Income', icon: WalletIcon, action: 'add-income' },
]

export const footerItems = [
	{ label: 'Account', icon: UserIcon },
	{ label: 'Logout', icon: LogoutIcon },
]

export const summaryCards = [
	{
		key: 'income',
		title: 'Total Income',
		accentClass: 'income',
		icon: ArrowDownIcon,
	},
	{
		key: 'expense',
		title: 'Total Expense',
		accentClass: 'expense',
		icon: ArrowUpIcon,
	},
	{
		key: 'balance',
		title: 'Available Balance',
		accentClass: 'balance',
		icon: CardIcon,
	},
]
