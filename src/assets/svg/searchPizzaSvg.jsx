import React from "react";
import styles from "../../components/Search/search.module.scss";

const SearchPizzaSvg = () => {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs></defs>
      <title />
      <g data-name="Layer 2" id="Layer_2">
        <path d="M13,23A10,10,0,1,1,23,13,10,10,0,0,1,13,23ZM13,5a8,8,0,1,0,8,8A8,8,0,0,0,13,5Z" />
        <path d="M28,29a1,1,0,0,1-.71-.29l-8-8a1,1,0,0,1,1.42-1.42l8,8a1,1,0,0,1,0,1.42A1,1,0,0,1,28,29Z" />
      </g>
      <g id="frame">
        <rect className="cls-1" height="32" width="32" fill="none" />
      </g>
    </svg>
  );
};

export default SearchPizzaSvg;
