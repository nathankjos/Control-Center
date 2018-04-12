import React from 'react'
import httpClient from '../httpClient'
import { Link } from 'react-router-dom'

class SignUp extends React.Component {
	state = {
		fields: { name: '', email: '', password: ''}
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
		httpClient.signUp(this.state.fields).then(user => {
			this.setState({ fields: { name: '', email: '', password: '' } })
			if(user) {
				this.props.onSignUpSuccess(user)
				console.log(user)
				this.props.history.push('/')
			}
		})
	}

    render(){
        const { name, email, password } = this.state.fields
        return(
            <div className='SignUp'>
				<div className='row'>
					<div className='column column-33 column-offset-33'>
						<h1>Sign Up</h1>
						<form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
							<input type="text" placeholder="Name" name="name" value={name} />
							<input type="text" placeholder="Email" name="email" value={email} />
							<input type="password" placeholder="Password" name="password" value={password} />
                            <div id='btnDiv'>
								<button type='submit'>Sign Up</button><Link to='/login'><button type='button'>Have an Account?</button></Link>
							</div>
						</form>
					</div>
				</div>
			</div>
        )
    }
}

export default SignUp