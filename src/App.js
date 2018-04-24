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
import ViewUser from './Components/users/ViewUser';
import ContactsList from './Components/contacts/ContactsList';
import UsersList from './Components/users/UsersList';

const Home = () => (
  <div className="ui container">
    <Link to={`/`}>Home</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
    <Link to={`/events`}>Events</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
    <Link to={`/users`}>Users</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
    <Link to={`/stock`}>Inventory</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
    <Link to={`/products`}>Products</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
    <Link to={`/newEvent`}>New Event</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
    <Link to={`/contacts`}>Contacts</Link>
  </div>
);
/*
const Home = () => (
  <div className="ui container">
    <h1 className="ui header">Index</h1>
    <Link to={`/events`} className="card">
        <div className="content">
            Events
        </div>
    </Link>
    <Link to={`/stock`} className="card">
        <div className="content">
            Inventory
        </div>
    </Link>
    <Link to={`/products`} className="card">
        <div className="content">
            Products
        </div>
    </Link>
    <Link to={`/eventsList`} className="card">
        <div className="content">
            Users
        </div>
    </Link>
  </div>
);
*/
const EventsList = () => (
  <div className="ui container">
    <Home/>
    <h1 className="ui header">All Events</h1>
    <AllEvents />
  </div>
);

const App = () => (
  <Router path="/" component={App}>
    <div>
      <Route exact={true} path="/" component={Home} />
      <Route path="/events" component={EventsList} />
      <Route path="/users" component={UsersList} />
      <Route path="/contacts" component={ContactsList} />
      <Route path="/user/:id" component={ViewUser} />
      <Route path="/event/:id" component={ViewEvent} />
      <Route path="/newEvent" component={NewEvent} />
    </div>
  </Router>
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
