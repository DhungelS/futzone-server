import React from 'react';
import { Input } from 'antd';
import './Search.css';

export default function Search(props){
  return(
    <div className="search-form">
        <form>
          <Input className="search" onChange={props.searchAndFilter} placeholder="Search for a league..." value={props.value} type="text" />
        </form>
      </div>
  );
}