import { useAppSelector } from 'hooks/hooks.ts';
import { useQuery } from '@apollo/client';
import { REPOSITORY_INFO } from 'apollo/git.ts';
import { Link } from 'react-router-dom';

const RepoCard = () => {
  const { ownerName, repoName } = useAppSelector((state) => state.card);

  const { loading, error, data } = useQuery(REPOSITORY_INFO, {
    variables: { owner: ownerName, name: repoName },
  });

  console.log(data);

  return (
    <>
      <h2>RepoCard</h2>);
      <div>
        <div>
          {data?.name}
          {data?.stargazerCount}
          {new Date(data?.updatedAt).toLocaleString()}
        </div>
        <div>
          <img src={data?.owner.avatarUrl} />
          <Link to={data?.owner.url}>{data?.owner.login}</Link>
        </div>
      </div>
    </>
  );
};

export default RepoCard;
