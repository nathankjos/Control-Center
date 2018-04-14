import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'

import './styles.css';

import httpClient from './httpClient'
import SignUp from './views/SignUp'
import LogIn from './views/LogIn'
import LogOut from './views/LogOut'
import Settings from './views/Settings'
import Categories from './categories'
import CategoryTemplate from './CategoryTemplate'
import SideBar from './SideBar';

class App extends React.Component {
    state = { 
      currentUser: httpClient.getCurrentUser(),
      showMusic: false,
      showClock: false,
      categoryLinks: []
    }

    getCategories() {
      httpClient.getCategories().then((serverResponse) => {
        this.setState({
          categoryLinks: serverResponse.data.filter((c) => {
            return c.inNav
          })
        })
      })
    }

    componentDidMount() {
      if(this.state.currentUser) this.getCategories()
    }

    onLoginSuccess(user) {
      this.setState({ currentUser: httpClient.getCurrentUser() })
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

  render() {
      const { currentUser, categoryLinks } = this.state
    return (
      <div className="App">
          {currentUser && <SideBar currentUser={currentUser} categoryLinks={categoryLinks}/> }


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
            <Route path='/categories/:id' component={CategoryTemplate} />
            <Route path='/categories' render={(props) => {
              return <Categories {...props} onAddCategoryToNavBar={this.getCategories.bind(this)} />
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
