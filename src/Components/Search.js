import React from "react";
import searchIcon from "../Assets/search-icon.svg";

const Search = () => {
  return (
    <div className="search-container">
      <div className="search-box">
        <img src={searchIcon} alt="" />
        <input type="text" placeholder="  .  .  .  .  .  .  .  .  .  .  .  .  ." />
      </div>
    </div>
  );
};

export default Search;
