import React, { Component } from 'react';
import {Form, Input, Grid, Message, Header} from 'semantic-ui-react' 
import axios from 'axios'
import { Redirect } from 'react-router-dom'



class SignUp extends Component {
  state={
    username: '',
    password: '',
    confirmPassword: '',
    formError: false,
    
  }

  handleChange = (e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  
  
  handleSubmit = (e) => {
    axios.post('http://localhost:3030/user', {
      username: this.state.username,
      password: this.state.password
    })
    .then(response => {

      if(!response.data.error){
        alert(`You have registered as ${this.state.username}! Continue on to login!`)
        this.setState({redirect: '/', username: ''})
      }else{
        console.log('Signin Error')
        this.setState({formError: true})
      }
    })
    .catch(error => console.log(error))
    .then(this.setState({ password: ''}))  
    
  }

render(){
  const {username, password, redirect, formError} = this.state
  if(redirect){
    return <Redirect to='/' />
  }else{
  return(
    <Grid>
      <Grid.Row>
        <Grid.Column width={6} />
        <Grid.Column width={4}>
          <Header as='h1'>Register</Header>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field error={formError} value={username} name='username' control={Input} onChange={this.handleChange} label='Username' type='text' />
            <Form.Field value={password} name ='password' control={Input} onChange={this.handleChange} label='Password' type='password' />
            <Message
              error={!formError}
              color='red'
              header="An error has occured"
              content="User already exists, please pick a differet name" />
            <Form.Button primary type='submit' content='Submit' />
          </Form>
        </Grid.Column>
        <Grid.Column width={6} />
      </Grid.Row>
    </Grid>
  )}
}
}

export default SignUp
