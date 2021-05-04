import '../App.css';

import React from 'react';
import {Button} from 'reactstrap';

const Sort = (props) => {
  return (
    <> 
      <p>Sort</p>
      <Button id="newestBtn" onClick={() => props.onSortBtnClick("Newest")} color="secondary">Sort by newest</Button>
      <Button id="oldestBtn" onClick={() => props.onSortBtnClick("Oldest")} color="secondary">Sort by oldest</Button>
      <Button id="ascBtn" onClick={() => props.onSortBtnClick("Title")} color="secondary">Sort by title</Button>
    </>
  );
};

export default Sort;