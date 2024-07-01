import { gql } from '@apollo/client';

export const SEARCH_REPOSITORIES = gql`
  query SearchRepositories($query: String!, $first: Int, $after: String) {
    search(query: $query, type: REPOSITORY, first: $first, after: $after) {
      repositoryCount
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
      repos: edges {
        repo: node {
          ... on Repository {
            name
            url
            updatedAt
            stargazerCount
          }
        }
      }
    }
  }
`;
