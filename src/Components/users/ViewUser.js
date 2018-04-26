import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

import QueryGetUser from "../../GraphQL/QueryGetUser";
import MutationPutUser from "../../GraphQL/MutationPutUser";
import MutationCreateUser from "../../GraphQL/MutationCreateUser";
import MutationUpdateUser from "../../GraphQL/MutationUpdateUser";
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
        active:true,
      },
      errors: {
        name: true,
        accessCode: true,
        userId: true,
      }
    };
  };

  static defaultProps = {
      putUser: () => null,
      createUser: () => null,
      updateUser: () => null,
  }

  validateInputs(name, accessCode, userId) {
    // true means invalid, so our conditions got reversed
    return {
      name: name.length === 0,
      accessCode: accessCode.length === 0,
      userId: userId.length === 0,
    };
  }

  handleSave = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      const { createUser, updateUser, history } = this.props;
      if(this.props.match.params.id === 'new') {
        this.state.user.id = uuid();
        const { user } = this.state;
        console.log(user);
        await createUser(user);
      }else {
        this.state.user.id = this.props.match.params.id;
        const { user } = this.state;
        console.log(user);
        await updateUser(user);
      }

      history.push('/users');
  }

  handleChange(field, event) {
      console.log(event.target.type);
      const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
      console.log(value);
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
        const errors = this.validateInputs(this.state.user.name, this.state.user.accessCode, this.state.user.userId);
        const isEnabled = !Object.keys(errors).some(x => errors[x]);
        var title = "Create User";
        if(user) {
          title = "Update User";
        }
        return (
          <div className="ui container raised very padded segment">
          <div className="ui form">
              <h1 className="ui header">{title}</h1>
              <div>Fields marked * are mandatory.</div>
              <br/>
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
              <div className="field required eight wide">
                  <label htmlFor="active">Active</label>
                  <input type="checkbox" id="active" checked={this.state.user.active} onChange={this.handleChange.bind(this,'active')}/>
              </div>
              <input type="hidden" id="id" value={this.props.match.params.id}/>
          </div>
          <br/>
          <div className="ui buttons">
              <Link to="/users" className="ui button">Cancel</Link>
              <div className="or"></div>
              <button disabled={!isEnabled} className="ui positive button" onClick={this.handleSave}>Save</button>
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
        MutationCreateUser,
      {
          props: (props) => ({
              createUser: (user) => {
                  return props.mutate({
                      variables: {...user},
                      optimisticResponse: () => ({
                          createUser: {
                              ...user, __typename: 'User'
                          }
                      }),
                  })
              }
          })
      }
  ),
  graphql(
        MutationUpdateUser,
      {
          props: (props) => ({
              updateUser: (user) => {
                  return props.mutate({
                      variables: {...user},
                      optimisticResponse: () => ({
                          updateUser: {
                              ...user, __typename: 'User'
                          }
                      }),
                  })
              }
          })
      }
  )
)(ViewUser);
