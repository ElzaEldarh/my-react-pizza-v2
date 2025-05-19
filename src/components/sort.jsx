import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../redux/slices/filterSlice";
import SortLabelSvg from "../assets/svg/sortLabelSvg";

export const lists = [
  { name: "популярности", sortProperty: "rating" },
  { name: "цене", sortProperty: "price" },
  { name: "алфавиту", sortProperty: "title" },
];

const Sort = () => {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filterSlice.sort);
  const sortRef = useRef();

  const [open, setOpen] = useState(false);

  const onClickListItem = (lists) => {
    dispatch(setSort(lists));
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <SortLabelSvg />
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {lists.map((list, i) => (
              <li
                key={i}
                onClick={() => onClickListItem(list)}
                className={
                  sort.sortProperty === list.sortProperty ? "active" : ""
                }
              >
                {list.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default Sort;
