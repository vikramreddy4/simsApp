import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "semantic-ui-css/semantic.min.css";
import 'react-datepicker/dist/react-datepicker.css';

import './App.css';
import appSyncConfig from "./AppSync";
import { ApolloProvider } from "react-apollo";
import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from "aws-appsync-react";

import ViewUser from './Components/user/View';
import UsersList from './Components/user/List';

import ViewProduct from './Components/product/View';
import ProductsList from './Components/product/List';

import ViewStock from './Components/stock/View';
import StocksList from './Components/stock/List';

import ViewCustomer from './Components/customer/View';
import CustomersList from './Components/customer/List';

import ViewOrder from './Components/order/View';
import OrdersList from './Components/order/List';

const App = () => (
  <Router path="/" component={App}>
    <div>
      <Route exact={true} path="/" component={UsersList} />
      <Route path="/users" component={UsersList} />
      <Route path="/user/:id" component={ViewUser} />
      <Route path="/customers" component={CustomersList} />
      <Route path="/customer/:id" component={ViewCustomer} />
      <Route path="/products" component={ProductsList} />
      <Route path="/product/:id" component={ViewProduct} />
      <Route path="/stocks/:productId" component={StocksList} />
      <Route path="/stock/:productId/:id" component={ViewStock} />
      <Route path="/orders/:customerId" component={OrdersList} />
      <Route path="/order/:customerId/:id" component={ViewOrder} />
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
