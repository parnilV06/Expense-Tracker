import { useState } from 'react'

const initialFormState = {
	name: '',
	email: '',
	password: '',
}

function AuthModal({ mode, isSubmitting, error, onClose, onSubmit, onSwitchMode }) {
	const [formData, setFormData] = useState(initialFormState)
	const isSignup = mode === 'signup'

	const handleChange = (event) => {
		const { name, value } = event.target
		setFormData((currentData) => ({
			...currentData,
			[name]: value,
		}))
	}

	const handleSubmit = async (event) => {
		event.preventDefault()

		const payload = isSignup
			? formData
			: {
					email: formData.email,
					password: formData.password,
				}

		try {
			await onSubmit(payload)
			setFormData(initialFormState)
		} catch {
			// The auth hook owns the visible error message.
		}
	}

	return (
		<div className="auth-backdrop" role="presentation">
			<section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title">
				<div className="auth-header">
					<div>
						<h2 id="auth-title">{isSignup ? 'Create account' : 'Login'}</h2>
						<p>{isSignup ? 'Register to start tracking your money.' : 'Welcome back to your dashboard.'}</p>
					</div>
					<button type="button" className="auth-close" onClick={onClose} aria-label="Close form">
						x
					</button>
				</div>

				<form className="auth-form" onSubmit={handleSubmit}>
					{isSignup ? (
						<label>
							<span>Name</span>
							<input name="name" value={formData.name} onChange={handleChange} required autoComplete="name" />
						</label>
					) : null}

					<label>
						<span>Email</span>
						<input
							name="email"
							type="email"
							value={formData.email}
							onChange={handleChange}
							required
							autoComplete="email"
						/>
					</label>

					<label>
						<span>Password</span>
						<input
							name="password"
							type="password"
							value={formData.password}
							onChange={handleChange}
							required
							minLength={6}
							autoComplete={isSignup ? 'new-password' : 'current-password'}
						/>
					</label>

					{error ? <p className="auth-error">{error}</p> : null}

					<button type="submit" className="auth-submit" disabled={isSubmitting}>
						{isSubmitting ? 'Please wait...' : isSignup ? 'Sign up' : 'Login'}
					</button>
				</form>

				<button type="button" className="auth-switch" onClick={onSwitchMode}>
					{isSignup ? 'Already have an account? Login' : 'Need an account? Sign up'}
				</button>
			</section>
		</div>
	)
}

export default AuthModal
