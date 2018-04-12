import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = (props) => {
    return (
        <div className='Navigation'>
            <div className='UserCtrls'>
                <Link to='/'>Edit Profile</Link>
                <Link to='/settings'>Settings</Link>
                <Link to='/logout'>Log Out</Link>
            </div>

            <div className='MainNav'>
                <br /><Link to='/categories'>Organized Browser</Link><hr />
                <Link to='/'>Music</Link><hr />
                <Link to='/'>Clock</Link><hr />
            </div>
        </div>
    )
}

export default NavBar