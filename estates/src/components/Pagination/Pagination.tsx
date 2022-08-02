import "./style.css";

export interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageSelect: (page: number) => void;
}

export function Pagination(props: PaginationProps) {
  const { page, pageSize, total, onPageSelect } = props;
  const lastPage = Math.ceil(total / pageSize);
  const start = 1 + (page - 1) * pageSize;
  const end = start + pageSize - 1;

  return (
    <div className="pagination">
      <div className="pagination__total">
        Showing {start}-{end} of {total} estates.
      </div>
      <div className="pagination__pages">
        <button disabled={page <= 1} onClick={() => onPageSelect(1)}>
          &#xAB;
        </button>
        <button disabled={page <= 1} onClick={() => onPageSelect(page - 1)}>
          &#x2039;
        </button>
        {Array.from(prevPages(page), (p) => (
          <button key={p} className="jump" onClick={() => onPageSelect(p)}>
            {p}
          </button>
        ))}
        <button className="active">{page}</button>
        {Array.from(nextPages(page, total, pageSize), (p) => (
          <button key={p} className="jump" onClick={() => onPageSelect(p)}>
            {p}
          </button>
        ))}
        <button
          disabled={page >= lastPage}
          onClick={() => onPageSelect(page + 1)}
        >
          &#x203A;
        </button>
        <button
          disabled={page >= lastPage}
          onClick={() => onPageSelect(lastPage)}
        >
          &#xBB;
        </button>
      </div>
    </div>
  );
}

const pageOverflow = 3;

function* prevPages(page: number) {
  const start = Math.max(page - pageOverflow, 1);
  for (let i = start; i < page; i++) yield i;
}

function* nextPages(page: number, total: number, pageSize: number) {
  const max = Math.min(Math.ceil(total / pageSize) - page, pageOverflow);
  if (max <= 0) return;

  for (let i = 1; i <= max; i++) {
    yield i + page;
  }
}
