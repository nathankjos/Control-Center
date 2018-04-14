import React from 'react'
import { Button } from 'reactstrap'
import httpClient from './httpClient'

class Categories extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        category: [],
        linksPanel: false,
        notesPanel: true,
        toDoList: [],
        toDoInput: '',
        notes: [],
        notesInput: '',
        links: [],
        linksInput: ''
      };
    }
    componentDidMount() {
        const categoryId = this.props.match.params.id
        httpClient.getCategory(categoryId).then((serverResponse) =>{
            console.log(serverResponse)
            this.setState({ category: serverResponse.data})
        })
    }

    toggle() {
        //if the button clicked's body == links
            this.setState({
                links: true,
                notes: false
            });
        //if the button clicked's body == notes
            this.setState({
                links: false,
                notes: true
            })
      }  

    onInputChange(evt) {
		this.setState({
            //get name of the parent of the input field, and edit input value
		})
    }

    editCategory(){
        console.log('Clicked')
    }
    
    onNewToDoItem(evt) {
        evt.preventDefault()
        //http client create todo item
        //add new item to todo list array
        //clear to do input
    }
    onNewNote(evt) {
        evt.preventDefault()
        //http client create Note
        //add new note to Notes list array
        //clear to do input
    }
    onNewLink(evt) {
        evt.preventDefault()
        //http client create link
        //add new item to Link list
        //clear link input
	}
  
    render() {
        return (
        <div className='content'>
            <div className='CategoryName'><h1>{this.state.category.name}</h1><Button color='primary' className='editCategoryName'>edit</Button></div>
            <div><button>Links</button> <button> Notes </button>
            <div className='content3'>
                <div className='panel'>

                    <div className='ToDoList'>

                        <ul>To Do List <Button color='info' className='newToDoItem' onClick={this.toggle}>+</Button><hr />
                            <li> <input type='checkbox' /> To Do Item </li>
                        </ul>

                    </div>
                </div>

                <div className='panel'>


                        <div className='LinksAndNotes'>

                            <ul>Links <Button color='info' className='newLink' onClick={this.toggle}>+</Button><hr />
                                <li>Link</li>
                            </ul>

                        </div>

                        <div className='LinksAndNotes'>
                            <div>Notes <Button color='info' className='newNote' onClick={this.toggle}>+</Button></div><hr />
                            <ul>
                                <li>Note</li>
                            </ul>

                        </div>

                    </div>
                </div>
            </div>
                {/* <ul>
                    {categories.map((c) => {
                        return(
                            <li key={c._id}><Link to={`/category/${c._id}`}>
                                <h3>{c.name}</h3>
                            </Link></li>
                        )
                    })}
                    <li><a href='/categories'>Category Name</a></li>
                </ul> */}
        </div>
        );
    }
}

export default Categories