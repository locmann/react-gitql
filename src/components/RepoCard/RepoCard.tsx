import { useAppDispatch, useAppSelector } from 'hooks/hooks.ts';
import { useQuery } from '@apollo/client';
import { REPOSITORY_INFO } from 'apollo/git.ts';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { CardState, setAllData } from 'store/card/cardSlice.ts';
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
      const cardData: CardState = {
        ownerName: String(data.repository?.owner?.login),
        repoName: String(data.repository?.name),
        description: String(data.repository?.description),
        languages: data.repository?.languages?.nodes?.map((lang) => String(lang?.name)) || [],
        lastCommitDate: String(data.repository?.updatedAt),
        photoUrl: String(data.repository?.owner?.avatarUrl),
        stars: Number(data.repository?.stargazerCount),
        url: String(data.repository?.owner?.url),
      };
      dispatch(setAllData(cardData));
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
