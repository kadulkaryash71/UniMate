// jslint esversion:6
import { gql } from "@apollo/client";

// graphql queries
const GET_USERS = gql`
  query Users {
    users {
      id
      username
      fullName
      file
      university
      city
      country
    }
  }
`;

const GET_POSTS = gql`
  query Posts {
    posts {
      id
      body
      file
      createdAt
      user {
        username
        fullName
        file
      }
      likes {
        username
        fullName
        file
      }
      comments {
        displayImage
        commentString
        user {
          username
          fullName
          file
        }
      }
    }
  }
`;
// graphql queries

export { GET_POSTS, GET_USERS };
