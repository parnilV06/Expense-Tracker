function IconBase({ children, className = '', title }) {
	return (
		<span className={`icon ${className}`} aria-hidden={title ? undefined : true} title={title}>
			{children}
		</span>
	)
}

export function WalletIcon(props) {
	return (
		<IconBase {...props}>
			<svg viewBox="0 0 24 24" fill="none">
				<path d="M4 7.75A2.75 2.75 0 0 1 6.75 5h11.5A1.75 1.75 0 0 1 20 6.75v1.5" />
				<path d="M4 7.75v9.5A2.75 2.75 0 0 0 6.75 20h12.5A1.75 1.75 0 0 0 21 18.25v-7.5A1.75 1.75 0 0 0 19.25 9H6.75A2.75 2.75 0 0 1 4 7.75Z" />
				<path d="M17 14.5h.01" />
			</svg>
		</IconBase>
	)
}

export function ReceiptIcon(props) {
	return (
		<IconBase {...props}>
			<svg viewBox="0 0 24 24" fill="none">
				<path d="M7 3h10a2 2 0 0 1 2 2v16l-3-2-2 2-2-2-2 2-2-2-3 2V5a2 2 0 0 1 2-2Z" />
				<path d="M9 8h6" />
				<path d="M9 12h6" />
				<path d="M9 16h3" />
			</svg>
		</IconBase>
	)
}

export function HomeIcon(props) {
	return (
		<IconBase {...props}>
			<svg viewBox="0 0 24 24" fill="none">
				<path d="m3 11 9-8 9 8" />
				<path d="M5 10v10h5v-6h4v6h5V10" />
			</svg>
		</IconBase>
	)
}

export function CardIcon(props) {
	return (
		<IconBase {...props}>
			<svg viewBox="0 0 24 24" fill="none">
				<path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5v-9Z" />
				<path d="M4 10h16" />
				<path d="M16 15h1.5" />
			</svg>
		</IconBase>
	)
}

export function UserIcon(props) {
	return (
		<IconBase {...props}>
			<svg viewBox="0 0 24 24" fill="none">
				<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
				<path d="M4 21a8 8 0 0 1 16 0" />
			</svg>
		</IconBase>
	)
}

export function LogoutIcon(props) {
	return (
		<IconBase {...props}>
			<svg viewBox="0 0 24 24" fill="none">
				<path d="M10 5H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4" />
				<path d="M15 7l5 5-5 5" />
				<path d="M20 12H9" />
			</svg>
		</IconBase>
	)
}

export function ArrowDownIcon(props) {
	return (
		<IconBase {...props}>
			<svg viewBox="0 0 24 24" fill="none">
				<path d="M12 4v16" />
				<path d="m5 13 7 7 7-7" />
			</svg>
		</IconBase>
	)
}

export function ArrowUpIcon(props) {
	return (
		<IconBase {...props}>
			<svg viewBox="0 0 24 24" fill="none">
				<path d="M12 20V4" />
				<path d="m5 11 7-7 7 7" />
			</svg>
		</IconBase>
	)
}

export function ChevronDownIcon(props) {
	return (
		<IconBase {...props}>
			<svg viewBox="0 0 24 24" fill="none">
				<path d="m6 9 6 6 6-6" />
			</svg>
		</IconBase>
	)
}

export function CategoryIcon({ category }) {
	const label = String(category || '').toLowerCase()

	if (label.includes('food') || label.includes('dining')) {
		return (
			<IconBase className="category-icon">
				<svg viewBox="0 0 24 24" fill="none">
					<path d="M7 3v8" />
					<path d="M10 3v8" />
					<path d="M5 3v6a3.5 3.5 0 0 0 7 0V3" />
					<path d="M17 3v18" />
					<path d="M17 3c2.5 2.2 3.2 5.2 2.2 8H17" />
				</svg>
			</IconBase>
		)
	}

	if (label.includes('transport') || label.includes('ride') || label.includes('travel')) {
		return (
			<IconBase className="category-icon">
				<svg viewBox="0 0 24 24" fill="none">
					<path d="M5 13 7 7.5A2.4 2.4 0 0 1 9.25 6h5.5A2.4 2.4 0 0 1 17 7.5l2 5.5" />
					<path d="M5 13h14v5H5v-5Z" />
					<path d="M7 18v2" />
					<path d="M17 18v2" />
					<path d="M8 15.5h.01" />
					<path d="M16 15.5h.01" />
				</svg>
			</IconBase>
		)
	}

	if (label.includes('shopping') || label.includes('store')) {
		return (
			<IconBase className="category-icon">
				<svg viewBox="0 0 24 24" fill="none">
					<path d="M6 8h12l-1 12H7L6 8Z" />
					<path d="M9 8a3 3 0 0 1 6 0" />
				</svg>
			</IconBase>
		)
	}

	if (label.includes('bill') || label.includes('util')) {
		return (
			<IconBase className="category-icon">
				<svg viewBox="0 0 24 24" fill="none">
					<path d="m13 2-7 12h6l-1 8 7-12h-6l1-8Z" />
				</svg>
			</IconBase>
		)
	}

	return (
		<IconBase className="category-icon">
			<svg viewBox="0 0 24 24" fill="none">
				<path d="M4 8h16v8H4V8Z" />
				<path d="m7 8 2-3h6l2 3" />
				<path d="m7 16-2 3h14l-2-3" />
			</svg>
		</IconBase>
	)
}
