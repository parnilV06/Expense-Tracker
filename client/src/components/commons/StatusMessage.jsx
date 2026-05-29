function StatusMessage({ title, message }) {
	return (
		<section className="status-panel" aria-live="polite">
			<h2>{title}</h2>
			<p>{message}</p>
		</section>
	)
}

export default StatusMessage
