import React, {Component} from 'react'
import axios from 'axios';
import {Grid, Button, Form, Input, Divider, TextArea, Label} from 'semantic-ui-react'
import uuidv4 from 'uuid/v4'


class AddItemForm extends Component {
  state = {
    value: '',
    name: '',
    description: '',
    itemExists: false
  }

  handleRadioChange = (e, {value}) => this.setState({value})
  handleChange = (e) => {this.setState({[e.target.name]:e.target.value})}
    
  handleSubmit = (e) =>{
    let {value, name, description, customInput1, customInput2, customInput3} = this.state,
    user = this.props.user,
    changeCollection = user.collections.find((collection)=>collection.id === this.props.id),
    oldCollection = user.collections.filter((collection)=>collection.id !== this.props.id)
    if(changeCollection.collection.some((item)=>item.name === name)){
      this.setState({itemExists:true})
      
    }else{
      this.setState({itemExists: false})
      if(changeCollection.collection){
        changeCollection.collection = changeCollection.collection.concat(
          {
            name,
            value,
            description,
            id: uuidv4(),
            customInput1:[this.props.collection.customInput1, customInput1], 
            customInput2:[this.props.collection.customInput2, customInput2],
            customInput3:[this.props.collection.customInput3, customInput3]
          }
        )
      }else{
        changeCollection.collection = [
          {
            name,
            value,
            description,
            id:uuidv4(),
            customInput1:[this.props.collection.customInput1, customInput1], 
            customInput2:[this.props.collection.customInput2, customInput2],
            customInput3:[this.props.collection.customInput3, customInput3]
          }
        ]
      }
      user.collections = oldCollection.concat(changeCollection)

      axios({
        method: 'put',
        url:'http://localhost:3030/user/',
        withCredentials: true,
        crossDomain: true,
        data:({
          user:user,
          username: user.username
        })
      })
      this.props.handleClose()

    }

  }
  render(){
    let {value, itemExists, name} = this.state
    let {customInput1, customInput2, customInput3} = this.props.collection
    let custom1 = customInput1 ?         
    <Form.Field
      control={Input}
      error={itemExists}
      label={customInput1}
      name="customInput1"
      onChange={this.handleChange}
    /> 
  : ""
  let custom2 = customInput2 ?         
    <Form.Field
      control={Input}
      error={itemExists}
      label={customInput2}
      name="customInput2"
      onChange={this.handleChange}
    /> 
  : ""
  let custom3 = customInput3 ?         
    <Form.Field
    control={Input}
    // error={ItemExists}
    label={customInput3}
    name="customInput3"
    onChange={this.handleChange}
    /> 
  : ""
    return(
      <Grid>
        <Grid.Row>
        <Grid.Column width={3} />
        <Grid.Column width ={10}>
      <Divider hidden />
      <Form onSubmit={this.handleSubmit}>
        <Form.Field
          control={Input}
          error={itemExists}
          label="Name"
          name="name"
          onChange={this.handleChange}
        />  
        <Label
          pointing="above"
          onClick={()=>{this.setState({itemExists: !itemExists})}}
          content="This collection already exists!"
          style={{display: !itemExists ? 'none':'' } }
          color="red"
        />                
        {custom1}
        {custom2}
        {custom3}

        <Form.Group inline>
          <label>Value</label>
          <Form.Radio
            label='Low'
            value='Low'
            checked={value === 'Low'}
            onChange={this.handleRadioChange}
          />
          <Form.Radio
            label='Medium'
            value='Medium'
            checked={value === 'Medium'}
            onChange={this.handleRadioChange}
          />
          <Form.Radio
            label='High'
            value='High'
            checked={value === 'High'}
            onChange={this.handleRadioChange}
          />
        </Form.Group>

        <Form.Field
          control={TextArea}
          label="Describe Your Item!"
          name="description"
          placeholder="What kind of collection is it"
          onChange={this.handleChange}
        />
        <Form.Field
          control={Button}
          content='Make Item'
          style={{display: !name.length > 0  ? 'none':'' } }
        />          
      </Form>
    <Divider hidden />
    </Grid.Column>
    <Grid.Column width={3} />
    </Grid.Row>
    </Grid>
    
    )
  }
}

export default AddItemForm