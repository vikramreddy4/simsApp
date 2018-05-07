import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

import QueryGetCustomer from "../../GraphQL/customer/QueryGetCustomer";
import MutationCreateCustomer from "../../GraphQL/customer/MutationCreateCustomer";
import MutationUpdateCustomer from "../../GraphQL/customer/MutationUpdateCustomer";

class View extends Component {

  constructor() {
    super();
    this.state = {
      customer: {
        id:'',
        name: '',
        phone:'',
        email:'',
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
      createCustomer: () => null,
      updateCustomer: () => null,
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
      const { createCustomer, updateCustomer, history } = this.props;
      if(this.props.match.params.id === 'new') {
        this.state.customer.id = uuid();
        const { customer } = this.state;
        console.log(customer);
        await createCustomer(customer);
      }else {
        this.state.customer.id = this.props.match.params.id;
        const { customer } = this.state;
        console.log(customer);
        await updateCustomer(customer);
      }
      history.push('/customers');
  }

  handleChange(field, event) {
      const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
      const { customer } = this.state;
      customer[field] = value;
      this.setState({ customer });
  }

  componentDidMount() {
    console.log('setting properties');
    if(this.props.customer) {
      var {customer} = this.state;
      console.log(customer);
      customer.name = this.props.customer.name;
      customer.phone = this.props.customer.phone;
      customer.email = this.props.customer.email;
      customer.active = this.props.customer.active;
      console.log(customer);
      this.setState({customer:customer});
      console.log('properties were set : ');
      console.log(this.state.customer);
    }else {
      console.log('Unable to set properties');
    }
    console.log('done setting properties');
  }

    render() {
        const { customer, loading } = this.props;
        console.log('loading - '+loading);
        const errors = this.validateInputs(this.state.customer.name, this.state.customer.phone, this.state.customer.email);
        const isEnabled = !Object.keys(errors).some(x => errors[x]);
        var title = "Create Customer";
        if(customer) {
          title = "Update Customer";
        }
        return (
          <div className="ui container raised very padded segment">
          <div className="ui form">
              <h1 className="ui header">{title}</h1>
              <div>Fields marked * are mandatory.</div>
              <br/>
              <div className="field required eight wide">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" value={this.state.customer.name} onChange={this.handleChange.bind(this,'name')}/>
              </div>
              <div className="field required eight wide">
                  <label htmlFor="name">Phone</label>
                  <input type="text" id="phone" value={this.state.customer.phone} onChange={this.handleChange.bind(this,'phone')}/>
              </div>
              <div className="field required eight wide">
                  <label htmlFor="name">Email</label>
                  <input type="text" id="email" value={this.state.customer.email} onChange={this.handleChange.bind(this,'email')}/>
              </div>
              <input type="hidden" id="id" value={this.props.match.params.id}/>
              <input type="hidden" id="active" value={this.state.customer.active}/>
          </div>
          <br/>
          <div className="ui buttons">
              <Link to="/customers" className="ui button">Cancel</Link>
              <div className="or"></div>
              <button disabled={!isEnabled} className="ui positive button" onClick={this.handleSave}>Save</button>
          </div>
        </div>
        );
    }
}

export default compose (
  graphql(
      QueryGetCustomer,
      {
          options: ({ match: { params: { id } } }) => ({
              variables: { id },
              fetchPolicy: 'cache-and-network',
          }),
          props: ({ data: { getCustomer: customer, loading} }) => ({
              customer,
              loading,
          }),
      }
  ),
  graphql(
        MutationCreateCustomer,
      {
          props: (props) => ({
              createCustomer: (customer) => {
                  return props.mutate({
                      variables: {...customer},
                      optimisticResponse: () => ({
                          createCustomer: {
                              ...customer, __typename: 'Customer'
                          }
                      }),
                  })
              }
          })
      }
  ),
  graphql(
        MutationUpdateCustomer,
      {
          props: (props) => ({
              updateCustomer: (customer) => {
                  return props.mutate({
                      variables: {...customer},
                      optimisticResponse: () => ({
                          updateCustomer: {
                              ...customer, __typename: 'Customer'
                          }
                      }),
                  })
              }
          })
      }
  )
)(View);
