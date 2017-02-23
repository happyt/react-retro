import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import ListItem from './ListItem';

export default class ListManager extends PureComponent {
  render () {
    const { items, searchBar, setSearchBar, toggleModal, deleteItem } = this.props;
    return (

      <div className="container scrollable">
        <div className="row text-left">
          <Link to="/items/add" className="btn btn-danger">Add a new entry!</Link>
        </div>
        <div className="row">
          <input
            type="search" placeholder="Search by Name" className="form-control search-bar" onKeyUp={setSearchBar} />
        </div>
        <div className="row">
        {
    // An item is only shown if its name contains the string from the searchBar
          items
            .filter(item => item.name.toLowerCase().includes(searchBar))
            .map((item, i) => {
              return (
                <ListItem  {...item}
                  key={item._id}
                  i={i}
                  toggleModal={toggleModal}
                  deleteItem={deleteItem}
                />
              );
            })
        }
        </div>
        <hr />
      </div>

    );
  }
}