import { useState } from 'react'
import { loginUser, registerUser } from '../services/usersApi'

const STORAGE_KEY = 'expense-tracker-user'

const getStoredUser = () => {
	try {
		return JSON.parse(localStorage.getItem(STORAGE_KEY))
	} catch {
		return null
	}
}

export function useAuth() {
	const [user, setUser] = useState(getStoredUser)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState('')

	const persistUser = (nextUser) => {
		setUser(nextUser)
		localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
	}

	const signup = async (payload) => {
		setIsSubmitting(true)
		setError('')

		try {
			const nextUser = await registerUser(payload)
			persistUser(nextUser)
			return nextUser
		} catch (requestError) {
			setError(requestError.message)
			throw requestError
		} finally {
			setIsSubmitting(false)
		}
	}

	const login = async (payload) => {
		setIsSubmitting(true)
		setError('')

		try {
			const nextUser = await loginUser(payload)
			persistUser(nextUser)
			return nextUser
		} catch (requestError) {
			setError(requestError.message)
			throw requestError
		} finally {
			setIsSubmitting(false)
		}
	}

	const logout = () => {
		setUser(null)
		setError('')
		localStorage.removeItem(STORAGE_KEY)
	}

	return {
		user,
		isLoggedIn: Boolean(user),
		isSubmitting,
		error,
		login,
		signup,
		logout,
		clearError: () => setError(''),
	}
}
