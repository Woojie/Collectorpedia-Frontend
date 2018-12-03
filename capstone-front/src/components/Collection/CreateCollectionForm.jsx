import React, {Component} from 'react'
import axios from 'axios';
import {Button, Grid, Form, Input, Divider, Icon, TextArea, Label, Segment} from 'semantic-ui-react'
import uuidv4 from 'uuid/v4'


class CreateCollectionForm extends Component {
  state={
    name: '',
    type: '',
    description: '',
    collectionExists: false,
    enterName: false,
    customNumber: 0,
    customInput: []
  }

  handleChange = (e) =>{this.setState({[e.target.name]:e.target.value})}

  handleSubmit = (e) =>{
    let user = this.props.userData
    let newCollections
    if(user.collections.some((collection)=>
      collection.name.toLowerCase() === this.state.name.toLowerCase())){
        this.setState({collectionExists: true})
    }else if( this.state.name.length < 3){
      this.setState({enterName: true, collectionExists:true})
      
    }else{

    if (user.collections === undefined){

      newCollections = {
        name: this.state.name,
        type: this.state.type,
        description: this.state.description,
        collection: [],
        customInput1: this.state.customInput1 ? this.state.customInput1 : null,
        customInput2: this.state.customInput2 ? this.state.customInput2 : null,
        customInput3: this.state.customInput3 ? this.state.customInput3 : null,
        id: uuidv4()
      }
    }else{
      let addCollection =  {
        name: this.state.name,
        type: this.state.type,
        description: this.state.description,
        collection: [],
        customInput1: this.state.customInput1 ? this.state.customInput1 : null,
        customInput2: this.state.customInput2 ? this.state.customInput2 : null,
        customInput3: this.state.customInput3 ? this.state.customInput3 : null,
        id:uuidv4()
      }
    newCollections = user.collections.concat(addCollection)
    }
    user.collections = newCollections

    axios({
      method: 'put',
      url:'http://localhost:3030/user/',
      withCredentials: true,
      crossDomain: true,
      data:({
        user:user    
      })
    })
    this.props.handleClose()
    }
  }

  handleAddItem = () => {
    const {customNumber, customInput} = this.state
    this.setState({
      customNumber: customNumber+1,
      customInput: customInput.concat(
        <Form.Field 
        control={Input} 
        label={`Custom Parameter #${customNumber+1}`} 
        placeholder="Ie. quantity, price, team, etc." 
        key={uuidv4()}
        name={`customInput${customNumber+1}`}
        onChange={this.handleChange}
      />
      )
    })
  }

  render(){
    const {collectionExists, enterName, customNumber} = this.state


  return(

    <Grid stackable>
      <Grid.Row>
        <Grid.Column width={3} />
          <Grid.Column width={10}>
          <Segment raised>
          <Divider hidden />
          <Form onSubmit={this.handleSubmit}>

            <Form.Field
              control={Input}
              error={collectionExists}
              label="Name of Collection"
              name="name"
              onChange={this.handleChange}
            />  
            <Label
              pointing="above"
              onClick={()=>{this.setState({collectionExists: !collectionExists})}}
              content={enterName ? "You forgot to name your collection." : "This collection already exists!"}
              style={{display: !collectionExists ? 'none':'' } }
              color="red"
            />        
            <Form.Field
              control={Input}
              label="Type of Collection"
              name="type"
              placeholder="music.. memorabilia.. shoes.."
              onChange={this.handleChange}
            />          
            <Form.Field
              control={TextArea}
              label="Describe Your Collection!"
              name="description"
              placeholder="What kind of collection is it"
              onChange={this.handleChange}
            />
              {this.state.customInput}
            <Label  color={customNumber === 3 ? 'red': 'green'}
            onClick={customNumber===3 ? false : this.handleAddItem }>
              <Icon  name={customNumber === 3 ? 'times': 'add'} />
                {customNumber === 3 ? "Max Parameters Reached ":"Add Parameters"}
            </Label>

            <Form.Field
              control={Button}
              content='Make Collection'
            />          
          </Form>
        <Divider hidden />
        </Segment>
        </Grid.Column> 
        <Grid.Column width={3} />
      </Grid.Row>
    </Grid>

  )
  }

}

export default CreateCollectionForm
