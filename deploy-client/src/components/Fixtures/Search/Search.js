import React from 'react';

import './Search.css';

export default function Search(props){
  return(
    <div className="search-form">
        <form>
          <input className="search" onChange={props.searchAndFilter} placeholder="Search for a league..." value={props.term} type="text" />
        </form>
      </div>
  );
}