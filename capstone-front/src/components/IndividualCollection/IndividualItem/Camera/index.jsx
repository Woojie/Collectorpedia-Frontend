import React, {Component} from 'react';
import {GrabCamera} from './GrabCamera';
import axios from 'axios';
import { Button, Grid, Dimmer, Loader} from 'semantic-ui-react'

class Camera extends Component {
  constructor() {
    super();
    this.webcam = null;
    this.state = {
      capturedImage: null,
      captured: false,
      uploading: false
    }
  }

  componentDidMount() {
    this.canvasElement = document.createElement('canvas');
    this.webcam = new GrabCamera(document.getElementById('webcam'), this.canvasElement);
    this
      .webcam
      .setup()
      .catch(() => {
        alert('Error getting access to your camera');
      });
  }

  componentDidUpdate(prevProps) {
    if (!this.props.offline && (prevProps.offline === true)) {
      this.batchUploads();
    }
  }

  captureImage = async() => {
    const capturedData = this
      .webcam
      .takeBase64Photo({type: 'jpeg', quality: 10});
    this.setState({captured: true, capturedImage: capturedData.base64});
  }

  discardImage = () => {
    this.setState({captured: false, capturedImage: null})
  }
  uploadImage = () => {
    if (this.props.offline) {
      const prefix = `${this.props.itemId}`;
      const rs = Math.random().toString(36).substr(2, 5);
      localStorage.setItem(`${prefix}${rs}`, this.state.capturedImage);
      alert('Image saved locally, it will be uploaded when you go online!');
      this.discardImage();

  } else {
      this.setState({ 'uploading': true });
      axios
      .post(
          `https://api.cloudinary.com/v1_1/dxgxhh12i/image/upload`,
          {
              file: this.state.capturedImage,
              upload_preset: 'zj3nyyfu',
              api_key: 673998966196246
          }
      ).then(
          (data) => {this.checkUploadStatus(data)
          this.props.handleAddImage(data.data.secure_url, this.props.collectionId, this.props.itemId)}

      ) 
  }
  }

  turnCameraOff = () => {
  this
    .webcam
    .turnCameraOff()
  
  this.props.handleCameraClick()
  }


  findLocalItems = (query) => {
    var i,
      results = [];
    for (i in localStorage) {
      if (localStorage.hasOwnProperty(i)) {
        if (i.match(query) || (!query && typeof i === 'string')) {
          const value = localStorage.getItem(i);
          results.push({key: i, val: value});
        }
      }
    }
    return results;
  }

  checkUploadStatus = (data) => {
    this.setState({'uploading': false});
    if (data.status === 200) {
      alert('Image has been Uploaded!')
      this.setState({imageUrl: data.data.secure_url}, ()=>this.discardImage())
    } else {
      alert('Sorry, we encountered an error uploading your image');
    }
  }

  render() {
    const imageDisplay = this.state.capturedImage
      ? <img src={this.state.capturedImage} alt="captured" width="350"/>
      : <span/>;

    const buttons = this.state.captured
      ? <div>
          <Button onClick={this.discardImage}>
            Delete Photo
          </Button>
          <Button onClick={this.uploadImage}>
            Upload Photo
          </Button>
        </div>
      : <div><Button onClick={this.captureImage}>
        Take Picture
        </Button>
        <Button onClick={this.turnCameraOff}>
            Turn Camera Off
          </Button>
          </div>

    const uploading = this.state.uploading
      ?
              <Dimmer active><Loader /></Dimmer>
      : <span/>

    return (

        <Grid stackable>
        <Grid.Row>
          <Grid.Column width={3} />
          <Grid.Column width={10}>
            {uploading}
            <video autoPlay playsInline muted id="webcam" width="100%" height="200"/>
            <br/>
            <div className="imageCanvas">
              {imageDisplay}
            </div>
            {buttons}
            </Grid.Column>
            <Grid.Column width={3} />
        </Grid.Row>
        </Grid>

    )
  }

}
export default Camera;