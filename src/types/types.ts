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
