import React, {Component} from 'react'
import axios from 'axios';
import {Grid, Button, Form, Input, Divider, TextArea, Label} from 'semantic-ui-react'
import uuidv4 from 'uuid/v4'


class EditItemForm extends Component {
  state = {
    value: '',
    name: '',
    description: '',
    customInput1: '',
    customInput2: '',
    customInput3: '',
    itemExists: false,

  }

  componentDidMount(){
    let {name, description, customInput1,customInput2,customInput3, id} = this.props

    this.setState({
      name,
      description,
      customInput1:customInput1[1],
      customInput2:customInput2[1],
      customInput3:customInput3[1],
      id,
      value: this.props.value
    })

  }
  handleRadioChange = (e, {value}) => this.setState({value})
  handleChange = (e) => {this.setState({[e.target.name]:e.target.value})}
    
  handleSubmit = (e) =>{

    let {value, name, description, customInput1, customInput2, customInput3, id} = this.state,
    {user, collectionId} = this.props,
    changeCollection = user.collections.find((collection)=>collection.id === collectionId),
    oldCollection = user.collections.filter((collection)=>collection.id !== collectionId),
    changeItems = changeCollection.collection.find((item)=>item.id === id),
    oldItems = changeCollection.collection.filter((item)=> item.id !== id)

    if(oldItems.some((item)=>item.name === name)){
      this.setState({itemExists: true})
    }else{
      this.setState({itemExists: false})
        changeItems = [{
          name,
          value,
          description,
          id: uuidv4(),
          customInput1:[this.props.csInput1, customInput1], 
          customInput2:[this.props.csInput2, customInput2],
          customInput3:[this.props.csInput3, customInput3],
          image: this.props.image
        }]
      }
      if(oldItems.length > 0){
        changeCollection.collection = changeItems.concat(oldItems)

      }else{
        changeCollection.collection = changeItems

      }
      if(oldCollection.length >0){
        user.collections = [(changeCollection)].concat(oldCollection)
      }else{
        user.collections = [(changeCollection)]
      }

      axios({
        method: 'put',
        url:'http://localhost:3030/user/',
        withCredentials: true,
        crossDomain: true,
        data:({
          user:user,
        })
      })
      this.props.editModalClose()
  }

  
  render(){
    let {value, itemExists, name, description, customInput1, customInput2, customInput3} = this.state
    let { csInput1, csInput2, csInput3 } = this.props
    let custom1 = csInput1 !== null ?         
    <Form.Field
      control={Input}
      error={itemExists}
      label={csInput1}
      name="customInput1"
      onChange={this.handleChange}
      value={customInput1}
    /> 
  : ""
  let custom2 = csInput2 !== null ?         
    <Form.Field
      control={Input}
      error={itemExists}
      label={csInput2}
      name="customInput2"
      onChange={this.handleChange}
      value={customInput2}
    /> 
  : ""
  let custom3 = csInput3 !== null ?         
    <Form.Field
    control={Input}
    // error={ItemExists}
    label={csInput3}
    name="customInput3"
    value={customInput3}
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
          value = {name}
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
          value={description}
        />
        <Form.Field
          control={Button}
          content='Edit Item'
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

export default EditItemForm