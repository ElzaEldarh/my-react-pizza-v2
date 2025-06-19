import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSort, setSort, Sort, SortPropertyEnum } from "../redux/slices/filterSlice";
import SortLabelSvg from "../assets/svg/sortLabelSvg";


type ListItem = {
  name: string;
  sortProperty:SortPropertyEnum;
};

export const lists: ListItem[] = [
  { name: "популярности", sortProperty: SortPropertyEnum.RATING },
  { name: "цене", sortProperty: SortPropertyEnum.PRICE },
  { name: "алфавиту", sortProperty: SortPropertyEnum.TITLE },
];

const SortPopup = () => {
  const dispatch = useDispatch();
  const sort = useSelector(selectSort);
  const sortRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const onClickListItem = (lists: ListItem) => {
    dispatch(setSort(lists));
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
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
export default SortPopup;
