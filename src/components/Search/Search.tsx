import { ChangeEvent, useEffect, useState } from 'react';
import { SEARCH_REPOSITORIES } from 'apollo/git.ts';
import { useQuery } from '@apollo/client';
import { useAppDispatch, useAppSelector, useDebounce } from 'hooks/hooks.ts';
import styles from './Search.module.css';
import { setRepositories, setSearchQuery, setTotalPages } from 'store/search/searchSlice.ts';
import Pagination from 'components/Pagination/Pagination.tsx';
import { Link } from 'react-router-dom';
import { setOwnerName, setRepoName } from 'store/card/cardSlice.ts';
import { paginateHelper, showRepositories } from 'utils/utils.ts';
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
    skip: !debouncedSearch,
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const onLinkClick = (name: string, repoName: string) => {
    dispatch(setOwnerName(name));
    dispatch(setRepoName(repoName));
  };

  const loadMore = () => {
    setAfter(data.search.pageInfo.endCursor);
  };

  const loadPrev = () => {
    console.log('in loadprev');
    console.log(data.search.pageInfo.endCursor);
    console.log('after ', after);
    setAfter(paginateHelper(startCursors, after));
  };

  dispatch(setTotalPages(Math.ceil((data?.search?.repositoryCount || 0) / 10)));

  useEffect(() => {
    if (data && data.search && data.search.repos) {
      setStartCursors((prev) => {
        const cursor = data.search.pageInfo.endCursor;
        if (prev.includes(cursor)) {
          return prev;
        } else {
          return [...prev, cursor];
        }
      });
      setHasPrev(data.search.pageInfo.hasPreviousPage);
      setHasNext(data.search.pageInfo.hasNextPage);
      dispatch(setRepositories(data.search.repos));
    }
  }, [data]);

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
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
    </div>
  );
};

export default Search;
