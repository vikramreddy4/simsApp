import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

import QueryGetProduct from "../../GraphQL/QueryGetProduct";
import MutationCreateProduct from "../../GraphQL/MutationCreateProduct";
import MutationUpdateProduct from "../../GraphQL/MutationUpdateProduct";

class Fragment extends Component {

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

  componentDidMount() {
    console.log('setting properties');
    const { getProduct} = this.props;
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
        const { product, loading } = this.props;
        console.log('Render id - '+this.props.match.params.id);
        console.log('Render product - '+product);
      if (this.props.match.params.id !== 'new' && product === 'undefined') {
        return (<div>Loading</div>);
      }else {
        return (
          <div className="ui container raised very padded segment">
            <div className="ui form">
                {
                  product &&
                  <div className="field required eight wide">
                      <label htmlFor="name">Name</label>
                      <input type="text" id="name" value={this.state.product.name} onChange={this.handleChange.bind(this,'name')}/>
                  </div>
                }
                {
                  product &&
                  <div className="field required eight wide">
                      <label htmlFor="description">Description</label>
                      <input type="text" id="description" value={this.state.product.description} onChange={this.handleChange.bind(this,'description')}/>
                  </div>
                }
                  {
                    product &&
                  <div className="field required eight wide">
                      <label htmlFor="units">Units</label>
                      <input type="text" id="units" value={this.state.product.units} onChange={this.handleChange.bind(this,'units')}/>
                  </div>
                }
                  {
                    product &&
                  <div className="field required eight wide">
                      <label htmlFor="units">Unit price</label>
                      <input type="text" id="unitPrice" value={this.state.product.unitPrice} onChange={this.handleChange.bind(this,'unitPrice')}/>
                  </div>
                }
                  {
                    product &&
                  <div className="field eight wide">
                      <label>Quantity</label>
                      {this.state.product.quantity}
                  </div>
                }
          <input type="hidden" id="id" value={this.props.match.params.id}/>
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
  ))(Fragment);
