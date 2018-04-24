import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

import QueryGetUser from "../../GraphQL/QueryGetUser";
import MutationPutUser from "../../GraphQL/MutationPutUser";
import QueryAllUsers from "../../GraphQL/QueryAllUsers";

class ViewUser extends Component {

  constructor() {
    super();
    this.state = {
      user: {
        id:'',
        name: '',
        accessCode: '',
        userId: '',
      }
    };
  };

  static defaultProps = {
      putUser: () => null,
  }

  handleSave = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if(this.props.match.params.id === 'new') {
        this.state.user.id = uuid();
      }else {
        this.state.user.id = this.props.match.params.id;
      }
      const { putUser, history } = this.props;
      const { user } = this.state;
      console.log(user);
      await putUser(user);

      history.push('/users');
  }

  handleChange(field, { target: { value } }) {
      console.log(this.state.user.name);
      const { user } = this.state;
      console.log(user);
      user[field] = value;
      this.setState({ user });
      console.log(this.state.user.name);
  }

  componentDidMount() {
    console.log('setting properties');
    if(this.props.user) {
      var {user} = this.state;
      console.log(user);
      user.name = this.props.user.name;
      user.accessCode = this.props.user.accessCode;
      user.userId = this.props.user.userId;
      console.log(user);
      this.setState({user:user});
      console.log('properties were set : ');
      console.log(this.state.user);
    }else {
      console.log('Unable to set properties');
    }
    console.log('done setting properties');
  }

    render() {
        const { user, loading } = this.props;
        var title = "Create User";
        if(user) {
          title = "Update User";
        }
        return (
          <div className="ui container raised very padded segment">
          <div className="ui form">
              <h1 className="ui header">{title}</h1>
              <div className="field required eight wide">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" value={this.state.user.name} onChange={this.handleChange.bind(this,'name')}/>
              </div>
              <div className="field required eight wide">
                  <label htmlFor="accessCode">Access code</label>
                  <input type="text" id="accessCode" value={this.state.user.accessCode} onChange={this.handleChange.bind(this,'accessCode')}/>
              </div>
              <div className="field required eight wide">
                  <label htmlFor="userId">User Id</label>
                  <input type="text" id="userId" value={this.state.user.userId} onChange={this.handleChange.bind(this,'userId')}/>
              </div>
              <input type="hidden" id="id" value={this.props.match.params.id}/>
          </div>
          <br/>
          <div className="ui buttons">
              <Link to="/users" className="ui button">Cancel</Link>
              <div className="or"></div>
              <button className="ui positive button" onClick={this.handleSave}>Save</button>
          </div>
        </div>
        );
    }
}

export default compose (
  graphql(
      QueryGetUser,
      {
          options: ({ match: { params: { id } } }) => ({
              variables: { id },
              fetchPolicy: 'cache-and-network',
          }),
          props: ({ data: { getUser: user, loading} }) => ({
              user,
              loading,
          }),
      }
  ),
  graphql(
        MutationPutUser,
      {
          options: {
              refetchQueries: [{ query: QueryAllUsers }],
              update: (proxy, { data: { putUser } }) => {
                  const query = QueryAllUsers;
                  const data = proxy.readQuery({ query });
                  data.listUsers.items = [...data.listUsers.items.filter(e => e.id !== putUser.id), putUser];
                  proxy.writeQuery({ query, data });
              }
          },
          props: (props) => ({
              putUser: (user) => {
                  return props.mutate({
                      variables: {...user},
                      optimisticResponse: () => ({
                          putUser: {
                              ...user, __typename: 'User'
                          }
                      }),
                  })
              }
          })
      }
  )
)(ViewUser);
