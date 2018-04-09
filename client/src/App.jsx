import React from 'react';
import { Route, Switch } from 'react-router-dom'

import './styles.css';

import Home from './views/Home'
import httpClient from './httpClient'
import SignUp from './views/SignUp'
import LogIn from './views/LogIn'

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
            <Route path='/signup' component={SignUp} />
            <Route path='/' component={Home} currentUser={currentUser} />
          </Switch>
      </div>
    );
  }
}

export default App;
