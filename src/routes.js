import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { Home, Welcome, About, Contact, Listing } from './components';
import { Container, AddToContainer } from './containers';

// Use hashHistory for easier development
const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={Home}>
      <IndexRoute component={Welcome} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
    </Route>
    <Route path="/items" component={Listing}>
      <IndexRoute component={Container} />
      <Route path="add" component={AddToContainer} />
    </Route>
  </Router>
);

export default routes;