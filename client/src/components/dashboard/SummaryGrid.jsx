import { summaryCards } from '../commons/appConfig'
import SummaryCard from './SummaryCard'

function SummaryGrid({ totals }) {
	return (
		<section className="summary-grid" aria-label="Financial summary">
			{summaryCards.map((card) => (
				<SummaryCard key={card.key} card={card} value={totals[card.key]} />
			))}
		</section>
	)
}

export default SummaryGrid
