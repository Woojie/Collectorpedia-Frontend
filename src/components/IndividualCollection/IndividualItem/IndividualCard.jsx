import React, {Component} from 'react'
import { Image, Card, Label, Modal, Button, Icon} from 'semantic-ui-react'
import './individualItem.css'
import Camera from './Camera/index'
import uuidv4 from 'uuid/v4'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

class IndivdualItem extends Component{
  state = {
    cameraOn: false
  }
  handleCameraClick = () => {
    this.setState({cameraOn: !this.state.cameraOn})
  }
  render(){
  const {collection:{name, description, value, id, customInput1, customInput2, customInput3, image}, userId, csInput1, csInput2, csInput3, handleItemDelete, collectionId} = this.props
  
  let itemDescription = description ? <p><b>Description: </b>{description}</p>: ""
  let itemValue = value ? <p><b>Value: </b>{value}</p>  : ""
  let itemCustomInput1 = customInput1[0] !== null ? <p><b>{csInput1}</b>: {customInput1[1]}</p> : ""
  let itemCustomInput2 = customInput2[0] !== null ? <p><b>{csInput2}</b>: {customInput2[1]}</p> : ""
  let itemCustomInput3 = customInput3[0] !== null ? <p><b>{csInput3}</b>: {customInput3[1]}</p> : ""
  let itemImages =  image === undefined ? <Image src='/images/sample.png' /> : [image.length === 1 ? 
    <Image size="small" centered rounded id="shadow-image" src={image[0]} /> 
    : <Carousel emulateTouch showStatus={true} showThumbs={false} swipeable={true} width="10em" >
    {image.map((img)=><img id='responsive' alt='/images/sample.png' src={img} key={uuidv4()}/>)}
    </Carousel>
    ]
  let camera = this.state.cameraOn ?  <Camera handleCameraClick={this.handleCameraClick} userId={userId} collectionId={collectionId} itemId={id} handleAddImage={this.props.handleAddImage} /> :""
  let hideButton = {
    display: this.state.cameraOn ? "none" : "block"
  }
  const backgroundColor ={
    backgroundColor: "red"
  }

  return(
    <Card  id="shadow-item">
         {itemImages}
        <Card.Content id="betterMargins">
        <Card.Meta>

        </Card.Meta>
        <Card.Header  as='h3'>
          {name}
        </Card.Header>
        <Card.Description>
          {itemValue}
          {itemCustomInput1}
          {itemCustomInput2}
          {itemCustomInput3}
          {itemDescription}
        </Card.Description>
        </Card.Content>
      <Card.Content extra>
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
      </Card.Content>


    </Card>        
  )
  }
}

export default IndivdualItem
