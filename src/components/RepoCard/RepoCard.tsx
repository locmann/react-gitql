import { useAppDispatch, useAppSelector } from 'hooks/hooks.ts';
import { useQuery } from '@apollo/client';
import { REPOSITORY_INFO } from 'apollo/git.ts';
import { Link, useNavigate } from 'react-router-dom';
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

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

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
      <div className={styles.header}>
        <button onClick={() => navigate(-1)}>Назад</button>
        <h2>RepoCard</h2>
      </div>
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
              alt="Avatar"
            />
            <Link to={url}>{ownerName}</Link>
          </div>
          <div className={styles.textWrapper}>
            Языки:{' '}
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
