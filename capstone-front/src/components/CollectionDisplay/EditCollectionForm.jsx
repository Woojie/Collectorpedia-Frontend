import React, {Component} from 'react'
import axios from 'axios';
import {Button, Grid, Form, Input, Segment, Divider,  TextArea, Label} from 'semantic-ui-react'



class EditCollectionForm extends Component {
  state={
    name: '',
    type: '',
    description: '',
    collectionExists: false,
    enterName: false,
    customInput: []

  }

  componentDidMount(){
    let {customInput1, customInput2, customInput3, name, type, description} = this.props

    this.setState({
      customInput1,
      customInput2,
      customInput3,
      name,
      type,
      description,
    }, ()=>{
      let customNumber=0
      let customInput = [{num:1}, {num:2}, {num:3}]

      if(customInput1 !== null){
        customNumber =1      
      }
      if(customInput2 !== null){
        customNumber = 2       
      }
      if(customInput3 !== null){
        customNumber = 3
      }
      this.setState({
        customInput,
        customNumber,
      })

    })

  }

  handleChange = (e) =>{
    this.setState({[e.target.name]:e.target.value})}

  handleSubmit = (e) =>{
    let {customInput1, customInput2, customInput3, name, type, description} = this.state
    let user = this.props.user
    let otherCollectionValidate = user.collections.filter((collection)=>collection.name.toLowerCase() !== this.props.name.toLowerCase())
    let newCollections

    if(otherCollectionValidate.some((collection)=>
      collection.name.toLowerCase() === name.toLowerCase())){
        this.setState({collectionExists: true})
    }else if( name.length < 3){
      this.setState({enterName: true, collectionExists:true})
      
    }else{
      newCollections =  {
        name,
        type,
        description,
        customInput1: customInput1 ? customInput1 : null,
        customInput2: customInput2 ? customInput2 : null,
        customInput3: customInput3 ? customInput3 : null,
        collection:this.props.collection,
        id: this.props.id
      }

    }
    user.collections = otherCollectionValidate.concat(newCollections)
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
    this.props.modalClosed()
    window.location.reload()
  }

  render(){
    const {collectionExists, enterName, name, type, description, customInput, customInput1, customInput2, customInput3} = this.state
    let customInputs = customInput.map((input)=>(
      <Form.Field 
      control={Input} 
      label={`customInput${input.num}`}
      placeholder="Leave empty to not use" 

      name={`customInput${input.num}`}
      onChange={this.handleChange}
      value= {input.num === 1 ? customInput1 : [input.num === 2 ? customInput2 : customInput3]}
    />
    ))


    return(
      <Grid stackable centered >
      <Grid.Row >
        <Grid.Column width={4} />
          <Grid.Column width={10} textAlign='center' >
          <Segment raised>
            <Divider hidden />
            <Form onSubmit={this.handleSubmit}>
              <Form.Field
                control={Input}
                error={collectionExists}
                label="Name of Collection"
                name="name"
                value={name}
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
                value={type}
                placeholder="music.. memorabilia.. shoes.."
                onChange={this.handleChange}
              />          
              <Form.Field
                control={TextArea}
                label="Describe Your Collection!"
                name="description"
                placeholder="What kind of collection is it"
                onChange={this.handleChange}
                value={description}
              />
                {customInputs}
              <Form.Field
                control={Button}
                content='Edit Collection'
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

export default EditCollectionForm
