import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

import QueryGetCustomer from "../../GraphQL/QueryGetCustomer";
import QueryGetOrder from "../../GraphQL/QueryGetOrder";
import MutationCreateOrder from "../../GraphQL/MutationCreateOrder";
import MutationUpdateOrder from "../../GraphQL/MutationUpdateOrder";
/*
import CustomerFragment from "../customers/Fragment";
*/
import DatePicker from 'react-datepicker';
import moment from 'moment';

import { nearest15min } from "../../Utils";
import DateTimePickerCustomInput from "../DateTimePickerCustomInput";

class View extends Component {

  constructor() {
    super();
    this.state = {
      order: {
        id:'',
        customerId: '',
        partnerId: '1',
        cost: 0,
        when: nearest15min().format(),
        discount: 0,
        services: '',
      },
      errors: {
        services: true,
        cost: true,
        when: true,
      },
    };
  };

  static defaultProps = {
      createOrder: () => null,
      updateOrder: () => null,
  }

  validateInputs(services, cost, when) {
    // true means invalid, so our conditions got reversed
    return {
      services: services.length === 0 || services <= 0,
      cost: cost.length === 0 || services <= 0,
      when: when.length === 0,
    };
  }

  handleDateChange(field, value) {
      this.handleChange(field, { target: { value: value.format() } });
  }

  handleSave = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      const { createOrder, updateOrder, history } = this.props;
      if(this.props.match.params.id === 'new') {
        this.state.order.id = uuid();
        this.state.order.customerId = this.props.match.params.customerId;
        const { order } = this.state;
        console.log(order);
        await createOrder(order);
      }else {
        this.state.order.id = this.props.match.params.id;
        const { order } = this.state;
        console.log(order);
        await updateOrder(order);
      }
      history.push('/customers');
  }

  handleChange(field, event) {
    console.log(event.target.type);
    const { order } = this.state;
    if(event.target.type === 'number') {
      var parsed = Number.parseInt(event.target.value, 0);
      if (Number.isNaN(parsed)) {
        return 0;
      }
      const value = parsed;
      console.log(order);
      order[field] = value;
    }else {
      const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
      console.log(order);
      order[field] = value;
    }
      this.setState({ order });
      console.log(order);
  }

  componentDidMount() {
    console.log('setting properties');
    if(this.props.order) {
      var {order} = this.state;
      console.log(order);
      order.id = this.props.order.id;
      order.discount = this.props.order.discount;
      order.cost = this.props.order.cost;
      order.services = this.props.order.services;
      order.when = this.props.order.when;
      order.customerId = this.props.order.customerId;
      console.log(order);
      this.setState({order:order});
      console.log('properties were set : ');
      console.log(this.state.order);
    }else {
      console.log('Unable to set properties');
    }
    console.log('done setting properties');
  }

    render() {
        const { customer, order, loading } = this.props;
        const errors = this.validateInputs(this.state.order.services, this.state.order.cost, this.state.order.when);
        const isEnabled = !Object.keys(errors).some(x => errors[x]);
        var updateMode = false;
        var title = "New Order entry";
        if(order) {
          updateMode = true;
          title = "Update Order entry";
        }
           const whenField = updateMode ? (
               <div className="field required eight wide">
                  <label htmlFor="when">When</label>
                  <div>{moment(order.when).format('LL')}&nbsp;{moment(order.when).format('LT')}</div>
                </div>
              ) : (
                <div className="field required eight wide">
                    <label htmlFor="when">When</label>
                    <DatePicker
                        className="ui container"
                        customInput={<DateTimePickerCustomInput />}
                        id="when"
                        selected={moment(this.state.order.when)}
                        onChange={this.handleDateChange.bind(this, 'when')}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        showTimeSelect
                        timeFormat="hh:mm a"
                        timeIntervals={15}
                        dateFormat="LL LT"
                    />
                </div>
              );

        return (
          <div className="ui container raised very padded segment">
          <div className="ui form">
              <h1 className="ui header">{title}</h1>
              <div>Fields marked * are mandatory.</div>
              <br/>
              <b>Customer Name :</b> {customer && customer.name}&nbsp;&nbsp;
              <br/>
              {whenField}
              <div className="field required eight wide">
                  <label htmlFor="services">Service / Appointment details</label>
                  <input type="text" id="services" value={this.state.order.services} onChange={this.handleChange.bind(this,'services')}/>
              </div>
              <div className="field required eight wide">
                  <label htmlFor="cost">Cost</label>
                  <input type="number" id="cost" value={this.state.order.cost} onChange={this.handleChange.bind(this,'cost')}/>
              </div>
              <div className="field eight wide">
                  <label>Discount</label>
                <input type="number" id="discount" value={this.state.order.discount} onChange={this.handleChange.bind(this,'discount')}/>
              </div>
              <input type="hidden" id="customerId" value={this.props.match.params.customerId}/>
              <input type="hidden" id="id" value={this.props.match.params.id}/>
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
          options: ({ match: { params: { customerId } } }) => ({
              variables: { id: customerId },
              fetchPolicy: 'cache-and-network',
          }),
          props: ({ data: { getCustomer: customer, loading} }) => ({
              customer,
              loading,
          }),
      }
  ),
  graphql(
      QueryGetOrder,
      {
          options: ({ match: { params: { id } } }) => ({
              variables: { id },
              fetchPolicy: 'cache-and-network',
          }),
          props: ({ data: { getOrder: order, loading} }) => ({
              order,
              loading,
          }),
      }
  )
  ,
  graphql(
        MutationCreateOrder,
      {
          props: (props) => ({
              createOrder: (order) => {
                  return props.mutate({
                      variables: {...order},
                      optimisticResponse: () => ({
                          createOrder: {
                              ...order, __typename: 'Order'
                          }
                      }),
                  })
              }
          })
      }
  ),
  graphql(
        MutationUpdateOrder,
      {
          props: (props) => ({
              updateOrder: (order) => {
                  return props.mutate({
                      variables: {...order},
                      optimisticResponse: () => ({
                          updateOrder: {
                              ...order, __typename: 'Order'
                          }
                      }),
                  })
              }
          })
      }
  )
)(View);
