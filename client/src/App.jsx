import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'

import './styles.css';

import httpClient from './httpClient'
import SignUp from './UserViews/SignUp'
import LogIn from './UserViews/LogIn'
import LogOut from './UserViews/LogOut'
import Settings from './UserViews/Settings'
import Categories from './CategoryViews/categories'
import SelectedCategory from './CategoryViews/SelectedCategory'
import SideBar from './Navigation/SideBar';

class App extends React.Component {
    state = { 
      currentUser: httpClient.getCurrentUser(),
      showMusic: false,
      showClock: false,
      categoryLinks: [],
      categories: [],
      loggedIn: false
    }

    getCategories() {
      //filter categories to be only the categories of the current user
      // const currentUserCategories = categories.filter((c) => {
      //   console.log(c._id == this.props.match.params.id)
      //   if(c._id == this.props.match.params.id) return c
      // })
      httpClient.getCategories().then((serverResponse) => {
        this.setState({
          categories: serverResponse.data,
          categoryLinks: serverResponse.data.filter((c) => {
            return c.inNav
          })
        })
      })
    }

    componentWillMount() {
      if(!this.state.currentUser) this.setState({ categoryLinks: [] })
    }

    componentDidMount() {
      if(this.state.currentUser) this.getCategories()
    }

    onLoginSuccess(user) {
      this.setState({ currentUser: httpClient.getCurrentUser(), login: true })
    }
  
    updateCurrentUser(token){
      httpClient.setToken(token)
      this.setState({
        currentUser: httpClient.getCurrentUser()
      })
    }

    updateNavBarLinks(){
      this.setState({
        navBar: httpClient.updateNavBarLinks()
      })
    }

    logOut() {
      httpClient.logOut()
      this.setState({ currentUser: null })
    }

    // Move to selectedCategory.js?
    saveEditedCategoryName(newName){
      //find the id of the category to be edited, and update the name with the desired value ()
    }

  render() {
      const { currentUser, categoryLinks, categories } = this.state
    return (
      <div className="App">
          {currentUser && (<Route render={(props) => {
            return <SideBar {...props} currentUser={currentUser} categoryLinks={categoryLinks} />
          }} />)}

          <Switch>
            <Route exact path="/login" render={(props) => {
              if(currentUser){return <Redirect to='/categories' />}
              return <LogIn {...props} onLoginSuccess={this.onLoginSuccess.bind(this)} />
            }} />
            <Route exact path="/signup" render={(props) => {
              if(currentUser){return <Redirect to='/categories' />}
              return <SignUp {...props} onSignUpSuccess={this.onLoginSuccess.bind(this)} />
            }} />
            <Route path='/settings' render={(props) => {
						  return <Settings {...props} updateCurrentUser = {this.updateCurrentUser.bind(this)}/>
					  }} />
            <Route path='/categories/:id' render={(props) => {
              return <SelectedCategory {...props} saveEditedCategoryName={this.saveEditedCategoryName.bind(this)} categories={categories}/>
            }} />
            <Route path='/categories' render={(props) => {
              return <Categories {...props} onUpdateCategories={this.getCategories.bind(this)} categories={categories} />
            }} />
            <Route path="/logout" render={(props) => {
						  return <LogOut onLogOut={this.logOut.bind(this)} />
					  }} />
            <Route path="*" render={(props) => {
              return <Redirect {...props} to="/login" />
            }} />
          </Switch>
      </div>
    );
  }
}

export default App;
