import React from 'react'
import httpClient from '../httpClient'
const currentUser = httpClient.getCurrentUser()

class Settings extends React.Component {
	state = {
		fields: { 
            imageUrl: currentUser.imageUrl,
            name: currentUser.name,
            email: currentUser.email
        }
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
		httpClient.updateUser(currentUser._id, this.state.fields).then(user => {
                this.props.updateCurrentUser(user.data.token)
				this.props.history.push('/settings')
		})
	}
    render(){
    const { name, imageUrl, email } = currentUser
        return(
            <div className='Settings'>
                <div className='row'>
					<div className='column column-33 column-offset-33'>
                        <h1 className='settingsTitle'>Settings</h1>
                        <form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
                            <div>Profile Picture:   <input className='settingsInput input' type='text' name='imageUrl' placeholder={imageUrl}/></div>
                            <div>Name:   <input className='settingsInput input' type='text' name='name' placeholder={name}/></div>
                            <div>LogIn Username/Email:   <input className='settingsInput input' type='text' name='email' placeholder={email}/></div>
                            {/* <div>Password:   <input className='settingsInput' name='password' type='password' placeholder='* * * * * * * * * * * * *'/></div> */}
                            {/* <div><input type='checkbox' /><span>  Show Music Box</span></div>
                            <div><input type='checkbox' /><span>  Show Clock Box</span></div> */}
                            <div id='btnDiv'>
                                <button type='submit'>Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Settings