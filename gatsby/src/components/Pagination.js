import React from 'react';
import { Link } from 'gatsby';

export default function Pagination({
  pageSize,
  totalCount,
  currentPage,
  skip,
  base,
}) {
  // make some variables
  console.log(pageSize, 'pagesize');
  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasNextPage = nextPage <= totalPages;
  const hasPrevPage = prevPage >= 1;
  console.log(totalPages);
  return (
    <div>
      <Link disabled={!hasPrevPage} to={`${base}/${prevPage}`}>
        ← Prev
      </Link>
      {Array.from({ length: totalPages }).map((_, i) => (
        <Link to={`${base}/${i + i}`}>{i + 1}</Link>
      ))}
      <Link disabled={!hasNextPage} to={`${base}/${nextPage}`}>
        → Next
      </Link>
    </div>
  );
}
