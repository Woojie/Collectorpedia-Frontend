import React, {Component} from 'react'
import { List, Label, Modal, Button, Icon} from 'semantic-ui-react'
import './individualItem.css'
import Camera from './Camera/index'
import "react-responsive-carousel/lib/styles/carousel.min.css";

class IndivdualItem extends Component{
  state = {
    cameraOn: false
  }
  handleCameraClick = () => {
    this.setState({cameraOn: !this.state.cameraOn})
  }
  render(){
  const {collection:{name, description, id}, userId, handleItemDelete, collectionId} = this.props
  
  let itemDescription = description ? <p><b>Description: </b>{description}</p>: ""

  let camera = this.state.cameraOn ?  <Camera handleCameraClick={this.handleCameraClick} userId={userId} collectionId={collectionId} itemId={id} handleAddImage={this.props.handleAddImage} /> :""
  let hideButton = {
    display: this.state.cameraOn ? "none" : "block"
  }
  const backgroundColor ={
    backgroundColor: "red"
  }

  return(
    <List.Item>
        <List.Content id="betterMargins">
        <Label.Group id="labelPosition"> 
        <Modal style={backgroundColor} trigger= {          
          <Icon.Group size='large'>
            <Icon name='picture' />
            <Icon corner name='add' />
          </Icon.Group>}
        >
          <Modal.Header >
            Take a picture of the item!
          </Modal.Header>
          <Modal.Content>
          <Button style={hideButton} icon labelPosition='left' onClick={this.handleCameraClick}>
            Turn Camera On
            <Icon name='camera' color='green' />
          </Button>
            {camera}
          </Modal.Content>
        </Modal>
        <Label size="mini" as="a"  onClick={()=>handleItemDelete(id, collectionId )} >
          <Icon name="times" color="red" />
        </Label>
        </Label.Group>
              <List.Header  as='h5'>
                {name}
              </List.Header>
              <List.Description>
                {itemDescription}
              </List.Description>

            </List.Content>
          </List.Item>        
  )
  }
}

export default IndivdualItem
