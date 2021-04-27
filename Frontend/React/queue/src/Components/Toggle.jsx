import React, { useState } from 'react';
import { Button } from 'reactstrap';

const Toggle = (props) => {
  const [cSelected, setCSelected] = useState(["Trainer mode"]);
  const onCheckboxBtnClick = (selected) => {
    const index = cSelected.indexOf(selected);
    if (index < 0) {
      cSelected.push(selected);
    } else {
      cSelected.splice(index, 1);
    }
    setCSelected([...cSelected]);
  }


    return (
      <> 
        <Button color="primary" onClick={() => onCheckboxBtnClick("Trainer mode")} active={cSelected.includes("Trainer mode")}>Trainer mode</Button>
        <p>Selected: {JSON.stringify(cSelected)}</p>

      </>
    );
  };
  
  export default Toggle;