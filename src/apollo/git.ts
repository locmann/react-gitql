import { gql } from '../__generated__';

export const SEARCH_REPOSITORIES = gql(`
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
            owner {
              login
            }
          }
        }
      }
    }
  }
`);

export const REPOSITORY_INFO = gql(`
  query GetRepositoryDetails($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      name
      stargazerCount
      updatedAt
      description
      owner {
        login
        avatarUrl
        url
      }
      languages(first: 10) {
        nodes {
          name
        }
      }
    }
  }
`);
