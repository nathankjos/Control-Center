import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = (props) => {
    return (
        <div className='Navigation'>
            <div className='UserCtrls'>
                <Link to='/settings'><span>Settings</span></Link>
                <Link to='/categories'><span>Categories</span></Link>
            </div>

            <div className='MainNav'>
                <br /><Link to='/'>Selected Category</Link><hr />
                <Link to='/'>Selected Category</Link><hr />
                <Link to='/'>Selected Category</Link><hr />
            </div>
        </div>
    )
}

export default NavBar