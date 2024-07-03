import { Repository } from 'types/types.ts';

export const showRepositories = (repositories: Repository[], page: number): Repository[] => {
  console.log(repositories);
  console.log(page);
  const mod = page % 5;
  let portion;
  if (mod === 0) {
    portion = 5;
  } else {
    portion = mod;
  }
  return repositories.slice((portion - 1) * 10, portion * 10);
};

export const paginateHelper = (cursors: Array<string | null>, currentCursor: string | null) => {
  const index = cursors.findIndex((cursor) => cursor === currentCursor);
  if (index === 0) {
    return cursors[0];
  }
  if (index !== -1) {
    return cursors[index - 1];
  }
};
