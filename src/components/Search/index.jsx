import { useCallback, useContext, useRef } from "react";
import debounce from "lodash.debounce";
import styles from "./search.module.scss";
import { useState } from "react";
import SearchPizzaSvg from "../../assets/svg/searchPizzaSvg";
import ClearSearchSvg from "../../assets/svg/clearSearchSvg";
import { setSearchValue } from "../../redux/slices/filterSlice";
import { useDispatch } from "react-redux";

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const inputRef = useRef();

  const onClickClear = () => {

    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 250),
    []
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <SearchPizzaSvg />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {value && <ClearSearchSvg onClick={onClickClear} />}
    </div>
  );
};

export default Search;
