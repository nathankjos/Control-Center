import React from 'react'
import NavBar from './NavBar'
import { Button, Modal } from 'reactstrap'
import { Link } from 'react-router-dom'

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: this.props.currentUser,
            newCategoryName: '',
            modal: false
        };
        this.toggle = this.toggle.bind(this);
    }
    
    toggle() {
        // console.log("show confirm modal")
            // console.log(this.state.modal)
        this.setState({
            modal: !this.state.modal
        });
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
                        <Link to='/logout' className='logOutBtn'><Button color='danger'>Yes</Button></Link>
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