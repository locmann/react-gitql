import { useAppDispatch, useAppSelector } from 'hooks/hooks.ts';
import { useQuery } from '@apollo/client';
import { REPOSITORY_INFO } from 'apollo/git.ts';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import {
  setDescription,
  setLanguages,
  setLastCommitDate,
  setOwnerName,
  setPhotoUrl,
  setRepoName,
  setStars,
  setUrl,
} from 'store/card/cardSlice.ts';
import styles from './RepoCard.module.css';

const RepoCard = () => {
  const { ownerName, repoName, description, languages, lastCommitDate, photoUrl, stars, url } =
    useAppSelector((state) => state.card);

  const { loading, error, data } = useQuery(REPOSITORY_INFO, {
    variables: { owner: ownerName, name: repoName },
  });

  console.log(data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setOwnerName(data.repository.owner.login));
      dispatch(setRepoName(data.repository.name));
      dispatch(setDescription(data.repository.description));
      dispatch(setLanguages(data.repository.languages.nodes.map((lang) => lang.name)));
      dispatch(setLastCommitDate(data.repository.updatedAt));
      dispatch(setPhotoUrl(data.repository.owner.avatarUrl));
      dispatch(setStars(data.repository.stargazerCount));
      dispatch(setUrl(data.repository.owner.url));
    }
  }, [data]);

  return (
    <>
      <h2>RepoCard</h2>
      {loading && <p>Loading...</p>}
      {error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div>
          <div className={styles.textWrapper}>
            <b>{repoName}</b>
            <span>
              Звезд: <b>{stars}</b>
            </span>
            <span>Обновлено: {new Date(lastCommitDate).toLocaleString()}</span>
          </div>
          <div className={styles.textWrapper}>
            <img
              className={styles.image}
              src={photoUrl}
            />
            <Link to={url}>{ownerName}</Link>
          </div>
          <div className={styles.textWrapper}>
            {languages.map((lang) => (
              <p key={lang}>{lang}</p>
            ))}
          </div>
          <div>{description}</div>
        </div>
      )}
    </>
  );
};

export default RepoCard;
