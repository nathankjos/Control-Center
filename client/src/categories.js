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
            modal: !this.state.modal,
			name: {
				...this.state.newCategoryName,
				newCategoryName: evt.target.value
			}
		})
    }
    
    onFormSubmit(evt) {
        evt.preventDefault()
        const data = { name: evt.target[0].value }
		httpClient.createCategory(data).then(serverResponse => {
            console.log(serverResponse.data)
            this.setState({ 
                newCategoryName: '',
                modal: !this.state.modal
            })
		})
	}
  
    render() {
        return (
        <div className='content'>
            <div className='Categories'><h1>Categories</h1><Button color='info' className='newCategoryBtn' onClick={this.toggle}>+</Button></div>

            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <div className='categoryNameForm'>
                    <h3 className='categoryNameLabel'>New Category Name:</h3>
                    <Form onSubmit={this.onFormSubmit.bind(this)}className='categoryNameForm'>
                        <Input className='categoryNameInput' name="newCategoryName"  placeholder="Name of New Category" />
                        <Input type='submit' value='save' />
                    </Form>
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