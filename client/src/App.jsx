import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'

import './styles.css';

import httpClient from './httpClient'
import SignUp from './views/SignUp'
import LogIn from './views/LogIn'
import LogOut from './views/LogOut'
import Settings from './views/Settings'
import Categories from './categories'
import SideBar from './SideBar';

class App extends React.Component {
    state = { 
      currentUser: httpClient.getCurrentUser(),
      showMusic: false,
      showClock: false
    }

    onLoginSuccess(user) {
      this.setState({ currentUser: httpClient.getCurrentUser() })
    }
  
    logOut() {
      httpClient.logOut()
      this.setState({ currentUser: null })
    }

  render() {
      const { currentUser } = this.state
    return (
      <div className="App">
          {this.state.currentUser
            ? (
              <SideBar />
            )	:	(
              <Redirect to='/login' />
          )}
          <Switch>
            <Route path='/settings' component={Settings} />
            <Route path='/categories' component={Categories} />
            <Route path="/login" render={(props) => {
              if(currentUser){return <Redirect to='/' />}
              return <LogIn {...props} onLoginSuccess={this.onLoginSuccess.bind(this)} />
            }} />
            <Route path="/logout" render={(props) => {
						  return <LogOut onLogOut={this.logOut.bind(this)} />
					  }} />
            <Route path="/signup" render={(props) => {
              if(currentUser){return <Redirect to='/' />}
						  return <SignUp {...props} onSignUpSuccess={this.onLoginSuccess.bind(this)} />
					  }} />
          </Switch>
      </div>
    );
  }
}

export default App;
