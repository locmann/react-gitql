export type Repository = {
  repo: {
    name: string;
    url: string;
    updatedAt: string;
    stargazerCount: string;
    owner: {
      login: string;
    };
  };
};

export type SavedData = {
  cursors: Array<string | null>;
  currentPage: number;
  query: string;
};

export type ResponseReposType = Array<{
  __typename?: 'SearchResultItemEdge';
  repo?:
    | { __typename?: 'App' }
    | { __typename?: 'Discussion' }
    | { __typename?: 'Issue' }
    | {
        __typename?: 'MarketplaceListing';
      }
    | { __typename?: 'Organization' }
    | { __typename?: 'PullRequest' }
    | {
        __typename?: 'Repository';
        name: string;
        url: any;
        updatedAt: any;
        stargazerCount: number;
        owner:
          | { __typename?: 'Organization'; login: string }
          | { __typename?: 'User'; login: string };
      }
    | { __typename?: 'User' }
    | null;
} | null>;
