import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = (props) => {
    return (
        <div className='Navigation'>
            <div className='UserCtrls'>
            <Link to='/'>Edit Profile</Link>
            <Link to='/'>Settings</Link>
            <Link to='/'>Log Out</Link>
            </div>
            <div className='MainNav'>
            nav goes here
            </div>
        </div>
    )
}

export default NavBar