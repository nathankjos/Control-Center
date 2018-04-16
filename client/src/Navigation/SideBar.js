import React from 'react'
import NavBar from './NavBar'
import { Button, Modal } from 'reactstrap'

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryLinks: this.props.categoryLinks,
            currentUser: this.props.currentUser,
            newCategoryName: '',
            modal: false
        };
        this.toggle = this.toggle.bind(this);
    }
    
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    logOutUser() {
        this.setState({categoryLinks: [] })
        console.log(this.props)
        this.props.history.push('/logout')
    }

    render(){
        const { currentUser } = this.props
        return (
            <div className='SideBar'>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <div className='logoutModal container'>
                        <br />
                        <h3 className='logoutH3'> Are you sure you would like to Log Out? </h3>
                        <br />
                        <Button onClick={this.logOutUser.bind(this)} className='logOutBtn' color='danger'>Yes</Button>
                    </div>
                </Modal>
                <div className='logout'><button onClick={this.toggle.bind(this)}>X</button></div>
                <div className='UserPic flex-container' style={{"backgroundImage":`url(${currentUser.imageUrl})`, "backgroundSize": "contain"}} alt='Please enter a valid image URL'>
                    <small className='WelcomeUser'>Welcome: {currentUser.name}</small>
                </div>
                <NavBar categoryLinks={this.props.categoryLinks}/>
            </div>
        )
    }
}

export default SideBar