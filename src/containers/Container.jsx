import React, { Component } from 'react';
import { Modal, ListManager } from '../components';

export default class Container extends Component {
  constructor (props) {
    super(props);
    // The initial state
    this.state = { items: [], selectedItem: {}, searchBar: '' };
    // Bind the functions to this (context) 
    this.toggleModal = this.toggleModal.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setSearchBar = this.setSearchBar.bind(this);
  }

  // Once the component mounted it fetches the data from the server
  componentDidMount () {
    this.getItems();
  }

  toggleModal (index) {
    this.setState({ selectedItem: this.state.items[index] });
    // Since we included bootstrap we can show our modal through its syntax
 //   $('#item-modal').modal();
  }

  getItems () {
    fetch('http://localhost:8080/items', {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(response => response.json()) // The json response to object literal
    .then(data => this.setState({ items: data }));
  }

  deleteItem (id) {
    fetch(`http://localhost:8080/items/${id}`, {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(response => {
      // The item is also removed from the state thanks to the filter function
      this.setState({ items: this.state.items.filter(item => item._id !== id) }); 
      console.log(response.message);
    });
  }

  setSearchBar (event) { 
    // Super still filters super mario thanks to toLowerCase
    this.setState({ searchBar: event.target.value.toLowerCase() });
  }

  render () {
    const { items, selectedItem, searchBar } = this.state;
    return (
      <div>
        <Modal item={selectedItem} />
        <ListManager
          items={items}
          searchBar={searchBar}
          setSearchBar={this.setSearchBar}
          toggleModal={this.toggleModal}
          deleteItem={this.deleteItem}
        />
      </div>
    );
  }
}