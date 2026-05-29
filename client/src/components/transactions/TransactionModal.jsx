import { useState } from 'react'

const getCurrentDateTimeValue = () => {
	const now = new Date()
	const timezoneOffset = now.getTimezoneOffset() * 60000
	return new Date(now.getTime() - timezoneOffset).toISOString().slice(0, 16)
}

const getInitialFormState = () => ({
	title: '',
	amount: '',
	category: '',
	date: getCurrentDateTimeValue(),
})

function TransactionModal({ type, isSaving, error, onClose, onSubmit }) {
	const [formData, setFormData] = useState(getInitialFormState)
	const isIncome = type === 'income'
	const title = isIncome ? 'Add Income' : 'Add Expense'

	const handleChange = (event) => {
		const { name, value } = event.target
		setFormData((currentData) => ({
			...currentData,
			[name]: value,
		}))
	}

	const handleSubmit = async (event) => {
		event.preventDefault()

		const payload = {
			title: formData.title.trim(),
			amount: Number(formData.amount),
			category: formData.category.trim(),
			type,
			date: new Date(formData.date).toISOString(),
		}

		try {
			await onSubmit(payload)
			setFormData(getInitialFormState())
		} catch {
			// The transaction hook owns the visible error message.
		}
	}

	return (
		<div className="auth-backdrop" role="presentation">
			<section className="auth-modal transaction-modal" role="dialog" aria-modal="true" aria-labelledby="transaction-title">
				<div className="auth-header">
					<div>
						<h2 id="transaction-title">{title}</h2>
						<p>{isIncome ? 'Record money coming into your account.' : 'Record money spent from your account.'}</p>
					</div>
					<button type="button" className="auth-close" onClick={onClose} aria-label="Close form">
						x
					</button>
				</div>

				<form className="auth-form" onSubmit={handleSubmit}>
					<label>
						<span>Type</span>
						<input className="locked-input" value={isIncome ? 'Income' : 'Expense'} readOnly />
					</label>

					<label>
						<span>Title</span>
						<input
							name="title"
							value={formData.title}
							onChange={handleChange}
							required
							placeholder={isIncome ? 'Salary, freelance, bonus' : 'Groceries, rent, dinner'}
						/>
					</label>

					<label>
						<span>Amount</span>
						<input
							name="amount"
							type="number"
							min="0"
							step="0.01"
							value={formData.amount}
							onChange={handleChange}
							required
							placeholder="0.00"
						/>
					</label>

					<label>
						<span>Category</span>
						<input
							name="category"
							value={formData.category}
							onChange={handleChange}
							required
							placeholder={isIncome ? 'Salary' : 'Food & Dining'}
						/>
					</label>

					<label>
						<span>Date</span>
						<input name="date" type="datetime-local" value={formData.date} onChange={handleChange} required />
					</label>

					{error ? <p className="auth-error">{error}</p> : null}

					<button type="submit" className="auth-submit" disabled={isSaving}>
						{isSaving ? 'Saving...' : title}
					</button>
				</form>
			</section>
		</div>
	)
}

export default TransactionModal
