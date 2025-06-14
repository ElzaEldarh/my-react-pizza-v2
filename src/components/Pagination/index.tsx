import ReactPaginate from "react-paginate";
import styles from "./pagination.module.scss";
import { FC } from "react";

type PaginationProps = {
  currentPage: number;
  onChangePage: (id: number) => void;
};

const Pagination: FC<PaginationProps> = ({ onChangePage, currentPage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
  );
};
export default Pagination;
