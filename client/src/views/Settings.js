import React from 'react'

//                <div></div>


class Settings extends React.Component {
    render(){
        return(
            <div className='Settings content'>
                <h1 className='categoryTitle Settings'>Settings</h1>
                <div className='checkBoxes'>
                    <div><input type='checkbox' /><span>  Show Music Box</span></div>
                    <div><input type='checkbox' /><span>  Show Clock Box</span></div>
                </div>
                <div>
                    <div>Profile Picture:   <input className='settingsInput' name='CurrentPic' placeholder='current profile picture url'/></div>
                    <div>Name:   <input className='settingsInput' name='CurrentName' placeholder='current name'/></div>
                    <div>LogIn Username/Email:   <input className='settingsInput' name='CurrentLogIn' placeholder='current logIn Credentials'/></div>
                </div>
            </div>
        )
    }
}

export default Settings