import { useAppDispatch, useAppSelector } from 'hooks/hooks.ts';
import { setCurrentPage, setPartOfPages } from 'store/search/searchSlice.ts';
import { FC } from 'react';
import styles from './Pagination.module.css';

type Props = {
  loadMore: () => void;
  loadPrev: () => void;
  hasPrev: boolean;
  hasNext: boolean;
};

const Pagination: FC<Props> = ({ loadMore, hasNext, hasPrev, loadPrev }) => {
  const { currentPage, totalPages, repositories, partOfPages } = useAppSelector(
    (state) => state.search,
  );
  const dispatch = useAppDispatch();
  const pagesNumber = Math.ceil((repositories.length || 0) / 10);
  const array = Array.from({ length: pagesNumber }, (_, i) => i + 1 + partOfPages);

  const handleClick = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleClickPrev = () => {
    loadPrev();
    dispatch(setPartOfPages(partOfPages - 5));
    dispatch(setCurrentPage(partOfPages - 4));
  };

  const handleClickNext = () => {
    loadMore();
    dispatch(setPartOfPages(partOfPages + 5));
    dispatch(setCurrentPage(partOfPages + 6));
  };

  const isActive = (page: number) => (page === currentPage ? styles.active : '');

  return (
    <div className={styles.wrapper}>
      {!!totalPages && (
        <>
          <button
            disabled={!hasPrev}
            onClick={handleClickPrev}
          >
            ←
          </button>
          {array.map((m) => (
            <button
              key={m}
              className={isActive(m)}
              onClick={() => handleClick(m)}
            >
              {m}
            </button>
          ))}
          <button
            disabled={!hasNext}
            onClick={handleClickNext}
          >
            →
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
