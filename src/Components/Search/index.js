// Search.js
import React from 'react';

const Search = ({ handleKeywordChange,handleColumnChange, onClear, columns }) => {
  const handleClear = (e) => {
    e.preventDefault();
    onClear();
  };
  
  return (
    <div className='search'>
      <form>
        <select className='search-dropdown' name='searchCol' id='searchCol' onChange={handleColumnChange}>
          <option value="" selected>Search Column</option>
          {columns.map(column => (
            <option key={column.accessor} value={column.accessor}>{column.Header}</option>
          ))}
        </select>
      
        <input
          type="text"
          placeholder="🔍 Search..."
          className='search-input'
          name='searchKey'
          onChange={handleKeywordChange}
          id='searchKey'
        />

      </form>
      <button type='button' className='clear-button' onClick={handleClear}>
        Clear
      </button>
    </div>
  );
};

export default Search;
