import { Repository, SavedData } from 'types/types.ts';

export const showRepositories = (repositories: Repository[], page: number): Repository[] => {
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

export const saveToLS = (cursors: Array<string | null>, currentPage: number, query: string) => {
  const data = {
    cursors,
    currentPage,
    query,
  };

  localStorage.setItem('cacheRequest', JSON.stringify(data));
};

export const loadFromLS = () => {
  const data = localStorage.getItem('cacheRequest');
  if (data) {
    return JSON.parse(data) as SavedData;
  }
  return null;
};

export const getCurrentPageFromLS = (cursors: Array<string | null>, currentPage: number) => {
  const index = Math.floor(currentPage / 5);
  console.log(index);
  return cursors[index];
};
