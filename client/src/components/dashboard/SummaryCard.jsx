import { formatCurrency } from '../../utils/formatters'

function SummaryCard({ card, value }) {
	const Icon = card.icon

	return (
		<article className="summary-card">
			<span className={`summary-icon ${card.accentClass}`}>
				<Icon />
			</span>
			<div className="summary-copy">
				<p className="summary-title">{card.title}</p>
				<p className={`summary-value ${card.accentClass}`}>{formatCurrency(value)}</p>
				<p className="summary-subtitle">All time</p>
			</div>
		</article>
	)
}

export default SummaryCard
