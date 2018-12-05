import React, {Component} from 'react'
import {Grid, Header, Divider, List, Button, Icon, Modal, Card, Item, Label, Dropdown} from 'semantic-ui-react'
import AddItemForm from './IndividualItem/AddItemForm'
import IndividualItem from './IndividualItem/IndividualItem'
import IndividualCard from './IndividualItem/IndividualCard'
import IndividualList from './IndividualItem/IndividualList'
import func from './func'
import uuidv4 from 'uuid/v4'

class IndCollection extends Component {
state ={
  modalOpen: false,
  selectedValue: 'name',
  view: "item"

}
handleOpen = () => this.setState({ modalOpen: true })

handleView = (e, {value}) => this.setState({view:value})

handleClose = () => this.setState({ modalOpen: false })

changeSelect = (e, {value}) => this.setState({selectedValue: value})

  render(){
    let {collection:{collection, id, name, customInput1, customInput2, customInput3 }, user, handleItemDelete, handleAddImage} = this.props
    let {modalOpen, selectedValue, view} = this.state
    

    let collectionItems;
    if (collection === undefined){
      let marginTop = {
        marginTop: "5em"
      }
      return(
        <Header as='h2' style={marginTop} content="<==== Click on a collection!" textAlign="center" />
      )

    }else{

    if (view === "item"){
    collectionItems = collection.map((item)=><IndividualItem
    userId={user._id} 
    handleItemDelete={handleItemDelete} 
    handleAddImage={handleAddImage} 
    collection={item} 
    collectionId={id}  
    key={item.id}
    csInput1 = {customInput1}
    csInput2 = {customInput2}
    csInput3 = {customInput3}
    user={user}
    modalClosed = {this.props.modalClosed}
     />
    )

  }else if(view === "card"){

    collectionItems = collection.map((item)=><IndividualCard
    userId={user._id} 
    handleItemDelete={handleItemDelete} 
    handleAddImage={handleAddImage} 
    collection={item} 
    collectionId={id}  
    key={item.id}
    csInput1 = {customInput1}
    csInput2 = {customInput2}
    csInput3 = {customInput3}
    user={user}
    modalClosed = {this.props.modalClosed}
     />)

  }else{
    collectionItems = collection.map((item)=><IndividualList
    userId={user._id} 
    handleItemDelete={handleItemDelete} 
    handleAddImage={handleAddImage} 
    collection={item} 
    collectionId={id}  
    key={item.id} />)

  }

    let selectOptions = []
    if(customInput1 === null){
      selectOptions = [
        {key:uuidv4(), value: "name", name: 'name', text: "Name" },
        {key: uuidv4(), value: "value", name: 'name', text: "Value"},
      ]
    }else if(customInput2 === null){
      selectOptions = [
        {key:uuidv4(), value: "name", name: 'name', text: "Name" },
        {key: uuidv4(), value: "value", name: 'name', text: "Value"},
        {key: uuidv4(), value: "customInput1", name: 'customInput1', text: customInput1},
      ]
    }else if(customInput3 === null){
      selectOptions = [
        {key:uuidv4(), value: "name", name: 'name', text: "Name" },
        {key: uuidv4(), value: "value", name: 'name', text: "Value"},
        {key: uuidv4(), value: "customInput1", name: 'customInput1', text: customInput1},
        {key: uuidv4(), value: "customInput2", name: 'customInput2', text: customInput2},
      ]
    }else{
      selectOptions = [
        {key:uuidv4(), value: "name", name: 'name', text: "Name" },
        {key: uuidv4(), value: "value", name: 'name', text: "Value"},
        {key: uuidv4(), value: "customInput1", name: 'customInput1', text: customInput1},
        {key: uuidv4(), value: "customInput2", name: 'customInput2', text: customInput2},
        {key: uuidv4(), value: "customInput3", name: 'customInput3', text: customInput3},
      ]
    }

    func.sortItem(selectedValue, collectionItems)

    const backgroundColor ={
      backgroundColor: "whitesmoke"
    }
    const floatDropdown = {
      float: "right"
    }

    let newCollections = view === "item" ? <Item.Group divided>{collectionItems}</Item.Group> 
    :  [view === "card" ? <Card.Group>{collectionItems}</Card.Group>
    : <List divided relaxed>{collectionItems}</List>]

    return(
      <div>
      
        <Divider hidden />

      <Grid stackable celled="internally">
      <Grid.Row>
        <Grid.Column width={12}>
          <Header as='h2' textAlign='left'>{name}</Header>
          <Modal style={backgroundColor} open={modalOpen} onClose={this.handleClose} 
        trigger={ 
          <Button icon onClick={this.handleOpen}>
            <Icon name='add'/>
            Item
          </Button>
        }>
        <Modal.Header>Add an Item to {name}</Modal.Header>
        <Modal.Description>
          <AddItemForm
            handleClose={this.handleClose} 
            user = {user}
            id={id}
            collection = {this.props.collection}
          />
        </Modal.Description>
      </Modal>
            <Label>
      <Icon name='sort'/>
        Sort By:
    </Label>
    <Dropdown 
      options={selectOptions} 
      onChange={this.changeSelect} 
      selection  
    />
    <Dropdown text="View" style={floatDropdown}>
      <Dropdown.Menu>
        <Dropdown.Item onClick={this.handleView} icon="th list" text="Item" value="item" />
        <Dropdown.Item onClick={this.handleView} icon="th" text="Card"  value="card"/>
        <Dropdown.Item onClick={this.handleView} icon="list" text="List" value="list" />
      </Dropdown.Menu>
    </Dropdown>
          <Divider />
            {newCollections}
        </Grid.Column>
        <Grid.Column width={4} />
      </Grid.Row>
    </Grid>
    </div>
    )
      }
  }
}

export default IndCollection