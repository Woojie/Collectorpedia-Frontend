import React, { Component } from 'react'
import './App.css'
import SignUp from './components/SignUp'
import { Route, Redirect, Switch } from 'react-router-dom'
import Collection from './components/Collection'
import Login from './components/Login'
import axios from 'axios'
import Navbar from './components/Navbar'


class App extends Component {
  state ={
    loggedIn: true,
    username: null
  }

  componentDidMount(){
    window.addEventListener('online', () => {
      this.setState({ offline: false })
    })
    window.addEventListener('offline', () => {
      this.setState({ offline: true });
    });
    this.getUser()
  }

    componentDidUpdate() {
      let offlineStatus = !navigator.onLine;
      if (this.state.offline !== offlineStatus) {
        this.setState({ offline: offlineStatus });
      }}
    
  updateUser = (userObject) =>{this.setState(userObject)}

  getUser() {
    axios({
      method: 'get',
      url: 'http://localhost:3030/user/',
      withCredentials: true,
      crossDomain: true,
    })
      .then(response => {

      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')
        this.setState({
          loggedIn: true,
          username: response.data.user.username,
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  logout = (event) => {
    event.preventDefault()
    axios({
      method: 'post',
      url: 'http://localhost:3030/user/logout',
      withCredentials: true,
      crossDomain: true,
    })  
    .then(response => {
      console.log(response.data)
      if (response.status === 200) {
        this.updateUser({
          loggedIn: false,
          username: null
        })
      }
    }).catch(error => {
      console.log('Logout error:', error)
    })
  }

  render() {
    
    const {loggedIn, username} = this.state
    return (
      <div className="App">
      <Navbar loggedIn = {loggedIn} username={username}  logout={this.logout} />
        <Switch>
        
        <Route path="/collection" render={(props)=>(
        !loggedIn ?(<Redirect to='/' />) : (<Collection {...props} updateUser={this.updateUser} />) )}/>

        <Route  path="/" exact render={() =>(
        loggedIn ? (<Redirect to='/collection'/>):<Login updateUser={this.updateUser}/>)}/>

        <Route path="/signup" render={() =>(
        loggedIn ? (<Redirect to='/collection'/>):<SignUp updateUser={this.updateUser}/>)}/>
        </Switch>

      </div>
    );
  }
}

export default App;
