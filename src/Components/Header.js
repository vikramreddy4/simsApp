import React from "react";
import { Link } from "react-router-dom";
import { withAuthenticator} from 'aws-amplify-react';
import { Auth } from "aws-amplify";

export class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username:'',
    };
  }

  async signOut() {
    let user = await Auth.currentAuthenticatedUser();
    user.globalSignOut();
  }

  async componentDidMount() {
    try {
      if (await Auth.currentSession()) {
        console.log("found session");
        console.log('Auth.currentSession() '+Auth.currentSession());
        let user = await Auth.currentAuthenticatedUser();
        console.log('user '+user);
        console.log('user name '+user.username);
        this.setState({ username: user.username });
      }
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  }

  render() {
    return (
      <div className="ui container">
        Welcome {this.state.username}&nbsp;&nbsp;|&nbsp;&nbsp;
        <Link to={`/`}>Home</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
        <Link to={`/users`}>Employees</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
        <Link to={`/products`}>Products</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
        <Link to={`/customers`}>Customers</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
        <Link to={`/`} onClick={this.signOut}>Signout</Link>
      </div>
    );
  }
}

export default withAuthenticator(Header);
