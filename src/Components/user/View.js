import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

import QueryGetUser from "../../GraphQL/user/QueryGetUser";
import MutationCreateUser from "../../GraphQL/user/MutationCreateUser";
import MutationUpdateUser from "../../GraphQL/user/MutationUpdateUser";

class View extends Component {

  constructor() {
    super();
    this.state = {
      user: {
        id:'',
        name: '',
        phone:'',
        salary:'',
        email:'',
        accessCode: '',
        userId: '',
        active:true,
      },
      errors: {
        name: true,
        phone: true,
        email: true,
      }
    };
  };

  static defaultProps = {
      createUser: () => null,
      updateUser: () => null,
  }

  validateInputs(name, phone, email) {
    // true means invalid, so our conditions got reversed
    return {
      name: name.length === 0,
      phone: phone.length === 0,
      email: email.length === 0,
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
      const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
      const { user } = this.state;
      user[field] = value;
      this.setState({ user });
  }

  componentDidMount() {
    console.log('setting properties');
    if(this.props.user) {
      var {user} = this.state;
      console.log(user);
      user.name = this.props.user.name;
      user.accessCode = this.props.user.accessCode;
      user.userId = this.props.user.userId;
      user.phone = this.props.user.phone;
      user.email = this.props.user.email;
      user.salary = this.props.user.salary;
      user.active = this.props.user.active;
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
        console.log('loading - '+loading);
        const errors = this.validateInputs(this.state.user.name, this.state.user.phone, this.state.user.email);
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
                  <label htmlFor="name">Phone</label>
                  <input type="text" id="phone" value={this.state.user.phone} onChange={this.handleChange.bind(this,'phone')}/>
              </div>
              <div className="field required eight wide">
                  <label htmlFor="name">Email</label>
                  <input type="text" id="email" value={this.state.user.email} onChange={this.handleChange.bind(this,'email')}/>
              </div>
              <div className="field eight wide">
                  <label htmlFor="accessCode">Access code</label>
                  <input type="text" id="accessCode" value={this.state.user.accessCode} onChange={this.handleChange.bind(this,'accessCode')}/>
              </div>
              <div className="field eight wide">
                  <label htmlFor="userId">User Id</label>
                  <input type="text" id="userId" value={this.state.user.userId} onChange={this.handleChange.bind(this,'userId')}/>
              </div>
              <div className="field required eight wide">
                  <label htmlFor="active">Active</label>
                  <input type="checkbox" id="active" checked={this.state.user.active} onChange={this.handleChange.bind(this,'active')}/>
              </div>
              <div className="field eight wide">
                  <label htmlFor="name">Monthly Salary</label>
                  <input type="text" id="salary" value={this.state.user.salary} onChange={this.handleChange.bind(this,'salary')}/>
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
)(View);
