const API_BASE_URL = import.meta.env.VITE_API_URL || ''

async function requestUser(path, payload) {
	const response = await fetch(`${API_BASE_URL}/api/users/${path}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	})

	const data = await response.json().catch(() => ({}))

	if (!response.ok) {
		throw new Error(data.message || 'Unable to complete request')
	}

	return data
}

export const registerUser = (payload) => requestUser('register', payload)

export const loginUser = (payload) => requestUser('login', payload)
