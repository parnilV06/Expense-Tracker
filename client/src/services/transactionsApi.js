const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

const buildQueryString = (params = {}) => {
	const searchParams = new URLSearchParams()

	Object.entries(params).forEach(([key, value]) => {
		if (value) {
			searchParams.set(key, value)
		}
	})

	const queryString = searchParams.toString()
	return queryString ? `?${queryString}` : ''
}

export async function fetchTransactions(params = {}) {
	const response = await fetch(`${API_BASE_URL}/api/transactions${buildQueryString(params)}`)

	if (!response.ok) {
		throw new Error('Unable to load transactions')
	}

	return response.json()
}

export async function fetchExpenseCategoryReport(params = {}) {
	const response = await fetch(`${API_BASE_URL}/api/transactions/reports/categories${buildQueryString(params)}`)

	const data = await response.json().catch(() => ({}))

	if (!response.ok) {
		throw new Error(data.message || 'Unable to load spending report')
	}

	return data
}

export async function createTransaction(payload) {
	const response = await fetch(`${API_BASE_URL}/api/transactions`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	})

	const data = await response.json().catch(() => ({}))

	if (!response.ok) {
		throw new Error(data.message || 'Unable to save transaction')
	}

	return data
}
