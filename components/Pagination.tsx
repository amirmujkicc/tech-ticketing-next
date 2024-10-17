"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ currentPage, itemCount, pageSize }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    console.log(page);
    const params = new URLSearchParams(searchParams);

    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        justifyContent: "center",
        margin: "20px 0 100px 0 ",
      }}
    >
      <button disabled={currentPage === 1} onClick={() => changePage(1)}>
        ◀︎◀︎
      </button>
      <button
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        ◀︎
      </button>
      <div>
        Page {currentPage} of {pageCount}
      </div>
      <button
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}
      >
        ▶︎
      </button>
      <button
        disabled={currentPage === pageCount}
        onClick={() => changePage(pageCount)}
      >
        ▶︎▶︎
      </button>
    </div>
  );
};

export default Pagination;
