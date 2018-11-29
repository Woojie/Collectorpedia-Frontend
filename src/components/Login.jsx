import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import {Form, Input, Grid, Message, Header} from 'semantic-ui-react' 


class LoginForm extends Component {
  _isMounted =false
  state = {
    username: '',
    password: '',
    redirectTo: null,
    formError: false
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  componentDidMount() {
   this._isMounted = true
  }
componentWillUnmount() {
  this._isMounted = false
} 


  handleSubmit = (event) => {
    event.preventDefault()
    axios({
      method: 'post',
      url:'http://localhost:3030/user/login',
      withCredentials: true,
      crossDomain: true,
      data:({
        username: this.state.username,
        password: this.state.password    
      })
    })
      .then(response => {

          this.props.updateUser(
            {
              loggedIn: true, 
              username: response.data.username
            })
          this.setState({redirectTo: '/collection'})
        
      })
      .catch(error => {
        console.log('login error: ')
        console.log(error)
        this.setState({formError: true})
        
      })
    }

  render() {
    let {redirectTo, username, password, formError} = this.state
    if (redirectTo) {
      return <Redirect to={{
        pathname: redirectTo
      }}/>
    } else {
      return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={6} />
        <Grid.Column width={4}>
        <Header as='h2'>Login</Header>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field error={formError} value={username} name='username' control={Input} onChange={this.handleChange} label='Username' type='text' />
            <Form.Field error={formError} value={password} name ='password' control={Input} onChange={this.handleChange} label='Password' type='password' />
            <Form.Button primary type='submit' content='Submit' />
            <Message
              error={!formError}
              color='red'
              header="An error has occured"
              content="Something went wrong, please try again" />
          </Form>
        </Grid.Column>
        <Grid.Column width={6} />
      </Grid.Row>
    </Grid>      
      )
    }
  }
}

export default LoginForm
