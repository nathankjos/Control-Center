import React from 'react'
import httpClient from '../httpClient'

class Settings extends React.Component {
	state = {
		fields: { name: '', email: '', imageUrl: ''}
	}
	onFormSubmit(evt) {
		evt.preventDefault()
		httpClient.updateUser(this.state.fields).then(user => {
				this.props.history.push('/settings')
		})
	}
    render(){
    const { name, imageUrl, email } = httpClient.getCurrentUser()
        return(
            <div className='Settings'>
                <div className='row'>
					<div className='column column-33 column-offset-33'>
                        <h1 className='categoryTitle'>Settings</h1>
                        <form onSubmit={this.onFormSubmit.bind(this)}>
                            <div>Profile Picture:   <input className='settingsInput' type='text' name='CurrentPic' placeholder={imageUrl}/></div>
                            <div>Name:   <input className='settingsInput' type='text' name='CurrentName' placeholder={name}/></div>
                            <div>LogIn Username/Email:   <input className='settingsInput' type='text' name='CurrentLogIn' placeholder={email}/></div>
                            <div>Password:   <input className='settingsInput' name='CurrentPassword' type='password' placeholder='* * * * * * * * * * * * *'/></div>
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