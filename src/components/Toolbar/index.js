import React, { useState } from "react";
import "./styles.css";
const ToolBar = (props) => {

  const [sortby, setSortBy] = useState('name');

  const onSortingSelect = (value) => {
    setSortBy(value);
    props.updateSorting(value);
  }

  const sortingBtnStyle = (value) =>{
    return sortby === value ? "sorting-option sorting-option-active" : "sorting-option" ;
  }
  
  return (
    <div className="toolbar">
      <div className="sorting-options">
        <span className="toolbar-label">Sort by</span>
        <div className={sortingBtnStyle('name')} onClick={()=>onSortingSelect("name")}>Name</div>
        <div className={sortingBtnStyle('rating')} onClick={()=>onSortingSelect("rating")}>Rating</div>
      </div>
      <div className="filter-options">
        <span className="toolbar-label">Filter</span>
      </div>
      <button
        onClick={() => {
          props.reset();
        }}
      >
        ME
      </button>
    </div>
  );
  
}

export default ToolBar;
