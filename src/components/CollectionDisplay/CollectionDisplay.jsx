import React, {Component} from 'react'
import {Card, Button, Label, Icon, Modal} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import './collectionDisplay.css'
import EditCollectionForm from './EditCollectionForm'

class CollectionDisplay extends Component {
  state={
    modalOpen: false
  }
  handleOpen = () => {
    this.setState({modalOpen:true})
  }
  handleClose = () => {
    this.setState({modalOpen: false})
  }
  render(){
  let { user, handleDelete, id, collection:{name, type, description}, collection, handleCollection} = this.props

  let length = collection.collection.length === 0 ? 'None' : collection.collection.length

  let collectionType = type.length === 0 ? "" : <p><b>Type: </b>{type}</p>
  let collectionDescription = description.length === 0 ? "" : <p><b>Description: </b>{description}</p>
  const backgroundColor ={
    backgroundColor: "whitesmoke"
  }
  return(

    <Card id="shadows" raised color='brown' >
      <Link to={`/collection/${name}`} onClick={()=>handleCollection(id)}>
        <Card.Content textAlign="center" as='h3' header={name} />
      </Link>
      <Card.Content>
        <Card.Description>
          {collectionType}
          {collectionDescription}
        </Card.Description>
      </Card.Content>
      <Card.Content extra> 
        <Label><Icon name="clipboard list" />Items: {length}</Label>
        <Button.Group floated='right' size='mini'>
        <Modal trigger={
          <Button icon onClick={this.handleOpen}><Icon name='edit' />Edit</Button>
        }
          style={backgroundColor}
          open={this.state.modalOpen}
          onClose={this.modalClose}
        >
        <Modal.Header>
          {`Edit ${name}`}
          <Button onClick={this.handleClose} floated='right' icon="times" content="Close" size="tiny" negative/>
        </Modal.Header>
        <Modal.Description>
          <EditCollectionForm
            user={user}
            name={name}
            type={type}
            description={description} 
            customInput1={collection.customInput1}
            customInput2={collection.customInput2}
            customInput3={collection.customInput3}
            collection={collection.collection}
            id={id}
            handleClose = {this.handleClose}
            modalClosed = {this.props.modalClosed}
          />
        </Modal.Description>
        
        </Modal>
        <Button icon negative onClick={() =>handleDelete(id)}><Icon name='trash alternate' />Delete</Button>
        </Button.Group>
      </Card.Content>
    </Card>
  )
}
}

export default CollectionDisplay