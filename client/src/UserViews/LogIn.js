import React from 'react'
import httpClient from '../httpClient'
import { Link } from 'react-router-dom'

class LogIn extends React.Component {
	state = {
		fields: { email: '', password: ''}
	}

	onInputChange(evt) {
		this.setState({
			fields: {
				...this.state.fields,
				[evt.target.name]: evt.target.value
			}
		})
	}

	onFormSubmit(evt) {
		evt.preventDefault()
		httpClient.logIn(this.state.fields).then(user => {
			this.setState({ fields: { email: '', password: '' } })
			if(user) {
				this.props.onLoginSuccess(user)
				this.props.history.push('/')
			}
		})
	}
	
	render() {
        const { email, password } = this.state.fields
		return (
			<div className='LogIn'>
				<div className='row'>
					<div className='column column-33 column-offset-33'>
						<h1>Log In</h1>
						<form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
							<input className='input' type="text" placeholder="Email" name="email" value={email} />
							<input className='input' type="password" placeholder="Password" name="password" value={password} />
                            <div id='btnDiv'>
							    <button type='submit'>Log In</button><Link to='/signup'><button type='button'>No Account? Sign Up!</button></Link>
                            </div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

export default LogIn