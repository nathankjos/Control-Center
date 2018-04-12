import React from 'react'
import NavBar from './NavBar'
import httpClient from './httpClient'
import { Link } from 'react-router-dom'
import { Button, Modal, ModalFooter, Form, Input } from 'reactstrap'

const SideBar = () => {
    const currentUser = httpClient.getCurrentUser()
    const { imageUrl } = currentUser
        return (
            <div className='SideBar'>
                <div className='logout'><Link to='/logout'>X</Link></div>
                <div className='UserPic flex-container' style={{"backgroundImage":`url(${imageUrl})`, "backgroundSize": "contain"}}>
                    <small className='WelcomeUser'>Welcome: {currentUser.name}</small>
                </div>
                <NavBar />
            </div>
        )
}

export default SideBar