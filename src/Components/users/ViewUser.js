import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

import QueryGetUser from "../../GraphQL/QueryGetUser";
import MutationCreateUser from "../../GraphQL/MutationCreateUser";
import QueryAllUsers from "../../GraphQL/QueryAllUsers";

class ViewUser extends Component {

  constructor() {
    super();
    this.state = {
      id:'',
      name: '',
      accessCode: '',
      userId: '',
    };
  };

  static defaultProps = {
      createUser: () => null,
  }

  handleSave = async (e) => {
      e.stopPropagation();
      e.preventDefault();

      const { createUser, history } = this.props;
      const { user } = this.state;

      await createUser(user);

      history.push('/users');
  }

  handleChangeName(event) {
    this.setState({name:event.target.value});
  }
  handleChangeAccessCode(event) {
    this.setState({accessCode:event.target.value});
  }
  handleChangeUserId(event) {
    this.setState({userId:event.target.value});
  }

  componentDidMount() {
    if(this.props.user) {
      this.setState({name:this.props.user.name});
      this.setState({userId:this.props.user.userId});
      this.setState({accessCode:this.props.user.accessCode});
    }
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
                  <input type="text" id="name" value={this.state.name} onChange={this.handleChangeName.bind(this)}/>
              </div>
              <div className="field required eight wide">
                  <label htmlFor="accessCode">Access code</label>
                  <input type="text" id="accessCode" value={this.state.accessCode} onChange={this.handleChangeAccessCode.bind(this)}/>
              </div>
              <div className="field required eight wide">
                  <label htmlFor="userId">User Id</label>
                  <input type="text" id="userId" value={this.state.userId} onChange={this.handleChangeUserId.bind(this)}/>
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
        /*
          <div className="ui container raised very padded segment">
              {
                user &&
                <div className="ui form">
                    <h1 className="ui header">Update user</h1>
                    <div className="field required eight wide">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" value={this.state.name} onChange={this.handleChangeName.bind(this)}/>
                    </div>
                    <div className="field required eight wide">
                        <label htmlFor="accessCode">Access code</label>
                        <input type="text" id="accessCode" value={this.state.accessCode} onChange={this.handleChangeAccessCode.bind(this)}/>
                    </div>
                    <div className="field required eight wide">
                        <label htmlFor="userId">User Id</label>
                        <input type="text" id="userId" value={this.state.userId} onChange={this.handleChangeUserId.bind(this)}/>
                    </div>
                </div>
              }
              {
                !user &&
                <div className="ui form">
                    <h1 className="ui header">Create user</h1>
                    <div className="field required eight wide">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" value={this.state.name} onChange={this.handleChangeName.bind(this)}/>
                    </div>
                    <div className="field required eight wide">
                        <label htmlFor="accessCode">Access code</label>
                        <input type="text" id="accessCode" value={this.state.accessCode} onChange={this.handleChangeAccessCode.bind(this)}/>
                    </div>
                    <div className="field required eight wide">
                        <label htmlFor="userId">User Id</label>
                        <input type="text" id="userId" value={this.state.userId} onChange={this.handleChangeUserId.bind(this)}/>
                    </div>
                </div>
              }
              <input type="hidden" id="id" value={this.props.match.params.id}/>
              <br/>
              <div className="ui buttons">
                  <Link to="/users" className="ui button">Cancel</Link>
                  <div className="or"></div>
                  <button className="ui positive button" onClick={this.handleSave}>Save</button>
              </div>
          </div>
          */
        );
    }
}

const ViewUserWithData = graphql(
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
    },
    MutationCreateUser,
    {
        options: {
            refetchQueries: [{ query: QueryAllUsers }],
            update: (proxy, { data: { createUser } }) => {
                const query = QueryAllUsers;
                const data = proxy.readQuery({ query });

                data.listUsers.items = [...data.listUsers.items.filter(e => e.id !== createUser.id), createUser];

                proxy.writeQuery({ query, data });
            }
        },
        props: (props) => ({
            createUser: (user) => {
                return props.mutate({
                    variables: user,
                    optimisticResponse: () => ({
                        createUser: {
                            ...user, id: uuid()
                        }
                    }),
                })
            }
        })
    }
)(ViewUser);

export default ViewUserWithData;
