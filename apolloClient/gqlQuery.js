import { gql } from "@apollo/client"

export const getProducts = gql`
query {
  products {
    id
    name
    slug
    price
    description
    quantityInStock
    createdAt
  }
}
`

export const getProduct = gql`
query product($id: ID!) {
  product(where: { id: $id }) {
    id
    name
    description
    price
    quantityInStock
    createdAt
  }
}
`

export const createCart = gql`
  mutation createCart($data: [CartCreateInput!]!){
    createCarts(data: $data) {
      id
      sum
      quantity
      createdAt
    }
  }
`;


export const getCarts = gql`
query {
  carts {
    product {
      id
      name
      slug
      price
      description
      quantityInStock
      createdAt
    }
    id
    sum
    quantity
    createdAt
  }
}
`

export const deleteCart = gql`
  mutation deleteCart($data: [CartWhereUniqueInput!]!){
    deleteCarts(where: $data) {
      id
      sum
      quantity
      createdAt
    }
  }
`;
