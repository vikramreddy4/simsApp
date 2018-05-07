import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

import QueryGetProduct from "../../GraphQL/product/QueryGetProduct";
import MutationCreateProduct from "../../GraphQL/product/MutationCreateProduct";
import MutationUpdateProduct from "../../GraphQL/product/MutationUpdateProduct";

class View extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: {
        id:'',
        name: '',
        description: '',
        units: '',
        active:true,
        quantity:0,
        unitPrice:0,
      },
      errors: {
        name: true,
        description: true,
        units: true,
      },
      loading: true,
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
        this.state.product.id = uuid();
        const { product } = this.state;
        console.log(product);
        await createProduct(product);
      }else {
        this.state.product.id = this.props.match.params.id;
        const { product } = this.state;
        console.log(product);
        await updateProduct(product);
      }

      history.push('/products');
  }

  handleChange(field, event) {
      const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
      const { product } = this.state;
      console.log(product);
      product[field] = value;
      this.setState({ product });
      console.log(this.state.product.name);
  }

  componentDidMount() {
    console.log('setting properties');
    if(this.props.product) {
      const {product} = this.state;
      console.log(product);
      product.name = this.props.product.name;
      product.description = this.props.product.description;
      product.units = this.props.product.units;
      product.unitPrice = this.props.product.unitPrice;
      console.log(product);
      this.setState({product:product});
      console.log('properties were set : ');
      console.log(this.state.product);
    }else {
      console.log('Unable to set properties');
    }
    this.state.loading = false;
    console.log('done setting properties');
  }

    render() {
        const { product } = this.props;
        const errors = this.validateInputs(this.state.product.name, this.state.product.description, this.state.product.units);
        const isEnabled = !Object.keys(errors).some(x => errors[x]);
        var title = "Create Product";
        if(product) {
          title = "Update Product";
        }
        console.log('Render id - '+this.props.match.params.id);
        console.log('Render product - '+product);
      if (this.props.match.params.id !== 'new' && product === 'undefined') {
        return (<div>Loading</div>);
      }else {
        return (
          <div className="ui container raised very padded segment">
            <div className="ui form">
                <h1 className="ui header">{title}</h1>
                <div>Fields marked * are mandatory.</div>
                <br/>
                  <div className="field required eight wide">
                      <label htmlFor="name">Name</label>
                      <input type="text" id="name" value={this.state.product.name} onChange={this.handleChange.bind(this,'name')}/>
                  </div>
                  <div className="field required eight wide">
                      <label htmlFor="description">Description</label>
                      <input type="text" id="description" value={this.state.product.description} onChange={this.handleChange.bind(this,'description')}/>
                  </div>
                  <div className="field required eight wide">
                      <label htmlFor="units">Units</label>
                      <input type="text" id="units" value={this.state.product.units} onChange={this.handleChange.bind(this,'units')}/>
                  </div>
                  <div className="field required eight wide">
                      <label htmlFor="units">Unit price</label>
                      <input type="text" id="unitPrice" value={this.state.product.unitPrice} onChange={this.handleChange.bind(this,'unitPrice')}/>
                  </div>
                  <div className="field required eight wide">
                      <label htmlFor="active">Active</label>
                      <input type="checkbox" id="active" checked={this.state.product.active} onChange={this.handleChange.bind(this,'active')}/>
                  </div>
                  <div className="field eight wide">
                      <label>Quantity</label>
                      {this.state.product.quantity}
                  </div>
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
}

export default compose (
  graphql(
      QueryGetProduct,
      {
          options: ({ match: { params: { id } } }) => ({
              variables: { id },
              fetchPolicy: 'cache-and-network',
          }),
          props: ({ data: { getProduct: product, loading} }) => ({
              product,
              loading,
          }),
      }
  ),
  graphql(
        MutationCreateProduct,
      {
          props: (props) => ({
              createProduct: (product) => {
                  return props.mutate({
                      variables: {...product},
                      optimisticResponse: () => ({
                          createProduct: {
                              ...product, __typename: 'Product'
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
