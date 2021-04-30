import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { BsToggleOff,  BsToggleOn} from "react-icons/bs";
import Queue from "./Queue";
import Create from "./Create";

const Toggle = (props) => {
  const [modeSelect, setmodeSelect] = useState("Trainee mode");
  var mode;

  const onCheckboxBtnClick = (selected) => {
    setmodeSelect(selected);
  }

  if(modeSelect === "Trainee mode"){
    mode = <Button color="primary" onClick={() => onCheckboxBtnClick("Trainer mode")}><BsToggleOff className="trainerBtn"/> Use trainer mode</Button>
  } else{
    mode = <Button color="primary" onClick={() => onCheckboxBtnClick("Trainee mode")}><BsToggleOn className="traineeBtn"/> Use trainee mode</Button>    
  } 


    return (
      <> 
        {mode}
        <Queue mode={(modeSelect)} isLoaded={props.isLoaded} switchLoaded={props.switchLoaded}/>
        <Create mode={(modeSelect)} switchLoaded={props.switchLoaded} isLoaded={props.isLoaded} />
      </>
    );
  };
  
  export default Toggle;