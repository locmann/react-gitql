import { ChangeEvent, useEffect, useState } from 'react';
import { SEARCH_REPOSITORIES } from 'apollo/git.ts';
import { useQuery } from '@apollo/client';
import { useDebounce } from 'hooks/hooks.ts';
import styles from './Search.module.css';
const Search = () => {
  const [search, setSearch] = useState('');
  const [after, setAfter] = useState<string | null>(null);
  const [repositories, setRepositories] = useState([]);
  const debouncedSearch = useDebounce(search);
  const { loading, error, data, fetchMore } = useQuery(SEARCH_REPOSITORIES, {
    variables: { query: debouncedSearch, first: 10, after },
    skip: !debouncedSearch,
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const loadMore = async () => {
    if (data.search.pageInfo.hasNextPage) {
      const { data: newData } = await fetchMore({
        variables: {
          after: data.search.pageInfo.endCursor,
        },
      });

      if (newData && newData.search && newData.search.repos) {
        setRepositories((prevRepos) => [...prevRepos, ...newData.search.repos]);
        setAfter(newData.search.pageInfo.endCursor);
      }
    }
  };

  useEffect(() => {
    if (data && data.search && data.search.repos) {
      if (!after) {
        setRepositories(data.search.repos);
      } else {
        setRepositories((prevRepos) => [...prevRepos, ...data.search.repos]);
      }
      console.log(data);
    }
  }, [data]);

  return (
    <div>
      <input
        type="text"
        value={search}
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
    </div>
  );
};

export default Search;
