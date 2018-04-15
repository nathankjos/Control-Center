import React from 'react'
import { Button } from 'reactstrap'
import httpClient from '../httpClient'
import ToDoList from './ToDoList/ToDoList'
import Links from './Links/Links'
import Notes from './Notes/Notes'

class Categories extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        category: [],
        toDoList: [],
        notes: [],
        links: [],
        linksAndNotesPanel: false
      }
    }
    componentDidMount() {
        const categoryId = this.props.match.params.id
        httpClient.getCategory(categoryId).then((serverResponse) =>{
            this.setState({ category: serverResponse.data})
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

    editCategory(){
        console.log('Clicked')
    }
    onFormSubmit(evt) {
        evt.preventDefault()
        const data = { name: evt.target[0].value }
		httpClient.createCategory(data).then(serverResponse => {
            this.setState({ 
                categories:[...this.state.categories, serverResponse.data.category],
                newToDo: '',
                modal: !this.state.modal
            })
		})
    }
    
    saveToDoList(){
        httpClient.saveToDoList()
    }

    render() {
        return (
        <div className='content'>
            <div className='CategoryName'><h1>{this.state.category.name}</h1><Button color='primary' className='editCategoryName'>edit</Button></div>
            <div><button onClick={this.toggleLinks.bind(this)}>Links</button> <button onClick={this.toggleNotes.bind(this)}> Notes </button></div>

            <div className='content3'>
                <div className='panel'>
                    <ToDoList onSaveToDoList={this.saveToDoList.bind(this)}/>
                </div>

                <div className='panel'>
                    {this.state.linksAndNotesPanel?
                        <Links />
                        :
                        <Notes />
                    }
                </div>
            </div>
        </div>
        );
    }
}

export default Categories