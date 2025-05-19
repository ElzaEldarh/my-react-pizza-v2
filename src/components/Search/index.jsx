import { useCallback, useContext, useRef } from "react";
import { SearchContext } from "../../App";
import debounce from "lodash.debounce";
import styles from "./search.module.scss";
import { useState } from "react";
import SearchPizzaSvg from "../../assets/svg/searchPizzaSvg";
import ClearSearchSvg from "../../assets/svg/clearSearchSvg";

const Search = () => {
  const [value, setValue] = useState("");
  const { setSearchValue } = useContext(SearchContext);
  const inputRef = useRef();

  const onClickClear = () => {
    setSearchValue("");
    setValue("");
    inputRef.current.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
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
      {value && (
       <ClearSearchSvg onClick={onClickClear} />
      )}
    </div>
  );
};

export default Search;
