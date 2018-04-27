import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

import QueryGetProduct from "../../GraphQL/QueryGetProduct";
import MutationCreateProduct from "../../GraphQL/MutationCreateProduct";
import MutationUpdateProduct from "../../GraphQL/MutationUpdateProduct";

class View extends Component {

  constructor() {
    super();
    this.state = {
      stock: {
        id:'',
        name: '',
        description: '',
        units: '',
        active:true,
        quantity:0,
      },
      errors: {
        name: true,
        description: true,
        units: true,
      }
    };
  };

  static defaultProps = {
      createProduct: () => null,
      updateProduct: () => null,
  }

  validateInputs(name, description, units) {
    // true means invalid, so our conditions got reversed
    return {
      name: name.length === 0,
      description: description.length === 0,
      units: units.length === 0,
    };
  }

  handleSave = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      const { createProduct, updateProduct, history } = this.props;
      if(this.props.match.params.id === 'new') {
        this.state.stock.id = uuid();
        const { stock } = this.state;
        console.log(stock);
        await createProduct(stock);
      }else {
        this.state.stock.id = this.props.match.params.id;
        const { stock } = this.state;
        console.log(stock);
        await updateProduct(stock);
      }

      history.push('/stocks');
  }

  handleChange(field, event) {
      console.log(event.target.type);
      const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
      console.log(value);
      console.log(this.state.stock.name);
      const { stock } = this.state;
      console.log(stock);
      stock[field] = value;
      this.setState({ stock });
      console.log(this.state.stock.name);
  }

  componentDidMount() {
    console.log('setting properties');
    if(this.props.stock) {
      var {stock} = this.state;
      console.log(stock);
      stock.name = this.props.stock.name;
      stock.description = this.props.stock.description;
      stock.units = this.props.stock.units;
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
        const { stock, loading } = this.props;
        const errors = this.validateInputs(this.state.stock.name, this.state.stock.description, this.state.stock.units);
        const isEnabled = !Object.keys(errors).some(x => errors[x]);
        var title = "New Stock entry";
        if(stock) {
          title = "Update Stock entry";
        }
        return (
          <div className="ui container raised very padded segment">
          <div className="ui form">
              <h1 className="ui header">{title}</h1>
              <div>Fields marked * are mandatory.</div>
              <br/>
              <div className="field required eight wide">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" value={this.state.stock.name} onChange={this.handleChange.bind(this,'name')}/>
              </div>
              <div className="field required eight wide">
                  <label htmlFor="description">Description</label>
                  <input type="text" id="description" value={this.state.stock.description} onChange={this.handleChange.bind(this,'description')}/>
              </div>
              <div className="field required eight wide">
                  <label htmlFor="units">Units</label>
                  <input type="text" id="units" value={this.state.stock.units} onChange={this.handleChange.bind(this,'units')}/>
              </div>
              <div className="field required eight wide">
                  <label htmlFor="active">Active</label>
                  <input type="checkbox" id="active" checked={this.state.stock.active} onChange={this.handleChange.bind(this,'active')}/>
              </div>
              <div className="field eight wide">
                  <label>Quantity</label>
                  {this.state.stock.quantity}
              </div>
              <input type="hidden" id="id" value={this.props.match.params.id}/>
          </div>
          <br/>
          <div className="ui buttons">
              <Link to="/stocks" className="ui button">Cancel</Link>
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
          options: ({ match: { params: { id } } }) => ({
              variables: { id },
              fetchPolicy: 'cache-and-network',
          }),
          props: ({ data: { getProduct: stock, loading} }) => ({
              stock,
              loading,
          }),
      }
  ),
  graphql(
        MutationCreateProduct,
      {
          props: (props) => ({
              createProduct: (stock) => {
                  return props.mutate({
                      variables: {...stock},
                      optimisticResponse: () => ({
                          createProduct: {
                              ...stock, __typename: 'Product'
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
              updateProduct: (stock) => {
                  return props.mutate({
                      variables: {...stock},
                      optimisticResponse: () => ({
                          updateProduct: {
                              ...stock, __typename: 'Product'
                          }
                      }),
                  })
              }
          })
      }
  )
)(View);
