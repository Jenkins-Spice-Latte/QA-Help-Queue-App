import '../App.css';

import React from 'react';
import {Button} from 'reactstrap';

const Sort = () => {
  return (
    <> 
      <p>Sort</p>
      <Button id="newestBtn" color="secondary">Sort by newest</Button>
      <Button id="oldestBtn" color="secondary">Sort by oldest</Button>
      <Button id="ascBtn" color="secondary">Sort in ascending order (by title)</Button>
    </>
  );
};

export default Sort;