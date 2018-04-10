import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'

import './styles.css';

import Home from './views/Home'
import httpClient from './httpClient'
import SignUp from './views/SignUp'
import LogIn from './views/LogIn'
import LogOut from './views/LogOut'
import VIP from './views/VIP'

class App extends React.Component {
    state = { currentUser: httpClient.getCurrentUser() }

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
      <div className="App container">
          <Switch>
            <Route path="/login" render={(props) => {
              return <LogIn {...props} onLoginSuccess={this.onLoginSuccess.bind(this)} />
            }} />
            <Route path="/logout" render={(props) => {
						  return <LogOut onLogOut={this.logOut.bind(this)} />
					  }} />
            <Route path="/signup" render={(props) => {
						  return <SignUp {...props} onSignUpSuccess={this.onLoginSuccess.bind(this)} />
					  }} />
            <Route path="/vip" render={() => {
              return currentUser
                ? <VIP />
                : <Redirect to="/login" />
            }} />
            <Route path='/' render={()=>{
              return <Home currentUser={currentUser}/>
            }} />
          </Switch>
      </div>
    );
  }
}

export default App;
