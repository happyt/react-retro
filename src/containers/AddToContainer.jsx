import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Form } from '../components';

export default class AddToContainer extends Component {
  constructor (props) {
    super(props);
    // Initial state
    this.state = { newItem: {}};
    // Bind this (context) to the functions to be passed down to the children components
    this.submit = this.submit.bind(this);
    this.uploadPicture = this.uploadPicture.bind(this);
    this.setItem = this.setItem.bind(this);
  }
  submit () {
    // We create the newItem object to be posted to the server
  //  const newItem = Object.assign({}, { picture: $('#picture').attr('src') }, this.state.newItem);
    const newItem = Object.assign({}, {}, this.state.newItem);
    fetch('http://localhost:8080/items', {
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      method: 'POST',
      body: JSON.stringify(newItem)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      // We go back to the items list view
      hashHistory.push('/items');
    });
  }
  uploadPicture () {
//     filepicker.pick (
//       {
//         mimetype: 'image/*', // Cannot upload other files but images
//         container: 'modal',
//         services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'URL', 'IMGUR', 'PICASA'],
//         openTo: 'COMPUTER' // First choice to upload files from
//       },
//       function (Blob) {
//         console.log(JSON.stringify(Blob));
// //        $('#picture').attr('src', Blob.url);
//       },
//       function (FPError) {
//         console.log(FPError.toString());
//       }
//     );
  }
  // We make sure to keep the state up-to-date to the latest input values
  setItem () {
    const newItem = {
      name: document.getElementById('name').value,
      description: document.getElementById('description').value,
      year: document.getElementById('year').value,
 //     picture: $('#picture').attr('src')
    };
    this.setState({ newItem });
  }
  render () {
    return <Form submit={this.submit} uploadPicture={this.uploadPicture} setItem={this.setItem} />
  }
}