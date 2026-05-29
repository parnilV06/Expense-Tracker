import { useEffect, useState } from 'react'
import { createTransaction, fetchTransactions } from '../services/transactionsApi'
import { normalizeTransaction } from '../utils/transactionSummary'

export function useTransactions() {
	const [transactions, setTransactions] = useState([])
	const [status, setStatus] = useState('loading')
	const [error, setError] = useState('')
	const [isSaving, setIsSaving] = useState(false)
	const [saveError, setSaveError] = useState('')

	useEffect(() => {
		let isMounted = true

		async function loadTransactions() {
			try {
				setStatus('loading')
				const data = await fetchTransactions()

				if (isMounted) {
					setTransactions(Array.isArray(data) ? data.map(normalizeTransaction) : [])
					setStatus('success')
				}
			} catch (requestError) {
				if (isMounted) {
					setError(requestError.message)
					setStatus('error')
				}
			}
		}

		loadTransactions()

		return () => {
			isMounted = false
		}
	}, [])

	const addTransaction = async (payload) => {
		setIsSaving(true)
		setSaveError('')

		try {
			const createdTransaction = await createTransaction(payload)
			const normalizedTransaction = normalizeTransaction(createdTransaction)
			setTransactions((currentTransactions) => [normalizedTransaction, ...currentTransactions])
			return normalizedTransaction
		} catch (requestError) {
			setSaveError(requestError.message)
			throw requestError
		} finally {
			setIsSaving(false)
		}
	}

	return {
		transactions,
		isLoading: status === 'loading',
		error,
		isSaving,
		saveError,
		addTransaction,
		clearSaveError: () => setSaveError(''),
	}
}
