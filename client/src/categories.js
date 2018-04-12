import React from 'react'
import { Button, Modal, ModalFooter, Form, Input } from 'reactstrap'
import httpClient from './httpClient'

class Categories extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
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

    onInputChange(evt) {
		this.setState({
			name: {
				...this.state.name,
				[evt.target.name]: evt.target.value
			}
		})
    }
    
    onFormSubmit(evt) {
		evt.preventDefault()
		httpClient.signUp(this.state.fields).then(user => {
			this.setState({ fields: { name: '', email: '', password: '' } })
			if(user) {
				this.props.onSignUpSuccess(user)
				console.log(user)
				this.props.history.push('/')
			}
		})
	}
  
    render() {
        return (
        <div className='content'>
            <div className='Categories'><h1>Categories</h1><Button color='info' className='newCategoryBtn' onClick={this.toggle}>+</Button></div>

            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <div className='categoryNameForm'>
                    <h3 className='categoryNameLabel'>New Category Name:</h3>
                    <Form className='categoryNameForm'><Input className='categoryNameInput' name="newCategoryName"  placeholder="Name of New Category" /></Form>
                </div>
                <ModalFooter>
                <Button color="primary" onClick={this.toggle}>Save</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <div className='content2'>
                <ul>
                    <li><a href='/categories'>Category Name</a></li>
                </ul>
            </div>
        </div>
        );
    }
}

export default Categories