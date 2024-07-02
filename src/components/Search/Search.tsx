import { ChangeEvent, useEffect, useState } from 'react';
import { SEARCH_REPOSITORIES } from 'apollo/git.ts';
import { useQuery } from '@apollo/client';
import { useAppDispatch, useAppSelector, useDebounce } from 'hooks/hooks.ts';
import styles from './Search.module.css';
import {
  setRepositories,
  setSearchQuery,
  setStep,
  setTotalPages,
} from 'store/search/searchSlice.ts';
import Pagination from 'components/Pagination/Pagination.tsx';
import { Link } from 'react-router-dom';
import { setOwnerName, setRepoName } from 'store/card/cardSlice.ts';
const Search = () => {
  const { repositories, searchQuery, currentPage, reposCount, totalPages, step } = useAppSelector(
    (state) => state.search,
  );

  const dispatch = useAppDispatch();

  const [after, setAfter] = useState<string | null>(null);

  const debouncedSearch = useDebounce(searchQuery);
  const { loading, error, data, fetchMore } = useQuery(SEARCH_REPOSITORIES, {
    variables: { query: debouncedSearch, first: 10, after },
    skip: !debouncedSearch,
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const onLinkClick = (name: string, repoName: string) => {
    dispatch(setOwnerName(name));
    dispatch(setRepoName(repoName));
  };

  const loadMore = async () => {
    if (data.search.pageInfo.hasNextPage) {
      const { data: newData } = await fetchMore({
        variables: {
          after: data.search.pageInfo.endCursor,
        },
      });
      console.log(newData);
      if (newData && newData.search && newData.search.repos) {
        dispatch(setRepositories(newData.search.repos));
        setAfter(newData.search.pageInfo.endCursor);
      }
    }
  };

  dispatch(setTotalPages(Math.ceil((data?.search?.repositoryCount || 0) / 10)));

  useEffect(() => {
    if (data && data.search && data.search.repos) {
      /*if (!after) {
        dispatch(setRepositories(data.search.repos))

      } else {
        dispatch()
        setRepositories((prevRepos) => [...prevRepos, ...data.search.repos]);
      }*/
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
        {repositories.map(({ repo }) => (
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
      {data && data.search.pageInfo.hasNextPage && (
        <button
          onClick={loadMore}
          disabled={loading}
        >
          Load More
        </button>
      )}
      <Pagination />
    </div>
  );
};

export default Search;
