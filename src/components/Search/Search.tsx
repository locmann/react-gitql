import { ChangeEvent, useEffect, useState } from 'react';
import { SEARCH_REPOSITORIES } from 'apollo/git.ts';
import { useQuery } from '@apollo/client';
import { useAppDispatch, useAppSelector, useDebounce } from 'hooks/hooks.ts';
import styles from './Search.module.css';
import {
  setCurrentPage,
  setPartOfPages,
  setRepositories,
  setSearchQuery,
  setTotalPages,
} from 'store/search/searchSlice.ts';
import Pagination from 'components/Pagination/Pagination.tsx';
import { Link } from 'react-router-dom';
import { setOwnerName, setRepoName } from 'store/card/cardSlice.ts';
import {
  clearRepositoryData,
  getCurrentPageFromLS,
  loadFromLS,
  paginateHelper,
  saveToLS,
  showRepositories,
} from 'utils/utils.ts';
const Search = () => {
  const { repositories, searchQuery, currentPage } = useAppSelector((state) => state.search);

  const dispatch = useAppDispatch();

  const [after, setAfter] = useState<string | null>(null);
  const [startCursors, setStartCursors] = useState<Array<string | null>>([null]);
  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const debouncedSearch = useDebounce(searchQuery);
  const { loading, error, data } = useQuery(SEARCH_REPOSITORIES, {
    variables: { query: debouncedSearch, first: 50, after },
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const onLinkClick = (name: string, repoName: string) => {
    dispatch(setOwnerName(name));
    dispatch(setRepoName(repoName));
  };

  const loadMore = () => {
    if (data?.search.pageInfo.endCursor) {
      setAfter(data.search.pageInfo.endCursor);
    }
  };

  const loadPrev = () => {
    const prevAfter = paginateHelper(startCursors, after);
    setAfter(prevAfter);
  };

  dispatch(setTotalPages(Math.ceil((data?.search?.repositoryCount || 0) / 10)));

  useEffect(() => {
    if (data?.search?.repos) {
      setStartCursors((prev) => {
        if (data.search.pageInfo.endCursor) {
          const cursor = data.search.pageInfo.endCursor;
          if (prev.includes(cursor)) {
            return prev;
          } else {
            return [...prev, cursor];
          }
        }
        return prev;
      });
      setHasPrev(data.search.pageInfo.hasPreviousPage);
      setHasNext(data.search.pageInfo.hasNextPage);
      if (data.search.repos) {
        dispatch(setRepositories(clearRepositoryData(data.search.repos)));
      }
    }
  }, [data]);

  useEffect(() => {
    if (repositories.length > 0) {
      saveToLS(startCursors, currentPage, debouncedSearch);
      console.log('saved in ls');
    }
  }, [currentPage, startCursors, debouncedSearch]);

  useEffect(() => {
    const lsData = loadFromLS();
    if (lsData !== null) {
      setStartCursors(lsData.cursors);
      dispatch(setCurrentPage(lsData.currentPage));
      dispatch(setSearchQuery(lsData.query));
      const partOfPage = Math.floor(lsData.currentPage / 5);
      dispatch(setPartOfPages(partOfPage * 5));
      setAfter(getCurrentPageFromLS(lsData.cursors, lsData.currentPage));
    }
  }, []);

  useEffect(() => {
    console.log('in debounce effect', debouncedSearch);

    dispatch(setCurrentPage(1));
    dispatch(setPartOfPages(0));
    setStartCursors([null]);
    setAfter(null);
  }, [debouncedSearch]);

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!(loading || error) && (
        <>
          <ul>
            {showRepositories(repositories, currentPage).map(({ repo }) => (
              <li
                className={styles.listElement}
                key={repo.url}
              >
                <a href={repo.url}>{repo.name}</a>
                <span>{repo.stargazerCount} звезд</span>
                <span>{new Date(repo.updatedAt).toLocaleString()}</span>
                <Link
                  onClick={() => onLinkClick(repo.owner.login, repo.name)}
                  to="/info"
                >
                  Подробнее
                </Link>
              </li>
            ))}
          </ul>
          <Pagination
            loadMore={loadMore}
            loadPrev={loadPrev}
            hasPrev={hasPrev}
            hasNext={hasNext}
          />
        </>
      )}
    </div>
  );
};

export default Search;
