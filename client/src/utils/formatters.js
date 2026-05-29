export const formatCurrency = (value = 0) =>
	new Intl.NumberFormat('en-IN', {
		style: 'currency',
		currency: 'INR',
		minimumFractionDigits: 2,
	}).format(Number(value) || 0)

export const formatDate = (value) => {
	if (!value) {
		return 'No date'
	}

	return new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		hour: 'numeric',
		minute: '2-digit',
	}).format(new Date(value))
}
