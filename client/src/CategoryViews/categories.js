import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal, Form, Input } from 'reactstrap'
import httpClient from '../httpClient'

class Categories extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        categories: this.props.categories,
        newCategoryName: '',
        navBtn: false,
        deleteBtn: false,
        modal: false
      };
      this.toggle = this.toggle.bind(this);
    }
    componentDidMount() {
        httpClient.getCategories().then((serverResponse) => {
            this.setState({
                categories: serverResponse.data
            })
        })
    }
    toggle() {
      this.setState({
        modal: !this.state.modal
      });
    }

    toggleAddToNav() {
        this.setState({
            navBtn: !this.state.navBtn
        })
    }

    addCategoryToNav(c) {
        httpClient.addCategoryToNav(c._id).then((serverResponse) => {
            this.props.onUpdateCategories()
        })
    }

    toggleDelete() {
        this.setState({
            deleteBtn: !this.state.deleteBtn
        })
    }

    deleteCategory(id) {
        httpClient.deleteCategory(id).then((serverResponse) => {
            this.props.onUpdateCategories()
        })
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
            this.setState({ 
                categories:[...this.state.categories, serverResponse.data.category],
                newCategoryName: '',
                modal: !this.state.modal
            })
		})
	}
  
    render() {
        const { categories } = this.state
        const navBtn = this.state.navBtn ? 'show' : 'hideBtn'
        const deleteBtn = this.state.deleteBtn ? 'show' : 'hideBtn'
        return (
        <div className='content'>
            <div className='Categories'>
                <h1>Categories</h1>
                <Button color='info' className='newCategoryBtn' onClick={this.toggle}>+</Button>
            </div>
            <div className='editCategories'>
                <Button onClick={this.toggleAddToNav.bind(this)}color='warning'>Add To Nav</Button>
                <Button onClick={this.toggleDelete.bind(this)} color='danger'>Delete Category</Button>
            </div>
            <div className='clearfix' />
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <div className='categoryNameForm'>
                    <h3 className='categoryNameLabel'>New Category Name:</h3>
                    <Form onSubmit={this.onFormSubmit.bind(this)}className='categoryNameForm'>
                        <Input className='categoryNameInput input' name="newCategoryName"  placeholder="Name of New Category" />
                        <div className='newCategoryBtnsDiv'>
                            <Button color="primary" type='submit'>Save</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </div>
                    </Form>
                </div>
            </Modal>
            <div>
                <ul className='allCategories'>
                    {categories.map((c) => {
                        return(
                            <div className='categoryName' key={c._id}>
                                <div className='categoryBtns'>
                                    <Button className={`selector ${navBtn}`} color='warning' onClick={this.addCategoryToNav.bind(this, c)}>add to nav</Button>
                                    <Button className={`selector ${deleteBtn}`} color='danger' onClick={this.deleteCategory.bind(this, c._id)}>Delete</Button>
                                </div>
                                <li>
                                    <Link to={`/categories/${c._id}`}>
                                        <h3>{c.name}</h3>
                                    </Link>
                                </li>
                            </div>
                        )
                    })}
                </ul>
            </div>
        </div>
        );
    }
}

export default Categories