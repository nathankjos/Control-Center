import React from 'react'
import NavBar from './NavBar'

const SideBar = (props) => {
    return (
        <div className='SideBar'>
            <div className='UserPic flex-container'>
                <small className='WelcomeUser'>Welcome: Nathan</small>
            </div>
            <NavBar />
        </div>
    )
}

export default SideBar