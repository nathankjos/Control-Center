import React from 'react'
import { Button, Modal, Form, Input } from 'reactstrap'
import httpClient from '../httpClient'
import ToDoList from './ToDoList/ToDoList'
import Links from './Links/Links'
import Notes from './Notes/Notes'

class Categories extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        toDoList: [],
        notes: [],
        links: [],
        newCategoryName: '',
        editModal: false,
        editBtn: false,
        linksAndNotesPanel: false,
        itemsToBeDeleted:[]
      }
    }
    componentDidMount() {
        const categoryId = this.props.match.params.id
        httpClient.getCategory(categoryId).then((serverResponse) =>{
        const { toDoListItems, notes, links } = serverResponse.data
            this.setState({ 
                toDoList: toDoListItems,
                notes: notes,
                links: links
            })
        })
    }

    toggleEditModal() {
        this.setState({
            editModal: !this.state.editModal
        })
    }

    // toggleDelete() {
    //     this.setState({
    //         deleteBtn: true
    //     })
    // }


    // deleteListItems(id) {
    //     httpClient.deleteListItem(id).then((serverResponse) => {
    //         this.props.onUpdateCategories()
    //     })
    // }

    onInputChange(evt) {
		this.setState({
            newCategoryName: {
                ...this.state.newCategoryName,
                newCategoryName: evt.target.value
            }
        })
    }

    onEditFormSubmit(evt) {
        evt.preventDefault()
        const cId = this.state.category._id
        const data = { name: evt.target[0].value }
        httpClient.updateCategory(data, cId).then((serverResponse) => {
            this.props.saveEditedCategoryName(serverResponse.data.category.name)
            this.props.history.push(`/categories/${cId}`)
        })
    }

    toggleLinks() {
        this.setState({
            linksAndNotesPanel: true,
        })
    }

    toggleNotes(){
        this.setState({
            linksAndNotesPanel: false,
        })
    }
    
    onAddTodo(newItems) {
        this.setState({
            toDoList: newItems
        })
    }

    onAddNote(newNote) {
        this.setState({
            notes: newNote
        })
    }

    onAddLink(newLink) {
        this.setState({
            links: newLink
        })
    }

    render() {
        const { categories } = this.props
        const categoryName = categories.filter((c) => {
            return c._id === this.props.match.params.id
        })
        return (
        <div className='content'>
            <div className='CategoryNameTitle'>
                <h1 className='categoryTitle'> {categoryName[0] && categoryName[0].name}
                </h1>
                <div className='LinksAndNotesBtns'>
                    {/* <Button onClick={this.deleteListItems.bind(this)} color='danger' className={`selector ${deleteBtn}`}>Delete Selected Items</Button> */}
                    <Button onClick={this.toggleEditModal.bind(this)} color='info'>Edit Category</Button>
                    <Button onClick={this.toggleLinks.bind(this)} color='success'>Links</Button>
                    <Button onClick={this.toggleNotes.bind(this)} color='success'>Notes</Button>
                </div>
            </div>

            <Modal isOpen={this.state.editModal} toggle={this.toggleEditModal} onChange={this.onInputChange.bind(this)}>
                <div className='categoryNameForm'>
                    <h3 className='categoryNameLabel'>Edit Category Name:</h3>
                    <Form onSubmit={this.onEditFormSubmit.bind(this)}className='categoryNameForm'>
                        <Input className='editCategoryInput input' name="editCategoryName"  placeholder={categoryName[0] && categoryName[0].name} />
                        <div className='newCategoryBtnsDiv'>
                            <Button color="primary" type='submit'>Save</Button>
                            <Button color="secondary" onClick={this.toggleEditModal.bind(this)}>Cancel</Button>
                        </div>
                    </Form>
                </div>
            </Modal>

            <div className='content3'>
                <div className='panel'>
                    <ToDoList onAddTodo={this.onAddTodo.bind(this)} categoryId={this.props.match.params.id} toDoList={this.state.toDoList}  />
                </div>

                <div className='panel'>
                    {this.state.linksAndNotesPanel?
                        <Links  onAddLink={this.onAddLink.bind(this)} categoryId={this.props.match.params.id} links={this.state.links}  />
                        :
                        <Notes onAddNote={this.onAddNote.bind(this)} categoryId={this.props.match.params.id} notes={this.state.notes}/>
                    }
                </div>
            </div>
        </div>
        );
    }
}

export default Categories