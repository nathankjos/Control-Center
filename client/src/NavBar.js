import React from 'react'
import httpClient from './httpClient'
import { Link } from 'react-router-dom'

const NavBar = (props) => {
    const currentUser = httpClient.getCurrentUser()
    const { _id } = currentUser
    return (
        <div className='Navigation'>
            <div className='UserCtrls'>
                <Link to={`/settings/${_id}`}><span>Settings</span></Link>
                <Link to='/categories'><span>Categories</span></Link>
            </div>

            <div className='MainNav'>
                <br />
                {props.categoryLinks.map((c) => {
                    return <Link to={`/categories/${c._id}`} key={c._id}>{c.name}</Link>
                })}
            </div>
        </div>
    )
}

export default NavBar