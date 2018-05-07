import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

import QueryGetProduct from "../../GraphQL/product/QueryGetProduct";
import QueryGetStock from "../../GraphQL/stock/QueryGetStock";
import MutationCreateStock from "../../GraphQL/stock/MutationCreateStock";
import MutationUpdateStock from "../../GraphQL/stock/MutationUpdateStock";
import MutationUpdateProduct from "../../GraphQL/product/MutationUpdateProduct";

import DatePicker from 'react-datepicker';
import moment from 'moment';

import { nearest15min } from "../../Utils";
import DateTimePickerCustomInput from "../DateTimePickerCustomInput";

var TYPES = [
  {value: 'Issue', label:'Issue'},
  {value: 'Receipt', label:'Receipt'},
];

var REASON_TYPES = [
  {type: 'Issue', value: 'Used for customer service'},
  {type: 'Issue', value: 'Stock adjustment'},
  {type: 'Receipt', value: 'Product purchased'},
  {type: 'Receipt', value: 'Stock adjustment'},
];

class View extends Component {

  constructor() {
    super();
    this.state = {
      stock: {
        id:'',
        productId: '',
        description: '',
        when: nearest15min().format(),
        type: 'Issue',
        reason: 'Used for customer service',
        quantity:0,
      },
      product: {
        id:'',
        quantity:0,
      },
      errors: {
        name: true,
        description: true,
        units: true,
      },
    };
  };

  static defaultProps = {
      createStock: () => null,
      updateStock: () => null,
  }

  validateInputs(quantity, description, reason) {
    // true means invalid, so our conditions got reversed
    return {
      quantity: quantity.length === 0 || quantity <= 0,
      description: description.length === 0,
      reason: reason.length === 0,
    };
  }

  handleDateChange(field, value) {
      this.handleChange(field, { target: { value: value.format() } });
  }

  handleSave = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      console.log('Current stock level for this product : '+this.props.product.quantity);
      const { createStock, updateStock, history } = this.props;
      if(this.props.match.params.id === 'new') {
        this.state.stock.id = uuid();
        this.state.stock.productId = this.props.match.params.productId;
        const { stock } = this.state;
        console.log(stock);
        if(this.handleUpdateStock()) {
          await createStock(stock);
        }
      }else {
        this.state.stock.id = this.props.match.params.id;
        const { stock } = this.state;
        console.log(stock);
        await updateStock(stock);
      }
      history.push('/products');
  }

  handleUpdateStock() {
    const { updateProduct } = this.props;
    this.state.product.id = this.props.product.id;
    if(this.state.stock.type === 'Issue') {
      if(this.state.stock.quantity > this.props.product.quantity) {
        alert('Low Inventory level, cannot perform the transaction');
        return false;
      }
      this.state.product.quantity = this.props.product.quantity - this.state.stock.quantity;
    }else {
      this.state.product.quantity = this.props.product.quantity + this.state.stock.quantity;
    }
    const { product } = this.state;
    console.log(product);
    updateProduct(product);
    return true;
  }

  handleChange(field, event) {
    console.log(event.target.type);
    const { stock } = this.state;
    if(event.target.type === 'number') {
      var parsed = Number.parseInt(event.target.value, 0);
      if (Number.isNaN(parsed)) {
        return 0;
      }
      const value = parsed;
      console.log(stock);
      stock[field] = value;
    }else {
      const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
      console.log(stock);
      stock[field] = value;
    }
      this.setState({ stock });
      console.log(stock);
  }

  componentDidMount() {
    console.log('setting properties');
    if(this.props.stock) {
      var {stock, product} = this.state;
      stock.id = this.props.stock.id;
      stock.type = this.props.stock.type;
      stock.reason = this.props.stock.reason;
      stock.description = this.props.stock.description;
      stock.quantity = this.props.stock.quantity;
      stock.when = this.props.stock.when;
      stock.productId = this.props.stock.productId;
      console.log(stock);
      this.setState({stock:stock});
      console.log('properties were set : ');
      console.log(this.state.stock);
    }else {
      console.log('Unable to set properties');
    }
    console.log('done setting properties');
  }

    render() {
        const { product, stock, loading } = this.props;
        const errors = this.validateInputs(this.state.stock.quantity, this.state.stock.description, this.state.stock.reason);
        const isEnabled = !Object.keys(errors).some(x => errors[x]);
        var updateMode = false;
        var title = "New Stock entry";
        if(stock) {
          updateMode = true;
          title = "Update Stock entry";
        }
        const typeField = updateMode ? (
             <div>{this.props.stock.type}</div>
           ) : (
             <select id="type" onChange={this.handleChange.bind(this,'type')}>
               <option value='Issue'>Issue</option>
               <option value='Receipt'>Receipt</option>
             </select>
           );
        const reasonField = updateMode ? (
             <div>{this.props.stock.reason}</div>
           ) : (
             <select id="reason" onChange={this.handleChange.bind(this,'reason')}>
               <option value='Used for customer service'>Used for customer service</option>
               <option value='Stock adjustment'>Stock adjustment</option>
               <option value='Product purchased'>Product purchased</option>
             </select>
           );
           const whenField = updateMode ? (
                <div>
                  {moment(stock.when).format('LL')}&nbsp;{moment(stock.when).format('LT')}
                </div>
              ) : (
                <div className="field required eight wide">
                    <DatePicker
                        className="ui container"
                        customInput={<DateTimePickerCustomInput />}
                        id="when"
                        selected={moment(this.state.stock.when)}
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
              <div className="field eight wide">
                <b>Product Name :</b> {product && product.name}&nbsp;&nbsp;
                <b>Quantity :</b> {product && product.quantity}&nbsp;{product && product.units}
              </div>
              <div className="field required eight wide">
                  <label htmlFor="description">Description</label>
                  <input type="text" id="description" value={this.state.stock.description} onChange={this.handleChange.bind(this,'description')}/>
              </div>
              <div className="field required eight wide">
                  <label htmlFor="when">When</label>
                  {whenField}
              </div>
              <div className="field required eight wide">
                  <label htmlFor="type">Type</label>
                  {typeField}
              </div>
              <div className="field required eight wide">
                  <label htmlFor="reason">Reason</label>
                  {reasonField}
              </div>
              <div className="field eight wide">
                  <label>Quantity &nbsp;({product && product.units})</label>
                  <input type="number" id="quantity" value={this.state.stock.quantity} onChange={this.handleChange.bind(this,'quantity')}/>

              </div>
              <input type="hidden" id="productId" value={this.props.match.params.productId}/>
              <input type="hidden" id="id" value={this.props.match.params.id}/>
          </div>
          <br/>
          <div className="ui buttons">
              <Link to="/products" className="ui button">Cancel</Link>
              <div className="or"></div>
              <button disabled={!isEnabled} className="ui positive button" onClick={this.handleSave}>Save</button>
          </div>
        </div>
        );
    }
}

export default compose (
  graphql(
      QueryGetProduct,
      {
          options: ({ match: { params: { productId } } }) => ({
              variables: { id: productId },
              fetchPolicy: 'cache-and-network',
          }),
          props: ({ data: { getProduct: product, loading} }) => ({
              product,
              loading,
          }),
      }
  ),
  graphql(
      QueryGetStock,
      {
          options: ({ match: { params: { id } } }) => ({
              variables: { id },
              fetchPolicy: 'cache-and-network',
          }),
          props: ({ data: { getStock: stock, loading} }) => ({
              stock,
              loading,
          }),
      }
  )
  ,
  graphql(
        MutationCreateStock,
      {
          props: (props) => ({
              createStock: (stock) => {
                  return props.mutate({
                      variables: {...stock},
                      optimisticResponse: () => ({
                          createStock: {
                              ...stock, __typename: 'Stock'
                          }
                      }),
                  })
              }
          })
      }
  ),
  graphql(
        MutationUpdateStock,
      {
          props: (props) => ({
              updateStock: (stock) => {
                  return props.mutate({
                      variables: {...stock},
                      optimisticResponse: () => ({
                          updateStock: {
                              ...stock, __typename: 'Stock'
                          }
                      }),
                  })
              }
          })
      }
  ),
  graphql(
        MutationUpdateProduct,
      {
          props: (props) => ({
              updateProduct: (product) => {
                  return props.mutate({
                      variables: {...product},
                      optimisticResponse: () => ({
                          updateProduct: {
                              ...product, __typename: 'Product'
                          }
                      }),
                  })
              }
          })
      }
  )
)(View);
