import gql from "graphql-tag";

export default gql(`
query($productId: String!) {
  queryStocksByProductIdIndex(productId: $productId) {
    items {
      id
    	description
    	partnerId
    	productId
    	userId
    	type
    	when
    	partnerId_when
    	partnerId_productId
      quantity
      reason
    }
  }
}`);
