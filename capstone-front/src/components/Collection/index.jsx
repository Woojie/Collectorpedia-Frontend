import React, {Component} from 'react'
import axios from 'axios';
import {Header, Grid, Loader, Dimmer, Button, Modal, Card, Divider, Icon} from 'semantic-ui-react'
import CreateCollectionForm from './CreateCollectionForm'
import CollectionDisplay from '../CollectionDisplay/CollectionDisplay'
import { Route } from 'react-router-dom'
import IndCollection from '../IndividualCollection/IndCollection'


class Collection extends Component {
state={
  loader:true,
  clickedItem: [],
  createModalOpen: false,
  update: 0
}

componentDidMount(){

  axios({
    method: 'get',
    url: 'http://localhost:3030/user/',
    withCredentials: true,
    crossDomain: true,
  })
    .then((res)=>{

      this.setState({
        userData: res.data.user
      }, () => {
        this.setState({
          loader: false
        })
      })
    })
}

CreateModalClose = () => this.setState({ createModalOpen: false })

CreateModalOpen = () => this.setState({ createModalOpen: true })

handleDelete = (id) => {
  let user = this.state.userData
  user.collections = user.collections.filter((collection)=>collection.id!==id)

  axios({
    method: 'put',
    url:'http://localhost:3030/user/',
    withCredentials: true,
    crossDomain: true,
    data:({
      user:user    
    })
  })
  .then(
    this.setState({userData: user}, ()=>{window.location.reload()})
  )
}

handleItemDelete = (id, collectionId) =>{
  let user = this.state.userData
  let newUser = user.collections.filter((collection)=>collection.id !== collectionId)
  let foundCollection = this.state.userData.collections.find((collection)=>collection.id === collectionId)
  let deleteItem = foundCollection.collection.filter((item)=> item.id !== id)

  foundCollection.collection = deleteItem
  newUser = newUser.concat(foundCollection)
  user.collections = newUser

  axios({
    method: 'put',
    url:'http://localhost:3030/user/',
    withCredentials: true,
    crossDomain: true,
    data:({
      user:user
    })
  })
  .then(
    this.setState({userData: user})
  )
}

modalClosed = () =>{
  console.log('updated')
  this.setState({update: this.state.update+1})

}

handleCollection = (id) =>{
  this.setState({
    clickedItem: this.state.userData.collections.find((elem)=>elem.id === id)
  })
}

handleAddImage = (image, id, collectionId) =>{

  let user = this.state.userData
  let newUser = user.collections.filter((collection)=>collection.id !== id)
  let foundCollection = user.collections.find((collection)=>collection.id === id)
  let foundItem = foundCollection.collection.find((item)=>item.id === collectionId)
  let newItem = foundCollection.collection.filter((item)=>item.id !== collectionId)
  if(foundItem.image !== undefined){
    foundItem.image = foundItem.image.concat([(image)])

  }else{
    foundItem.image = [(image)]

  }
  newItem = newItem.concat(foundItem)
  foundCollection.collection = newItem
  newUser = newUser.concat(foundCollection)
  user.collections = newUser
  
  axios({
    method: 'put',
    url:'http://localhost:3030/user/',
    withCredentials: true,
    crossDomain: true,
    data:({
      user:user
    })
  })
  .then(
    this.setState({userData: user})
  )
}

render(){
  const {userData, createModalOpen, clickedItem} = this.state

  let collectionItems = userData ?
  userData.collections.map((collection)=>
  <CollectionDisplay 
    user={userData}
    key={collection.id}
    handleDelete={this.handleDelete} 
    id={collection.id}
    collection={collection}
    handleCollection = {this.handleCollection}
    modalClosed = {this.modalClosed}
  />)
  : ""
  const backgroundColor ={
    backgroundColor: "whitesmoke"
  }
  return(
    this.state.loader ? <Dimmer active><Loader>Loading</Loader></Dimmer> :(
      <Grid stackable centered>
        <Grid.Row>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header as='h2' color='brown' textAlign='center' content="Your Collections" />
            <Modal style={backgroundColor} open={createModalOpen} onClose={this.CreateModalClose} 
              trigger={<Button positive icon labelPosition='left' onClick={this.CreateModalOpen}>
                <Icon name='file alternate' />
                Create Collection
              </Button>}>
              <Modal.Header >
                Build Your Collection
              </Modal.Header>
              <Modal.Description>
                <CreateCollectionForm 
                  userData={userData} 
                  handleClose={this.CreateModalClose} 
                />
              </Modal.Description>
            </Modal>
            <Divider />
            <Card.Group>
              {collectionItems}
            </Card.Group>
          </Grid.Column>
          
          <Grid.Column width={11}>
          <Route path="/collection/:collectionId"  render={(props)=>
            <IndCollection {...props} 
              collection={clickedItem} 
              user={userData} 
              handleItemDelete={this.handleItemDelete} 
              handleAddImage={this.handleAddImage}
              modalClosed = {this.modalClosed}
            />
          } 
          />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  )
}
}


export default Collection