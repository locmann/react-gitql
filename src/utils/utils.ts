import { Repository } from 'types/types.ts';

export const showRepositories = (repositories: Repository[], page: number): Repository[] => {
  return repositories.slice((page - 1) * 10, page * 10);
};
