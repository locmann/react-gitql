import { useAppDispatch, useAppSelector } from 'hooks/hooks.ts';
import { setCurrentPage, setStep } from 'store/search/searchSlice.ts';

const Pagination = () => {
  const { currentPage, totalPages } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();
  const array = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleClick = (page: number) => {
    dispatch(setStep(page - currentPage));
    dispatch(setCurrentPage(page));
  };

  return (
    <div>
      {array.map((m) => (
        <button
          key={m}
          style={{ color: currentPage === m ? 'red' : '' }}
          onClick={() => handleClick(m)}
        >
          {m}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
