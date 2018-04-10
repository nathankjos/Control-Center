import React from 'react'
import NavBar from './NavBar'
import httpClient from './httpClient'

const SideBar = () => {
    const currentUser = httpClient.getCurrentUser()
        return (
            <div className='SideBar'>
                <div className='UserPic flex-container'>
                    <small className='WelcomeUser'>Welcome: {currentUser.name}</small>
                </div>
                <NavBar />
            </div>
        )
}

export default SideBar