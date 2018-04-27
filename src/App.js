import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "semantic-ui-css/semantic.min.css";
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from "react-router-dom";

import './App.css';
import appSyncConfig from "./AppSync";
import { ApolloProvider } from "react-apollo";
import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from "aws-appsync-react";

import AllEvents from './Components/AllEvents';
import NewEvent from './Components/NewEvent';
import ViewEvent from './Components/ViewEvent';
import ContactsList from './Components/contacts/ContactsList';
import Header from './Components/Header';

import ViewUser from './Components/users/View';
import UsersList from './Components/users/List';

import ViewProduct from './Components/products/View';
import ProductsList from './Components/products/List';


/*
const Home = () => (
  <div className="ui container">
    <Link to={`/`}>Home</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
    <Link to={`/users`}>Users</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
    <Link to={`/products`}>Products</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
  </div>
);
const EventsList = () => (
  <div className="ui container">
    <Home/>
    <h1 className="ui header">All Events</h1>
    <AllEvents />
  </div>
);
*/
const App = () => (
  <Router path="/" component={App}>
    <div>
      <Route exact={true} path="/" component={UsersList} />
      <Route path="/users" component={UsersList} />
      <Route path="/user/:id" component={ViewUser} />
      <Route path="/products" component={ProductsList} />
      <Route path="/product/:id" component={ViewProduct} />
    </div>
  </Router>
  /*
  <Route path="/events" component={EventsList} />
  <Route path="/contacts" component={ContactsList} />
  <Route path="/newEvent" component={NewEvent} />
  <Route path="/event/:id" component={ViewEvent} />
  */
);

const client = new AWSAppSyncClient({
  url: appSyncConfig.graphqlEndpoint,
  region: appSyncConfig.region,
  auth: {
    type: appSyncConfig.authenticationType,
    apiKey: appSyncConfig.apiKey,
  }
});

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>
);

export default WithProvider;
