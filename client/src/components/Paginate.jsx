import Pagination from "react-bootstrap/Pagination";
import { usePagination, DOTS } from "../hooks/usePagination";

export const Paginate = ({
  total,
  setCurrentPage,
  currentPage,
  limit,
  setLimit,
}) => {
  let active = currentPage;
  let items = [];
  const totalNumberOfPages = Math.ceil(total / limit);
  for (let number = 1; number <= totalNumberOfPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const paginationRange = usePagination({
    currentPage,
    totalCount: total,
    pageSize: limit,
    siblingCount: 1,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  return (
    <>
      <div className="flex d-flex justify-content-center m-2">
        <div className="row">
          <div className="col-auto">
            <select
              value={limit}
              className="form-select"
              onChange={(e) => setLimit(Number(e.target.value))}
            >
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={8}>8</option>
              <option value={20}>20</option>
              <option value={40}>40</option>
            </select>
          </div>
          <div className="col-auto">
            <Pagination>
              <Pagination.First
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              />
              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              />
              {paginationRange.map((number, index) => {
                if (number === DOTS) {
                  return <Pagination.Ellipsis key={`${index}-${number}`} />;
                }
                return (
                  <Pagination.Item
                    key={number}
                    onClick={() => setCurrentPage(number)}
                    active={currentPage === number}
                  >
                    {number}
                  </Pagination.Item>
                );
              })}
              <Pagination.Next
                disabled={currentPage === totalNumberOfPages}
                onClick={() => {
                  currentPage < totalNumberOfPages
                    ? setCurrentPage(currentPage + 1)
                    : null;
                }}
              />
              <Pagination.Last
                disabled={currentPage === totalNumberOfPages}
                onClick={() => {
                  setCurrentPage(totalNumberOfPages);
                }}
              />
            </Pagination>
          </div>
        </div>
      </div>
    </>
  );
};
